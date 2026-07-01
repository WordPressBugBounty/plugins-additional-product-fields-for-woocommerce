<?php


namespace rednaowooextraproduct\Managers\AIManagers\AIGenerators\AIFormulaGenerator;


use rednaowooextraproduct\Managers\AIManagers\AIException;
use rednaowooextraproduct\Managers\AIManagers\AIGenerators\core\AIGeneratorBase;
use rednaowooextraproduct\Managers\AIManagers\AIGenerators\core\HistoryManager;

/**
 * Turns a natural language request into a formula for the Extra Product Options
 * builder. The client sends a flat list of fields (Id/Label/Type) plus the
 * target field and the expected return type, so this generator never has to
 * rebuild the server side form: it only needs the field types to attach the
 * right @formula method docs.
 */
class AIFormulaGenerator extends AIGeneratorBase
{
    /** @var array */
    private $Fields = array();

    /**
     * @param $message string the user request (contains [Field <id>] tokens)
     * @param $history object|null running chat history
     * @param $fields array list of {Id, Label, Type}
     * @param $targetField object|null {Id, Label, Type}
     * @param $expectedReturnType string price|string|...
     * @return array
     */
    public function Generate($message, $history, $fields, $targetField, $expectedReturnType)
    {
        $this->Fields = is_array($fields) ? $fields : array();
        $this->History = new HistoryManager($history);

        $prompt = $this->BuildPromptMessages($message, $targetField, $expectedReturnType);
        $response = $this->GetCaller()->Chat($prompt);

        return $this->ProcessResponse($response, $message);
    }

    /**
     * Build the prompt text only, for the external-chat mode (no api key).
     */
    public function BuildPromptOnly($message, $history, $fields, $targetField, $expectedReturnType)
    {
        $this->Fields = is_array($fields) ? $fields : array();
        $this->History = new HistoryManager($history);

        $prompt = $this->BuildPromptMessages($message, $targetField, $expectedReturnType);

        $promptText = "IMPORTANT: Reply using ONLY the [FORMULA]/[EXPLANATION] template described below, nothing else.\n\n";
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

    private function BuildPromptMessages($message, $targetField, $expectedReturnType)
    {
        $dir = $this->Loader->DIR . 'Managers/AIManagers/AIGenerators/';

        $prompt = file_get_contents($dir . 'AIFormulaGenerator/FormulaGeneratorPrompt.txt');
        $formulaSyntax = file_get_contents($dir . 'prompts/formula_syntax.txt');

        $prompt = str_replace('{{formulaSyntax}}', $formulaSyntax, $prompt);
        $prompt = str_replace('{{expectedReturnType}}', $this->GetReturnTypeDescription($expectedReturnType), $prompt);
        $prompt = str_replace('{{targetField}}', $this->BuildTargetFieldText($targetField), $prompt);

        $targetFieldId = $this->GetFieldId($targetField);
        $referencedFieldIds = $this->ExtractFieldIds($message);
        $prompt = str_replace('{{formulaMethods}}', $this->BuildFormulaMethods($targetFieldId, $referencedFieldIds), $prompt);

        $conversationHistory = $this->BuildConversationHistory();

        return array(
            $this->CreateMessage('system', $prompt),
            $this->CreateMessage('user', $conversationHistory . 'Current request: ' . $message),
        );
    }

    private function ProcessResponse($response, $message)
    {
        $data = $this->ParseAIResponse($response);
        if ($data == null || !isset($data->formula) || trim($data->formula) === '')
            throw new AIException('The AI could not generate a valid formula. Please rephrase your request and try again.');

        $this->History->RecordHistoryLog($message, 'user');

        return array(
            'history' => $this->History->GetHistory(),
            'data' => array(
                'message' => isset($data->explanation) ? $data->explanation : 'Formula generated successfully.',
                'formula' => $data->formula,
            ),
        );
    }

    /**
     * Parses the AI reply. Prefers the marker format ([FORMULA]...[/FORMULA] +
     * [EXPLANATION]...[/EXPLANATION]) which is robust to quotes/parentheses in
     * the formula, and falls back to tolerant JSON for older prompts/models.
     *
     * @return object|null {formula, explanation}
     */
    private function ParseAIResponse($response)
    {
        if (!is_string($response))
            return null;

        // Preferred: marker format.
        if (preg_match('/\[FORMULA\](.*?)\[\/FORMULA\]/is', $response, $fm)) {
            $formula = $this->CleanFormula($fm[1]);
            $explanation = '';
            if (preg_match('/\[EXPLANATION\](.*?)\[\/EXPLANATION\]/is', $response, $em))
                $explanation = trim($em[1]);
            if ($formula !== '')
                return (object)array('formula' => $formula, 'explanation' => $explanation);
        }

        // Fallback: tolerant JSON (strips fences, slices to outermost braces).
        $text = trim($response);
        $text = preg_replace('/^```(?:json)?/i', '', $text);
        $text = preg_replace('/```$/', '', trim($text));

        $data = json_decode($text);
        if ($data != null && isset($data->formula))
            return $data;

        $start = strpos($text, '{');
        $end = strrpos($text, '}');
        if ($start !== false && $end !== false && $end > $start) {
            $data = json_decode(substr($text, $start, $end - $start + 1));
            if ($data != null && isset($data->formula))
                return $data;
        }

        return null;
    }

    /**
     * Trims the formula and removes an optional surrounding markdown code fence.
     */
    private function CleanFormula($formula)
    {
        $formula = trim($formula);
        if (preg_match('/^```(?:\w+)?\s*\r?\n(.*?)\r?\n```$/s', $formula, $m))
            $formula = trim($m[1]);
        return $formula;
    }

    private function GetReturnTypeDescription($type)
    {
        switch ($type) {
            case 'price':
                return 'a number representing the price or cost the field contributes to the total.';
            case 'string':
                return 'a text string.';
            case 'number':
                return 'a number.';
            default:
                return 'any value (number or text depending on context).';
        }
    }

    private function BuildTargetFieldText($targetField)
    {
        $id = $this->GetFieldId($targetField);
        if ($id === '')
            return 'No specific target field.';

        $text = 'Field ID: ' . $id . "\n";
        $text .= 'Field Type: ' . $this->GetFieldProp($targetField, 'Type', 'unknown') . "\n";
        $text .= 'Label: ' . $this->GetFieldProp($targetField, 'Label', 'No label') . "\n";
        return $text;
    }

    private function BuildFormulaMethods($targetFieldId, $referencedFieldIds)
    {
        $descriptions = include($this->Loader->DIR . 'Managers/AIManagers/Descriptions/FormulaDescriptions.php');
        $classMap = include($this->Loader->DIR . 'Managers/AIManagers/AIGenerators/AIFormulaGenerator/FieldTypeClassMap.php');

        $detailedIds = array_map('strval', $referencedFieldIds);
        if ($targetFieldId !== '' && !in_array((string)$targetFieldId, $detailedIds))
            array_unshift($detailedIds, (string)$targetFieldId);

        if (count($this->Fields) === 0)
            return "No fields available in this form.\n";

        $text = '';
        foreach ($this->Fields as $field) {
            $fieldId = $this->GetFieldId($field);
            if ($fieldId === '')
                continue;
            $fieldType = $this->GetFieldProp($field, 'Type', 'unknown');
            $fieldLabel = $this->GetFieldProp($field, 'Label', 'No label');

            $isTarget = ((string)$fieldId === (string)$targetFieldId);
            $text .= "\n### [Field " . $fieldId . '] - "' . $fieldLabel . '" (Type: ' . $fieldType . ')' . ($isTarget ? ' [TARGET FIELD]' : '') . "\n";

            if (!in_array((string)$fieldId, $detailedIds))
                continue;

            $classNames = isset($classMap[$fieldType]) ? $classMap[$fieldType] : array('FBFieldBase');
            $methods = array();
            foreach ($classNames as $className) {
                if (!isset($descriptions[$className]))
                    continue;
                foreach ($descriptions[$className] as $methodName => $description) {
                    if (!isset($methods[$methodName]))
                        $methods[$methodName] = $description;
                }
            }

            if (count($methods) > 0) {
                $text .= "Available methods:\n";
                foreach ($methods as $methodName => $description)
                    $text .= '- [Field ' . $fieldId . '].' . $methodName . ' - ' . $description . "\n";
            }
        }

        return $text;
    }

    private function ExtractFieldIds($message)
    {
        $fieldIds = array();
        if (preg_match_all('/\[Field\s+(\d+)\]/i', (string)$message, $matches)) {
            foreach ($matches[1] as $fieldId) {
                if (!in_array($fieldId, $fieldIds))
                    $fieldIds[] = $fieldId;
            }
        }
        return $fieldIds;
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

    private function GetFieldId($field)
    {
        return $this->GetFieldProp($field, 'Id', '');
    }

    private function GetFieldProp($field, $prop, $default)
    {
        if (is_object($field) && isset($field->$prop))
            return $field->$prop;
        if (is_array($field) && isset($field[$prop]))
            return $field[$prop];
        return $default;
    }
}
