<?php


namespace rednaowooextraproduct\Managers\AIManagers\APICaller;


use rednaowooextraproduct\Managers\AIManagers\AIException;
use rednaowooextraproduct\Utilities\Sanitizer;

class AnthropicCaller extends APICallerBase
{
    public function GetProviderName()
    {
        return 'claude';
    }

    public function GetDefaultModel()
    {
        return 'claude-opus-4-8';
    }

    public function Chat($messages)
    {
        $apiKey = $this->GetAPIKey();

        // Anthropic keeps the system prompt outside the messages list.
        list($system, $rest) = $this->ExtractSystem($messages);

        $body = array(
            'model' => $this->GetModel(),
            'max_tokens' => 8000,
            'messages' => $rest,
        );
        if ($system != '')
            $body['system'] = $system;

        // Note: temperature/top_p/top_k are intentionally omitted (rejected by
        // some Claude models such as Opus 4.8).
        $response = \wp_remote_post('https://api.anthropic.com/v1/messages', array(
            'headers' => array(
                'x-api-key' => $apiKey,
                'anthropic-version' => '2023-06-01',
                'content-type' => 'application/json',
            ),
            'body' => json_encode($body),
            'timeout' => 60,
        ));

        if (\is_wp_error($response))
            throw new AIException($response->get_error_message());

        $httpCode = \wp_remote_retrieve_response_code($response);
        $decoded = json_decode(\wp_remote_retrieve_body($response), true);

        if ($httpCode !== 200) {
            $errorMessage = Sanitizer::GetStringValueFromPath($decoded, array('error', 'message'), 'Invalid API Key');
            throw new AIException('Claude request failed: ' . $errorMessage);
        }

        if (!isset($decoded['content'][0]['text']))
            throw new AIException('The AI did not return a response, please try again.');

        return $decoded['content'][0]['text'];
    }
}
