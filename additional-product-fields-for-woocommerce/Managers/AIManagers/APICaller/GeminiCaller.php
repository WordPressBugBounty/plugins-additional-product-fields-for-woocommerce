<?php


namespace rednaowooextraproduct\Managers\AIManagers\APICaller;


use rednaowooextraproduct\Managers\AIManagers\AIException;
use rednaowooextraproduct\Utilities\Sanitizer;

class GeminiCaller extends APICallerBase
{
    public function GetProviderName()
    {
        return 'gemini';
    }

    public function GetDefaultModel()
    {
        return 'gemini-2.5-flash';
    }

    public function Chat($messages)
    {
        $apiKey = $this->GetAPIKey();

        // Gemini keeps the system prompt in systemInstruction and uses the role
        // "model" instead of "assistant".
        list($system, $rest) = $this->ExtractSystem($messages);

        $contents = array();
        foreach ($rest as $message) {
            $contents[] = array(
                'role' => $message['role'] === 'assistant' ? 'model' : $message['role'],
                'parts' => array(array('text' => (string)$message['content'])),
            );
        }

        $body = array(
            'contents' => $contents,
            'generationConfig' => array(
                'maxOutputTokens' => 8000,
            ),
        );
        if ($system != '')
            $body['systemInstruction'] = array('parts' => array(array('text' => $system)));

        $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . rawurlencode($this->GetModel())
            . ':generateContent?key=' . rawurlencode($apiKey);

        $response = \wp_remote_post($url, array(
            'headers' => array('Content-Type' => 'application/json'),
            'body' => json_encode($body),
            'timeout' => 60,
        ));

        if (\is_wp_error($response))
            throw new AIException($response->get_error_message());

        $httpCode = \wp_remote_retrieve_response_code($response);
        $decoded = json_decode(\wp_remote_retrieve_body($response), true);

        if ($httpCode !== 200) {
            $errorMessage = Sanitizer::GetStringValueFromPath($decoded, array('error', 'message'), 'Invalid API Key');
            throw new AIException('Gemini request failed: ' . $errorMessage);
        }

        if (!isset($decoded['candidates'][0]['content']['parts'][0]['text']))
            throw new AIException('The AI did not return a response, please try again.');

        return $decoded['candidates'][0]['content']['parts'][0]['text'];
    }
}
