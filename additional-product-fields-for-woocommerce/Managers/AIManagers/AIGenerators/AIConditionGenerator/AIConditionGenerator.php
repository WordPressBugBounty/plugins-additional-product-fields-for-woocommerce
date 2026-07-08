<?php


namespace rednaowooextraproduct\Managers\AIManagers\AIGenerators\AIConditionGenerator;


use rednaowooextraproduct\Managers\AIManagers\AIException;
use rednaowooextraproduct\Managers\AIManagers\AIGenerators\core\AIGeneratorBase;
use rednaowooextraproduct\Managers\AIManagers\AIGenerators\core\HistoryManager;

/**
 * Turns a natural language request ("hide this field when color is red",
 * "show an error when the quantity is over 10") into the show/hide and
 * validation conditions of a field. The client sends the field list already
 * classified by condition kind (options/numeric/date/color/toggle/text) plus
 * each field's selectable options, the product variations and the current
 * conditions serialized with the same JSON schema the AI must reply with. The
 * reply is passed through as-is; the deep validation and the mapping to the
 * builder's condition options happen client side (AiConditionConverter).
 */
class AIConditionGenerator extends AIGeneratorBase
{
    /** @var array */
    private $Context = array();

    /**
     * @param $message string the user request (contains [Field <id>] tokens)
     * @param $history object|null running chat history
     * @param $context array {fields, targetField, variations, isGlobalDesign, allowProductInformation, currentConditions}
     * @return array
     */
    public function Generate($message, $history, $context)
    {
        $this->Context = is_array($context) ? $context : array();
        $this->History = new HistoryManager($history);

        $prompt = $this->BuildPromptMessages($message);
        $response = $this->GetCaller()->Chat($prompt);

        return $this->ProcessResponse($response, $message);
    }

    /**
     * Build the prompt text only, for the external-chat mode (no api key).
     */
    public function BuildPromptOnly($message, $history, $context)
    {
        $this->Context = is_array($context) ? $context : array();
        $this->History = new HistoryManager($history);

        $prompt = $this->BuildPromptMessages($message);

        $promptText = "IMPORTANT: Reply using ONLY the [CONDITIONS]/[EXPLANATION] template described below, nothing else.\n\n";
        foreach ($prompt as $msg) {
            if ($msg->role === 'system')
                $promptText .= $msg->content . "\n\n";
            else if ($msg->role === 'user')
                $promptText .= "User request:\n" . $msg->content;
        }

        $this->History->RecordHistoryLog($message, 'user');

        return array(
            'history' => $this->History->GetHistory(),
            'data' => array('promptText' => $promptText),
        );
    }

    /**
     * Process a response pasted back from an external chat.
     */
    public function ProcessExternalResponse($responseJson, $message, $history)
    {
        $this->History = new HistoryManager($history);
        return $this->ProcessResponse($responseJson, $message);
    }

    private function BuildPromptMessages($message)
    {
        $dir = $this->Loader->DIR . 'Managers/AIManagers/AIGenerators/AIConditionGenerator/';

        $prompt = file_get_contents($dir . 'ConditionGeneratorPrompt.txt');

        $prompt = str_replace('{{targetField}}', $this->BuildTargetFieldText(), $prompt);
        $prompt = str_replace('{{fieldList}}', $this->BuildFieldListText(), $prompt);
        $prompt = str_replace('{{variations}}', $this->BuildVariationsText(), $prompt);
        $prompt = str_replace('{{productInformation}}', $this->BuildProductInformationText(), $prompt);
        $prompt = str_replace('{{targetConditions}}', $this->BuildTargetConditionsText(), $prompt);
        $prompt = str_replace('{{currentConditions}}', $this->BuildCurrentConditionsText(), $prompt);

        $conversationHistory = $this->BuildConversationHistory();

        return array(
            $this->CreateMessage('system', $prompt),
            $this->CreateMessage('user', $conversationHistory . 'Current request: ' . $message),
        );
    }

    private function ProcessResponse($response, $message)
    {
        $data = $this->ParseAIResponse($response);
        if ($data == null || !isset($data->conditions))
            throw new AIException('The AI could not generate a valid condition. Please rephrase your request and try again.');

        $this->History->RecordHistoryLog($message, 'user');

        return array(
            'history' => $this->History->GetHistory(),
            'data' => array(
                'message' => isset($data->explanation) ? $data->explanation : 'Condition generated successfully.',
                'conditions' => $data->conditions,
            ),
        );
    }

    /**
     * Parses the AI reply. Prefers the marker format ([CONDITIONS]{json}[/CONDITIONS]
     * + [EXPLANATION]...[/EXPLANATION]) and falls back to tolerant JSON (strips
     * fences, slices to the outermost braces).
     *
     * The marker blocks are read from the LAST delimiters (see ExtractMarkerBlock):
     * in external-chat mode the pasted reply often carries the prompt too, whose
     * instructions and examples use these same delimiters, so anchoring on the first
     * match would leak the system prompt into the explanation shown to the user.
     *
     * @return object|null {conditions, explanation}
     */
    private function ParseAIResponse($response)
    {
        if (!is_string($response))
            return null;

        // Preferred: marker format.
        $rawConditions = $this->ExtractMarkerBlock($response, 'CONDITIONS');
        if ($rawConditions !== null) {
            $conditions = $this->DecodeConditionsJson($rawConditions);
            if ($conditions != null) {
                $explanation = $this->SanitizeExplanation($this->ExtractMarkerBlock($response, 'EXPLANATION'));
                return (object)array('conditions' => $conditions, 'explanation' => $explanation);
            }
        }

        // Fallback: the whole reply is (or contains) the conditions JSON.
        $conditions = $this->DecodeConditionsJson($response);
        if ($conditions != null)
            return (object)array('conditions' => $conditions, 'explanation' => '');

        return null;
    }

    /**
     * Decodes a conditions JSON blob, tolerating markdown fences and extra text
     * around the outermost braces. Returns null when it does not look like the
     * expected {showHide, validations} shape.
     *
     * @return object|null
     */
    private function DecodeConditionsJson($text)
    {
        $text = trim($text);
        $text = preg_replace('/^```(?:json)?/i', '', $text);
        $text = preg_replace('/```$/', '', trim($text));
        $text = trim($text);

        $data = json_decode($text);
        if ($this->LooksLikeConditions($data))
            return $data;

        $start = strpos($text, '{');
        $end = strrpos($text, '}');
        if ($start !== false && $end !== false && $end > $start) {
            $data = json_decode(substr($text, $start, $end - $start + 1));
            if ($this->LooksLikeConditions($data))
                return $data;
        }

        return null;
    }

    private function LooksLikeConditions($data)
    {
        return is_object($data) && (property_exists($data, 'showHide') || property_exists($data, 'validations') || property_exists($data, 'fieldConditions'));
    }

    private function BuildTargetFieldText()
    {
        $targetField = $this->GetContext('targetField', null);
        $id = $this->GetProp($targetField, 'Id', '');
        if ($id === '')
            return 'No specific target field.';

        $text = 'Field ID: ' . $id . "\n";
        $text .= 'Field Type: ' . $this->GetProp($targetField, 'Type', 'unknown') . "\n";
        $text .= 'Label: ' . $this->GetProp($targetField, 'Label', 'No label') . "\n";
        return $text;
    }

    private function BuildFieldListText()
    {
        $fields = $this->GetContext('fields', array());
        if (!is_array($fields) || count($fields) === 0)
            return "No fields available in this form.\n";

        $text = '';
        foreach ($fields as $field) {
            $fieldId = $this->GetProp($field, 'Id', '');
            if ($fieldId === '')
                continue;

            $text .= "\n### [Field " . $fieldId . '] - "' . $this->GetProp($field, 'Label', 'No label') . '" (type: ' . $this->GetProp($field, 'Type', 'unknown') . ")\n";
            $text .= $this->BuildKindText($field);
        }

        return $text;
    }

    private function BuildKindText($field)
    {
        $kind = $this->GetProp($field, 'Kind', 'text');

        switch ($kind) {
            case 'options':
                $text = "Comparisons: Contains, NotContains, IsEmpty, IsNotEmpty\n";
                $text .= 'Value: ARRAY of option ids. Options: ' . $this->BuildOptionListText($field) . "\n";
                return $text;
            case 'numeric':
                return "Comparisons: Equal, NotEqual, IsEmpty, IsNotEmpty, GreaterThan, GreaterOrEqualThan, LessThan, LessOrEqualThan\nValue: a number\n";
            case 'date':
                return "Comparisons: Equal, NotEqual, IsEmpty, IsNotEmpty, GreaterThan, GreaterOrEqualThan, LessThan, LessOrEqualThan\nValue: a date as \"YYYY-MM-DD\"\n";
            case 'color':
                return "Comparisons: Equal, NotEqual, GreaterThan, GreaterOrEqualThan, LessThan, LessOrEqualThan\nValue: a hex color like \"#ff0000\"\n";
            case 'toggle':
                return "Comparisons: IsChecked, IsNotChecked\nValue: none (use \"\")\n";
            default:
                return "Comparisons: Equal, NotEqual, IsEmpty, IsNotEmpty, Contains\nValue: a text string\n";
        }
    }

    private function BuildOptionListText($field)
    {
        $options = $this->GetProp($field, 'Options', array());
        if (!is_array($options) || count($options) === 0)
            return 'none';

        $parts = array();
        foreach ($options as $option)
            $parts[] = $this->GetProp($option, 'Id', '') . ' = "' . $this->GetProp($option, 'Label', '') . '"';

        return implode(', ', $parts);
    }

    private function BuildVariationsText()
    {
        if ($this->GetContext('isGlobalDesign', false)) {
            $text = "\n### Product variation (global form)\n";
            $text .= 'Use: {"target": "variation", "name": "<attribute name>", "comparison": "<comparison>", "value": ["<variation value>"]}' . "\n";
            $text .= "The form is global so the product attributes are not known here: use the attribute name and values exactly as the user wrote them.\n";
            $text .= "Comparisons: Contains, NotContains\n";
            return $text;
        }

        $variations = $this->GetContext('variations', array());
        if (!is_array($variations) || count($variations) === 0)
            return '';

        $text = "\n### Product variations\n";
        $text .= 'Use: {"target": "variation", "name": "<variation name>", "comparison": "<comparison>", "value": ["<variation value>"]}' . "\n";
        $text .= "Comparisons: Contains, NotContains, IsEmpty, IsNotEmpty\n";
        $text .= "Value: ARRAY of the variation values listed here:\n";
        foreach ($variations as $variation) {
            $values = $this->GetProp($variation, 'Values', array());
            if (!is_array($values))
                $values = array();
            $text .= '- "' . $this->GetProp($variation, 'Name', '') . '": "' . implode('", "', $values) . '"' . "\n";
        }

        return $text;
    }

    /**
     * Field specific conditions the target field can receive (disable options,
     * max/min items, ...). The text is built client side by each condition's AI
     * family descriptor and sent verbatim, so the backend never has to know the
     * catalog: adding a condition needs no change here. Empty when the field
     * supports none.
     */
    private function BuildTargetConditionsText()
    {
        return $this->GetContext('targetConditionsPrompt', '');
    }

    private function BuildProductInformationText()
    {
        if (!$this->GetContext('allowProductInformation', false))
            return '';

        $text = "\n### Product stock quantity\n";
        $text .= 'Use: {"target": "stock_quantity", "comparison": "<comparison>", "value": <number>}' . "\n";
        $text .= "Comparisons: Equal, NotEqual, IsEmpty, IsNotEmpty, GreaterThan, GreaterOrEqualThan, LessThan, LessOrEqualThan\n";
        return $text;
    }

    private function BuildCurrentConditionsText()
    {
        $currentConditions = $this->GetContext('currentConditions', null);
        if ($currentConditions == null)
            return "The field has no conditions yet.\n";

        $encoded = json_encode($currentConditions);
        if ($encoded === false)
            return "The field has no conditions yet.\n";

        return $encoded . "\n";
    }

    private function BuildConversationHistory()
    {
        $messages = $this->History->GetAllMessagesOfRole('user');
        $history = '';
        foreach ($messages as $message) {
            if ($history != '')
                $history .= "\n\n";
            $history .= $message->content;
        }

        if (trim($history) == '')
            return '';

        return "--Previous conversation--\n" . $history . "\n\n";
    }

    private function GetContext($name, $default)
    {
        if (isset($this->Context[$name]))
            return $this->Context[$name];
        return $default;
    }

    private function GetProp($item, $prop, $default)
    {
        if (is_object($item) && isset($item->$prop))
            return $item->$prop;
        if (is_array($item) && isset($item[$prop]))
            return $item[$prop];
        return $default;
    }
}
