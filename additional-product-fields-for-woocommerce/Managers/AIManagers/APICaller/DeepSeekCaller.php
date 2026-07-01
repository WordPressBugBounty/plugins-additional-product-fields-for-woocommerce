<?php


namespace rednaowooextraproduct\Managers\AIManagers\APICaller;


use rednaowooextraproduct\Managers\AIManagers\AIException;
use rednaowooextraproduct\Utilities\Sanitizer;

class DeepSeekCaller extends APICallerBase
{
    public function GetProviderName()
    {
        return 'deepseek';
    }

    public function GetDefaultModel()
    {
        return 'deepseek-chat';
    }

    public function Chat($messages)
    {
        $apiKey = $this->GetAPIKey();

        $response = \wp_remote_post('https://api.deepseek.com/v1/chat/completions', array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ),
            'body' => json_encode(array(
                'model' => $this->GetModel(),
                'messages' => $messages,
                'max_tokens' => 8000,
            )),
            'timeout' => 60,
        ));

        if (\is_wp_error($response))
            throw new AIException($response->get_error_message());

        $httpCode = \wp_remote_retrieve_response_code($response);
        $body = \wp_remote_retrieve_body($response);
        $decoded = json_decode($body, true);

        if ($httpCode !== 200) {
            $errorMessage = Sanitizer::GetStringValueFromPath($decoded, array('error', 'message'), 'Invalid API Key');
            throw new AIException('DeepSeek request failed: ' . $errorMessage);
        }

        $choices = Sanitizer::GetValueFromPath($decoded, array('choices'), null);
        if ($choices == null || !isset($choices[0]['message']['content']))
            throw new AIException('The AI did not return a response, please try again.');

        return $choices[0]['message']['content'];
    }
}
