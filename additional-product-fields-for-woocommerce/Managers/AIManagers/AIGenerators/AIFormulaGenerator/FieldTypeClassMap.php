<?php
/**
 * Maps a field type slug (the client Options.Type, matching FieldFactory.php)
 * to the ordered chain of PHP field classes whose @formula methods apply to it.
 * The chain goes from most specific to least specific and always ends in
 * FBFieldBase. AIFormulaGenerator merges the method docs from FormulaDescriptions.php
 * following this order (first definition wins).
 */
return array(
    // FBTextField (single value fields)
    'text' => array('FBTextField', 'FBFieldBase'),
    'textarea' => array('FBTextField', 'FBFieldBase'),
    'number' => array('FBTextField', 'FBFieldBase'),
    'datepicker' => array('FBTextField', 'FBFieldBase'),
    'colorpicker' => array('FBTextField', 'FBFieldBase'),
    'switch' => array('FBTextField', 'FBFieldBase'),
    'rating' => array('FBTextField', 'FBFieldBase'),
    'masked' => array('FBTextField', 'FBFieldBase'),

    // FBSlider extends FBTextField
    'slider' => array('FBSlider', 'FBTextField', 'FBFieldBase'),
    'buttoncounter' => array('FBSlider', 'FBTextField', 'FBFieldBase'),

    // FBMultipleOptionsField (option based fields)
    'radio' => array('FBMultipleOptionsField', 'FBFieldBase'),
    'checkbox' => array('FBMultipleOptionsField', 'FBFieldBase'),
    'dropdown' => array('FBMultipleOptionsField', 'FBFieldBase'),
    'groupbutton' => array('FBMultipleOptionsField', 'FBFieldBase'),
    'buttonselection' => array('FBMultipleOptionsField', 'FBFieldBase'),
    'colorswatcher' => array('FBMultipleOptionsField', 'FBFieldBase'),
    'searchabledropdown' => array('FBMultipleOptionsField', 'FBFieldBase'),
    'likertscale' => array('FBMultipleOptionsField', 'FBFieldBase'),
    'fontpicker' => array('FBMultipleOptionsField', 'FBFieldBase'),
    'popupselectorfield' => array('FBMultipleOptionsField', 'FBFieldBase'),

    // FBTextualImageField (image + text options)
    'textualimage' => array('FBTextualImageField', 'FBFieldBase'),

    // Remaining core fields only expose the base accessors
    'signature' => array('FBFieldBase'),
    'termofservice' => array('FBFieldBase'),
    'googlemaps' => array('FBFieldBase'),
    'total' => array('FBFieldBase'),
    'textwithstyles' => array('FBFieldBase'),
    'survey' => array('FBFieldBase'),
    'range' => array('FBFieldBase'),
    'appointment' => array('FBFieldBase'),
);
