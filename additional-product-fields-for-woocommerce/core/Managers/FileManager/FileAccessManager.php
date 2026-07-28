<?php

namespace rednaowooextraproduct\core\Managers\FileManager;

use rednaowooextraproduct\core\Loader;

/**
 * Creates and validates permanent capability URLs for uploaded files.
 *
 * The token is an HMAC derived from a plugin-owned secret. It intentionally
 * does not expire so links sent to guest customers remain usable. Temporary
 * file tokens are additionally bound to the current WooCommerce session.
 */
class FileAccessManager
{
    const SECRET_OPTION_SUFFIX = '_file_access_secret';
    const TOKEN_PARAMETER = 'file_token';

    /** @var Loader */
    private $Loader;

    /** @var FileManager */
    private $FileManager;

    public function __construct($loader)
    {
        $this->Loader = $loader;
        $this->FileManager = new FileManager($loader);
    }

    /**
     * Build a signed download URL for either a temporary or permanent file.
     *
     * @param string    $path Full path or storage filename.
     * @param string    $downloadName Name presented to the customer.
     * @param bool|null $temporary Pass null to infer it from the path.
     * @return string
     */
    public function GetDownloadURL($path, $downloadName, $temporary = null)
    {
        $storageName = sanitize_file_name(basename(strval($path)));
        if ($temporary === null)
        {
            $temporary = $this->IsTemporaryPath($path);
        }

        $arguments = array(
            'action' => $this->Loader->Prefix . '_getpublicfileupload',
            'path' => $storageName,
            'name' => sanitize_file_name(strval($downloadName)),
            self::TOKEN_PARAMETER => $this->CreateToken($storageName, $temporary)
        );

        if ($temporary)
        {
            $arguments['temp'] = 'true';
        }

        return apply_filters(
            'woo_extra_products_file_download_url',
            add_query_arg($arguments, admin_url('admin-ajax.php')),
            $path,
            $downloadName,
            $temporary
        );
    }

    /**
     * Validate the token supplied to the public download endpoint.
     *
     * @param string $storageName
     * @param bool   $temporary
     * @param string $providedToken
     * @return bool
     */
    public function ValidateToken($storageName, $temporary, $providedToken)
    {
        $providedToken = strtolower(trim(strval($providedToken)));
        if (!preg_match('/^[a-f0-9]{64}$/', $providedToken))
        {
            return false;
        }

        return hash_equals(
            $this->CreateToken($storageName, $temporary),
            $providedToken
        );
    }

    /**
     * @param string $path
     * @return bool
     */
    public function IsTemporaryPath($path)
    {
        $path = $this->NormalizePath($path);
        $temporaryRoot = $this->NormalizePath($this->FileManager->GetTempFolderRootPath());
        return strpos($path, $temporaryRoot) === 0;
    }

    /**
     * @param string $storageName
     * @param bool   $temporary
     * @return string
     */
    private function CreateToken($storageName, $temporary)
    {
        $scope = $temporary
            ? 'temporary|' . $this->GetWooCommerceSessionIdentifier()
            : 'permanent';

        return hash_hmac(
            'sha256',
            $scope . '|' . sanitize_file_name(basename(strval($storageName))),
            $this->GetSecret()
        );
    }

    /**
     * @return string
     */
    private function GetSecret()
    {
        $optionName = $this->Loader->Prefix . self::SECRET_OPTION_SUFFIX;
        $secret = get_option($optionName, '');

        if (!is_string($secret) || !preg_match('/^[a-f0-9]{64}$/', $secret))
        {
            try
            {
                $secret = bin2hex(random_bytes(32));
            }
            catch (\Exception $exception)
            {
                $secret = hash('sha256',wp_generate_password(64,true,true));
            }

            // A stable secret keeps already-issued links valid indefinitely.
            if (!add_option($optionName, $secret, '', 'no'))
            {
                $storedSecret = get_option($optionName, '');
                if (is_string($storedSecret) && $storedSecret !== '')
                {
                    $secret = $storedSecret;
                }
            }
        }

        return $secret;
    }

    /**
     * @return string
     */
    private function GetWooCommerceSessionIdentifier()
    {
        if (function_exists('WC'))
        {
            $woocommerce = WC();
            if ($woocommerce && isset($woocommerce->session) && $woocommerce->session)
            {
                $customerId = $woocommerce->session->get_customer_id();
                if (is_scalar($customerId) && strval($customerId) !== '')
                {
                    return strval($customerId);
                }
            }
        }

        if (is_user_logged_in())
        {
            return 'user:' . get_current_user_id();
        }

        return 'anonymous';
    }

    /**
     * @param string $path
     * @return string
     */
    private function NormalizePath($path)
    {
        return rtrim(str_replace('\\', '/', strval($path)), '/') . '/';
    }
}
