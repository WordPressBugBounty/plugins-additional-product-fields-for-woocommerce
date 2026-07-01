<?php


namespace rednaowooextraproduct\core\Managers\FormManager\Fields;


class FBTextField extends FBFieldBase
{
    /**
     * @formula Returns the entered value of the field (text or number). Returns an empty string when nothing has been entered.
     */
    public function GetValue()
    {
        return $this->GetEntryValue('Value','');
    }

    /**
     * @formula Returns the entered value of the field as text. Returns an empty string when nothing has been entered.
     */
    public function GetText()
    {
        return $this->GetEntryValue('Value','');
    }

    public function GetLineItems(){
        if($this->Entry==null||$this->GetEntryValue('Value','')==='')
            return array();


        return array((object)\array_merge((array)$this->Entry,array(
            'Id'=>$this->Options->Id,
            'FieldName'=>$this->Options->FieldName,
            'Type'=>$this->Options->Type
        )));
    }

}