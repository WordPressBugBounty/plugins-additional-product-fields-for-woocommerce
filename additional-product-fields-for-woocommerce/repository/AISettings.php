<?php


namespace rednaowooextraproduct\repository;


use rednaowooextraproduct\core\Loader;

/**
 * Global store for the AI assistant settings.
 *
 * Unlike other plugins, only ONE provider can be configured at a time: the
 * user chooses a provider and enters its API key. Switching provider replaces
 * the previous configuration. The value is persisted as a single json encoded
 * wp_option (rednaowooextraproduct_ai_settings) and the raw api key never
 * leaves the server (see GetForClient).
 */
class AISettings
{
    const OPTION_SUFFIX = '_ai_settings';

    /** @var AISettingsData */
    private static $Cached = null;

    /**
     * @param $loader Loader
     * @param $provider string one of deepseek|claude|gemini
     * @param $apiKey string
     * @param $model string optional model override (empty => provider default)
     */
    public static function Save($loader, $provider, $apiKey, $model = '')
    {
        $data = new AISettingsData();
        $data->Provider = $provider;
        $data->ApiKey = $apiKey;
        $data->Model = $model;
        self::$Cached = $data;
        \update_option($loader->Prefix . self::OPTION_SUFFIX, json_encode($data));
    }

    /**
     * @param $loader Loader
     * @return AISettingsData
     */
    public static function Get($loader)
    {
        if (self::$Cached == null) {
            $decoded = \json_decode(\get_option($loader->Prefix . self::OPTION_SUFFIX, ''));
            self::$Cached = new AISettingsData($decoded);
        }
        return self::$Cached;
    }

    /**
     * @param $loader Loader
     * @return string
     */
    public static function GetProvider($loader)
    {
        return self::Get($loader)->Provider;
    }

    /**
     * @param $loader Loader
     * @return string
     */
    public static function GetApiKey($loader)
    {
        return self::Get($loader)->ApiKey;
    }

    /**
     * @param $loader Loader
     * @return string the configured model, or the provider default when empty
     */
    public static function GetModel($loader)
    {
        $data = self::Get($loader);
        if ($data->Model != '')
            return $data->Model;
        return self::GetDefaultModelForProvider($data->Provider);
    }

    /**
     * @param $loader Loader
     * @return bool
     */
    public static function IsConfigured($loader)
    {
        $data = self::Get($loader);
        return $data->Provider != '' && $data->ApiKey != '';
    }

    /**
     * Client safe representation: exposes the chosen provider and model plus a
     * boolean telling whether a key is stored, but NEVER the raw key (this ends
     * up inside a localized global that is printed in the page html).
     *
     * @param $loader Loader
     * @return array
     */
    public static function GetForClient($loader)
    {
        $data = self::Get($loader);
        return array(
            'Provider' => $data->Provider,
            'Model' => $data->Model,
            'IsConfigured' => self::IsConfigured($loader)
        );
    }

    public static function GetDefaultModelForProvider($provider)
    {
        switch ($provider) {
            case 'deepseek':
                return 'deepseek-chat';
            case 'claude':
                return 'claude-opus-4-8';
            case 'gemini':
                return 'gemini-2.5-flash';
            default:
                return '';
        }
    }
}


class AISettingsData
{
    public $Provider = '';
    public $ApiKey = '';
    public $Model = '';

    public function __construct($data = null)
    {
        if ($data == null)
            return;

        if (isset($data->Provider))
            $this->Provider = $data->Provider;
        if (isset($data->ApiKey))
            $this->ApiKey = $data->ApiKey;
        if (isset($data->Model))
            $this->Model = $data->Model;
    }
}
