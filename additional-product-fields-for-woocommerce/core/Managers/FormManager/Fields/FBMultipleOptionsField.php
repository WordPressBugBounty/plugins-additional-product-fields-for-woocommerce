<?php


namespace rednaowooextraproduct\core\Managers\FormManager\Fields;


use rednaowooextraproduct\core\Managers\ConditionManager\ConditionManager;
use rednaowooextraproduct\core\Utils\ArrayUtils;
use rednaowooextraproduct\core\Utils\ObjectUtils;
use rednaowooextraproduct\Utilities\Sanitizer;

class FBMultipleOptionsField extends FBFieldBase
{
    public $optionsToReturn=null;
    /**
     * @formula Returns the list of currently selected options. Each option exposes Id, Label and RegularPrice.
     */
    public function GetSelectedOptions(){
        $priceColumnsToUse=[];
        if($this->optionsToReturn==null)
        {
            $this->optionsToReturn=array();

            if(isset($this->Options->Conditions))
            {
                foreach ($this->Options->Conditions as $condition)
                {
                    if($condition->Type=='ChangeOptionPrice')
                    {
                        $conditionManager=new ConditionManager();
                        if($conditionManager->ShouldProcess($this->GetRootForm(),$condition))
                        {
                            foreach($this->Options->AdditionalOptionColumn as $column)
                            {
                                if(ObjectUtils::GetValue($column,['Options','Type'])=='pricetype'&&
                                    ObjectUtils::GetValue($column,['Options','Id'])==$condition->Id
                                )
                                {
                                    $priceColumnsToUse[]=$column->Id;
                                }
                            }

                        }
                    }
                }
            }

            if(isset($this->Entry)&&isset($this->Entry->SelectedValues)&&isset($this->Options->Options))
            {
                foreach($this->Entry->SelectedValues as $selectedEntry)
                {
                    foreach($this->Options->Options as $selectedOption)
                    {
                        if($selectedOption->Id==$selectedEntry->Id)
                        {
                            $option=(object)\array_merge((array)$selectedEntry,(array)$selectedOption);
                            foreach($selectedOption->AdditionalOptionValue as $columnValue)
                            {
                                if(array_search($columnValue->Id,$priceColumnsToUse)!==false)
                                {
                                    $option->RegularPrice=$columnValue->Value;
                                }
                            }

                            $this->optionsToReturn[] = $option;
                        }
                    }
                }
            }

        }
        return $this->optionsToReturn;
    }

    public function GetLineItems(){
        $options=$this->GetSelectedOptions();
        foreach($options as $currentOption)
        {
            $currentOption->Value=$currentOption->Label;
            $currentOption->Label=$this->GetEntryValue('Label','');
        }
        $this->Entry->SelectedValues=$options;
        return array((object)\array_merge((array)$this->Entry,array(
            'Id'=>$this->Options->Id,
            'FieldName'=>$this->Options->FieldName,
            'Type'=>$this->Options->Type
        )));
    }

    /**
     * @formula Returns the list of currently selected options (same as GetSelectedOptions).
     */
    public function GetValue(){
        return $this->GetSelectedOptions();
    }

    /**
     * @formula Returns a comma-separated string with the labels of all currently selected options.
     */
    public function GetText()
    {
        $values=$this->GetValue();
        $labels=\array_map(function ($value){return $value->Label;},$this->GetValue());
        return \implode(', ',$labels);
    }

    /**
     * @formula Parameter: a label. Returns true if any currently selected option has that exact label.
     */
    public function  Contains($value)
    {
        return ArrayUtils::Find( $this->GetSelectedOptions(),function ($item)use($value){
                return $item->Label==$value;
            })!=null;

    }

    public function GetPriceWithoutFormula(){
        $price=0;
        $options=$this->GetSelectedOptions();
        foreach($options as $currentOptions)
        {
            $price+=Sanitizer::SanitizeNumber($currentOptions->RegularPrice);
        }

        return $price;

    }

    public function GetPrice(){
        $options=$this->GetSelectedOptions();
        $price=0;
        foreach($options as $currentOption)
        {
            $currentPrice=\floatval($currentOption->RegularPrice);
            if($currentPrice===false)
                $currentPrice=0;

            $price+=$currentPrice;


        }

        return $price;

    }


    /**
     * @formula Parameter: an additional option column id or label. Returns the value(s) of that column for the selected option(s): a single value when one option is selected, an array when several are.
     */
    public function GetColumnValue($columnNameOrId)
    {
        $selectedOptions=$this->GetSelectedOptions();
        $columnToSearch=ArrayUtils::Find($this->Options->AdditionalOptionColumn,function ($item)use($columnNameOrId){
           return $item->Id==$columnNameOrId||$item->Label==$columnNameOrId;
        });

        if($columnToSearch==null)
            return null;

        $columnValues=[];

        foreach($selectedOptions as $option)
        {
            $columnValue=ArrayUtils::Find($option->AdditionalOptionValue,function ($item)use($columnToSearch){
                return $item->Id==$columnToSearch->Id;
            });

            if($columnValue!=null)
                $columnValues[]=$columnValue->Value;
        }

        if(count($columnValues)==0)
            return 0;

      
        if(count($columnValues)==1)
            return $columnValues[0];

        return $columnValues;
    }





    /**
     * @formula Parameter: an additional option column id or label. Returns the numeric value(s) of that column for the selected option(s); use this instead of GetColumnValue when doing arithmetic. Returns a single number for one option, an array for several.
     */
    public function GetColumnNumericalValue($columnNameOrId)
    {
        $selectedOptions=$this->GetSelectedOptions();
        $columnToSearch=ArrayUtils::Find($this->Options->AdditionalOptionColumn,function ($item)use($columnNameOrId){
            return $item->Id==$columnNameOrId||$item->Label==$columnNameOrId;
        });

        if($columnToSearch==null)
            return null;

        $columnValues=[];

        foreach($selectedOptions as $option)
        {
            $columnValue=ArrayUtils::Find($option->AdditionalOptionValue,function ($item)use($columnToSearch){
                return $item->Id==$columnToSearch->Id;
            });

            if($columnValue!=null&&is_numeric($columnValue->Value))
                $columnValues[]=floatval($columnValue->Value);
        }

        if(count($columnValues)==0)
            return 0;

        //Paridad con JS (ver GetColumnValue): con una sola opcion seleccionada devolvemos escalar
        //para que las comparaciones "==" de la formula coincidan entre servidor y cliente.
        if(count($columnValues)==1)
            return $columnValues[0];

        return $columnValues;
    }
}