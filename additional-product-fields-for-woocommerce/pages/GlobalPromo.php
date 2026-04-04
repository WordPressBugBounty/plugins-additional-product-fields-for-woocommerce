<?php

namespace rednaowooextraproduct\pages;

use rednaowooextraproduct\core\Loader;

class GlobalPromo
{
    /** @var Loader */
    public $Loader;
    public function __construct($loader)
    {
        $this->Loader=$loader;
    }

    public function Render(){
        ?>

        <style>
            body{
                background-color: white;
            }
        </style>
        <div style="padding: 10px;display: inline-block">
            <div>
                <h1 style="font-weight: bold;"><?php echo esc_html__('Sorry this feature is only available in the full version','additional-product-fields-for-woocommerce'); ?></h1>
                <ul style="list-style: disc;list-style-position: inside;font-size: 18px">
                    <li style="margin-bottom: 10px;">
                        <?php echo esc_html__('Configure options and apply them to all the products that match a criteria','additional-product-fields-for-woocommerce'); ?>
                    </li>
                    <li style="margin-bottom: 10px;">
                        <?php echo esc_html__('Multiple options support. If a product already has options you can configure the global options to be included or not','additional-product-fields-for-woocommerce'); ?>
                    </li>
                    <li style="margin-bottom: 10px;">
                        <?php echo esc_html__('The global options support conditional logic, javascript and formulas just like the standard product options','additional-product-fields-for-woocommerce'); ?>
                    </li>
                </ul>
                <div style="margin: 10px 0">
                    <a target="_blank" style="font-size: 20px" href="https://productbuilder.rednao.com/get-it/"><?php echo esc_html__('Get the full version here','additional-product-fields-for-woocommerce'); ?></a>
                </div>
            </div>
            <div style="display:inline-block;">
                <div style="position: relative;display: inline-block">
                    <img src="<?php echo $this->Loader->URL.'images/promo.png'?>">
                    <div style="opacity: .2;position: absolute;top:0;left: 0;width: 100%;height: 100%;background-color: black;"></div>
                    <div style="position: absolute;top:0;left: 0;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
                        <span style="font-weight: bold;color: red;font-size: 45px;transform: rotate(45deg)"><?php echo esc_html__('Full Version Only','additional-product-fields-for-woocommerce'); ?></span>
                    </div>

                </div>
            </div>
        </div>
        
        <?php
    }


}