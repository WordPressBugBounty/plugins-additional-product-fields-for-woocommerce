<?php


namespace rednaowooextraproduct\Integration\Fields;

use rednaowooextraproduct\core\Managers\FileManager\FileAccessManager;


class FileIntegrationField extends IntegrationFieldBase
{
    public $Paths;
    public $Width='200px';
    public $Height='100px';
    public function __construct($order, $lineItem, $entryData)
    {
        parent::__construct($order, $lineItem, $entryData);
        $this->Paths=[];
    }

    public function SetWidth($width)
    {
        $this->Width=$width;
        return $this;
    }

    public function SetHeight($height)
    {
        $this->Height=$height;
        return $this;
    }


    public function AddPath($Path)
    {
        $this->Paths[]=$Path;
    }

    public function ToText()
    {
        $urls=[];
        $loader=apply_filters('woo_extra_products_get_loader',null);
        $fileAccessManager=new FileAccessManager($loader);
        foreach($this->Paths as $currentPath)
        {
            $urls[]=$fileAccessManager->GetDownloadURL($currentPath,basename($currentPath));

        }

        return \implode(', ',$urls);
    }

    public function ToHTML()
    {
        $text='<div>';
        $loader=apply_filters('woo_extra_products_get_loader',null);
        $fileAccessManager=new FileAccessManager($loader);
        foreach($this->Paths as $currentPath)
        {
            $url=$fileAccessManager->GetDownloadURL($currentPath,basename($currentPath));
            if(substr_compare($currentPath, '.png', -strlen('.png')) === 0||substr_compare($currentPath, '.jpeg', -strlen('.jpeg')) === 0||
                substr_compare($currentPath, '.jpg', -strlen('.jpg')) === 0)
                $text.='<img style="width:'.esc_attr($this->Width).';height:'.esc_attr($this->Height).'" src="'.esc_attr($url).'"/>';

            else
                $text.='<a href="'.esc_attr($url).'">'.esc_html($url).'</a>';
        }
        $text.='</div>';

        return $text;
    }


}
