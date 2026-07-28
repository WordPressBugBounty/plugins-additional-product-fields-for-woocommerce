<?php


namespace rednaowooextraproduct\ajax;



use rednaowooextraproduct\core\Managers\FileManager\FileManager;
use rednaowooextraproduct\core\Managers\FileManager\FileAccessManager;
use rednaowooextraproduct\repository\ProductRepository;

class OrderDesignerAjax extends AjaxBase
{

    public function __construct($core, $prefix)
    {
        parent::__construct($core, $prefix, 'order_designer');
    }


    protected function RegisterHooks()
    {
        $this->RegisterPrivate('getfileupload','GetFileUpload');
        $this->RegisterPublic('getpublicfileupload','GetFileUpload',false);
        $this->RegisterPublic('dontshowagain','DontShowAgain',false);
    }

    public function DontShowAgain(){
        if(!wp_verify_nonce($_POST['nonce'],'pbdontshowagain'))
            return;
        \update_option('rednaowooextraproduct_dont_show_again',1);
    }

    public function GetFileUpload(){
        if(!isset($_REQUEST['path']))
            $this->DenyFileAccess();

        $path=sanitize_file_name(basename(\strval(wp_unslash($_REQUEST['path']))));
        $name=isset($_REQUEST['name'])
            ? sanitize_file_name(\strval(wp_unslash($_REQUEST['name'])))
            : $path;
        if($name=='signature')
            $name='signature.png';
        $manager=new FileManager($this->Loader);
        $accessManager=new FileAccessManager($this->Loader);
        $temporary=isset($_REQUEST['temp']);

        if($temporary)
        {
            $baseDir=$manager->GetTempFolderRootPath();
        }else
            $baseDir=$manager->GetOrderFolderRootPath();

        $baseRealPath=realpath($baseDir);
        $realPath=realpath($baseDir.$path);
        if(
            $path===''||
            $baseRealPath===false||
            $realPath===false||
            strpos(
                str_replace('\\','/',$realPath),
                rtrim(str_replace('\\','/',$baseRealPath),'/').'/'
            )!==0||
            !\is_file($realPath)
        )
        {
            $this->DenyFileAccess(404);
        }

        $action=isset($_REQUEST['action'])?sanitize_key(wp_unslash($_REQUEST['action'])):'';
        $isPrivateRequest=$action===$this->Loader->Prefix.'_getfileupload';

        if(!$isPrivateRequest)
        {
            $token=isset($_REQUEST[FileAccessManager::TOKEN_PARAMETER])
                ? sanitize_text_field(wp_unslash($_REQUEST[FileAccessManager::TOKEN_PARAMETER]))
                : '';

            if(!$accessManager->ValidateToken($path,$temporary,$token))
            {
                $this->AuthorizeLegacyRequestOrExit($path,$name,$temporary,$accessManager);
            }
        }

        header('Expires: 0');
        header('Cache-Control: private, no-store, no-cache, must-revalidate, max-age=0');
        header('Pragma: no-cache');
        header('X-Content-Type-Options: nosniff');
        header('Referrer-Policy: no-referrer');
        header('Content-Disposition: '.($name=='signature.png'?'inline':'attachment').'; filename="'.$name.'"');
        header('Content-Type: '.$this->GetMimeType($realPath));

        //Define file size
        header('Content-Length: ' . filesize($realPath));
        readfile($realPath);
        exit;



    }

    /**
     * Preserve old URLs without treating a storage filename as authorization.
     *
     * @param string            $path
     * @param string            $name
     * @param bool              $temporary
     * @param FileAccessManager $accessManager
     */
    private function AuthorizeLegacyRequestOrExit($path,$name,$temporary,$accessManager)
    {
        if($temporary)
        {
            if($this->CurrentCartContainsFile($path))
                return;

            $this->DenyFileAccess();
        }

        if(
            is_user_logged_in()&&
            (
                current_user_can('manage_woocommerce')||
                current_user_can('edit_shop_orders')||
                current_user_can('administrator')
            )
        )
        {
            return;
        }

        $order=$this->FindOrderForFile($path);
        if($order==null)
        {
            $this->DenyFileAccess();
        }

        if(
            is_user_logged_in()&&
            (
                intval($order->get_user_id())===get_current_user_id()||
                current_user_can('view_order',$order->get_id())
            )
        )
        {
            return;
        }

        if($this->HasValidOrderKey($order))
        {
            return;
        }

        if(isset($_POST['legacy_billing_email']))
        {
            $nonce=isset($_POST['legacy_file_nonce'])
                ? sanitize_text_field(wp_unslash($_POST['legacy_file_nonce']))
                : '';
            $email=sanitize_email(wp_unslash($_POST['legacy_billing_email']));

            if(
                wp_verify_nonce($nonce,'legacy_file_access_'.$path)&&
                $email!==''&&
                hash_equals(
                    strtolower(strval($order->get_billing_email())),
                    strtolower($email)
                )
            )
            {
                wp_safe_redirect($accessManager->GetDownloadURL($path,$name,false),303);
                exit;
            }
        }

        $this->RenderLegacyAccessForm($path,$name);
    }

    /**
     * @param string $path
     * @return bool
     */
    private function CurrentCartContainsFile($path)
    {
        if(!function_exists('WC'))
            return false;

        $woocommerce=WC();
        if(!$woocommerce)
            return false;

        if((!isset($woocommerce->cart)||!$woocommerce->cart)&&function_exists('wc_load_cart'))
        {
            wc_load_cart();
        }

        if(!isset($woocommerce->cart)||!$woocommerce->cart)
            return false;

        return $this->ValueContainsFile($woocommerce->cart->get_cart(),$path);
    }

    /**
     * Locate the order owning a legacy filename. This slow lookup is only used
     * for URLs issued before signed links were introduced.
     *
     * @param string $path
     * @return \WC_Order|null
     */
    private function FindOrderForFile($path)
    {
        global $wpdb;

        $itemTable=$wpdb->prefix.'woocommerce_order_items';
        $metaTable=$wpdb->prefix.'woocommerce_order_itemmeta';
        $like='%'.$wpdb->esc_like($path).'%';
        $orderIds=$wpdb->get_col(
            $wpdb->prepare(
                "SELECT DISTINCT items.order_id
                 FROM {$itemTable} items
                 INNER JOIN {$metaTable} itemmeta
                    ON itemmeta.order_item_id=items.order_item_id
                 WHERE itemmeta.meta_key IN ('rn_entry','rn_line_items')
                   AND itemmeta.meta_value LIKE %s
                 LIMIT 20",
                $like
            )
        );

        foreach($orderIds as $orderId)
        {
            $order=wc_get_order($orderId);
            if(!$order)
                continue;

            foreach($order->get_items() as $item)
            {
                if(
                    $this->ValueContainsFile($item->get_meta('rn_entry',true),$path)||
                    $this->ValueContainsFile($item->get_meta('rn_line_items',true),$path)
                )
                {
                    return $order;
                }
            }
        }

        return null;
    }

    /**
     * @param mixed  $value
     * @param string $path
     * @return bool
     */
    private function ValueContainsFile($value,$path)
    {
        if(is_string($value))
            return basename(str_replace('\\','/',$value))===$path;

        if(is_object($value))
            $value=get_object_vars($value);

        if(!is_array($value))
            return false;

        foreach($value as $currentValue)
        {
            if($this->ValueContainsFile($currentValue,$path))
                return true;
        }

        return false;
    }

    /**
     * @param \WC_Order $order
     * @return bool
     */
    private function HasValidOrderKey($order)
    {
        $key='';
        if(isset($_REQUEST['key']))
            $key=wc_clean(wp_unslash($_REQUEST['key']));

        if($key==='')
        {
            $referer=wp_get_referer();
            if($referer)
            {
                $query=parse_url($referer,PHP_URL_QUERY);
                if(is_string($query))
                {
                    parse_str($query,$refererArguments);
                    if(isset($refererArguments['key']))
                        $key=wc_clean($refererArguments['key']);
                }
            }
        }

        return $key!==''&&hash_equals(strval($order->get_order_key()),strval($key));
    }

    /**
     * @param string $path
     * @param string $name
     */
    private function RenderLegacyAccessForm($path,$name)
    {
        status_header(401);
        nocache_headers();
        header('Content-Type: text/html; charset='.get_option('blog_charset'));
        header('Referrer-Policy: no-referrer');

        $action=admin_url('admin-ajax.php');
        $nonce=wp_create_nonce('legacy_file_access_'.$path);
        echo '<!doctype html><html><head><meta name="robots" content="noindex,nofollow">';
        echo '<meta name="viewport" content="width=device-width,initial-scale=1">';
        echo '<title>'.esc_html__('Verify order access','additional-product-fields-for-woocommerce').'</title>';
        echo '<style>body{font-family:Arial,sans-serif;max-width:520px;margin:60px auto;padding:0 20px}label,input,button{display:block;width:100%;box-sizing:border-box}input,button{padding:10px;margin-top:8px}button{cursor:pointer}</style>';
        echo '</head><body><h1>'.esc_html__('Verify order access','additional-product-fields-for-woocommerce').'</h1>';
        echo '<p>'.esc_html__('Enter the billing email used for this order to access the file.','additional-product-fields-for-woocommerce').'</p>';
        echo '<form method="post" action="'.esc_url($action).'">';
        echo '<input type="hidden" name="action" value="'.esc_attr($this->Loader->Prefix.'_getpublicfileupload').'">';
        echo '<input type="hidden" name="path" value="'.esc_attr($path).'">';
        echo '<input type="hidden" name="name" value="'.esc_attr($name).'">';
        echo '<input type="hidden" name="legacy_file_nonce" value="'.esc_attr($nonce).'">';
        echo '<label for="legacy_billing_email">'.esc_html__('Billing email','additional-product-fields-for-woocommerce').'</label>';
        echo '<input id="legacy_billing_email" name="legacy_billing_email" type="email" required autocomplete="email">';
        echo '<button type="submit">'.esc_html__('Access file','additional-product-fields-for-woocommerce').'</button>';
        echo '</form></body></html>';
        exit;
    }

    /**
     * @param int $status
     */
    private function DenyFileAccess($status=403)
    {
        status_header($status);
        nocache_headers();
        header('Content-Type: text/plain; charset='.get_option('blog_charset'));
        echo esc_html__('File access denied.','additional-product-fields-for-woocommerce');
        exit;
    }

    /**
     * @param string $path
     * @return string
     */
    private function GetMimeType($path)
    {
        if(function_exists('mime_content_type'))
        {
            $mime=mime_content_type($path);
            if(is_string($mime)&&$mime!=='')
                return $mime;
        }

        $type=wp_check_filetype($path);
        return isset($type['type'])&&$type['type']!==false
            ? $type['type']
            : 'application/octet-stream';
    }
}
