<?php


namespace rednaowooextraproduct\Managers\AIManagers\APICaller;


use rednaowooextraproduct\core\Loader;
use rednaowooextraproduct\Managers\AIManagers\AIException;
use rednaowooextraproduct\repository\AISettings;

/**
 * Base class for every AI provider. A provider receives a neutral message array
 * (each item {role, content} where role is system|user|assistant) and returns
 * the raw text content of the assistant reply. Only one provider is configured
 * at a time (see AISettings).
 */
abstract class APICallerBase
{
    /** @var Loader */
    protected $Loader;
    protected $_apiKey = '';
    protected $_model = '';

    public function __construct($loader)
    {
        $this->Loader = $loader;
    }

    /**
     * @param $messages array of objects/arrays with role + content
     * @return string the assistant reply text
     */
    public abstract function Chat($messages);

    /** @return string internal provider slug (deepseek|claude|gemini) */
    public abstract function GetProviderName();

    /** @return string the default model id used when none is configured */
    public abstract function GetDefaultModel();

    public function SetAPIKey($key)
    {
        $this->_apiKey = $key;
        return $this;
    }

    public function SetModel($model)
    {
        $this->_model = $model;
        return $this;
    }

    public function GetModel()
    {
        if ($this->_model != '')
            return $this->_model;
        return $this->GetDefaultModel();
    }

    public function GetAPIKey()
    {
        if ($this->_apiKey == '') {
            $this->_apiKey = AISettings::GetApiKey($this->Loader);
            if ($this->_apiKey == '')
                throw new AIException('The AI API key is not set. Please configure it in the AI settings tab.');
        }
        return $this->_apiKey;
    }

    /**
     * Returns the caller for the provider currently configured in the settings,
     * pre-loaded with its model. Throws if nothing is configured.
     *
     * @param $loader Loader
     * @return APICallerBase
     */
    public static function GetConfiguredCaller($loader)
    {
        if (!AISettings::IsConfigured($loader))
            throw new AIException('No AI provider is configured. Please set your provider and API key in the AI settings tab.');

        $caller = self::GetCallerByName($loader, AISettings::GetProvider($loader));
        if ($caller == null)
            throw new AIException('The configured AI provider is not supported.');

        $caller->SetModel(AISettings::GetModel($loader));
        return $caller;
    }

    /**
     * @param $loader Loader
     * @param $name string provider slug
     * @return APICallerBase|null
     */
    public static function GetCallerByName($loader, $name)
    {
        switch ($name) {
            case 'deepseek':
                return new DeepSeekCaller($loader);
            case 'claude':
                return new AnthropicCaller($loader);
            case 'gemini':
                return new GeminiCaller($loader);
            default:
                return null;
        }
    }

    /**
     * Split the neutral message array into a single system string plus the
     * remaining user/assistant turns. Used by providers (Anthropic, Gemini)
     * that keep the system prompt outside the message list.
     *
     * @return array [systemText, [ {role, content}, ... ]]
     */
    protected function ExtractSystem($messages)
    {
        $system = '';
        $rest = array();
        foreach ($messages as $message) {
            $role = is_object($message) ? $message->role : $message['role'];
            $content = is_object($message) ? $message->content : $message['content'];
            if ($role === 'system')
                $system .= ($system == '' ? '' : "\n\n") . $content;
            else
                $rest[] = array('role' => $role, 'content' => $content);
        }
        return array($system, $rest);
    }
}
