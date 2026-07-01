<?php
// AUTO-GENERATED 2026-07-01T12:21:25+00:00 - DO NOT EDIT MANUALLY.
// Run: php tools/generateFormulaDictionary.php
return array(
    'FBFieldBase' => array(
        'GetPrice' => 'Returns the price this field contributes to the total, as a number.',
        'GetText' => 'Returns the field value as display text. Returns an empty string when nothing has been entered.',
        'GetValue' => 'Returns the submitted value of the field. Returns an empty value when nothing has been entered.',
        'IsUsed' => 'Returns true when the field has a non-empty value.',
    ),
    'FBMultipleOptionsField' => array(
        'Contains' => 'Parameter: a label. Returns true if any currently selected option has that exact label.',
        'GetColumnNumericalValue' => 'Parameter: an additional option column id or label. Returns the numeric value(s) of that column for the selected option(s); use this instead of GetColumnValue when doing arithmetic. Returns a single number for one option, an array for several.',
        'GetColumnValue' => 'Parameter: an additional option column id or label. Returns the value(s) of that column for the selected option(s): a single value when one option is selected, an array when several are.',
        'GetSelectedOptions' => 'Returns the list of currently selected options. Each option exposes Id, Label and RegularPrice.',
        'GetText' => 'Returns a comma-separated string with the labels of all currently selected options.',
        'GetValue' => 'Returns the list of currently selected options (same as GetSelectedOptions).',
    ),
    'FBTextField' => array(
        'GetText' => 'Returns the entered value of the field as text. Returns an empty string when nothing has been entered.',
        'GetValue' => 'Returns the entered value of the field (text or number). Returns an empty string when nothing has been entered.',
    ),
    'FBTextualImageField' => array(
        'GetSelectedOptions' => 'Returns the list of currently selected text/image options. Each option exposes Id and Label.',
        'GetValue' => 'Returns the list of currently selected text/image options (same as GetSelectedOptions).',
    ),
);
