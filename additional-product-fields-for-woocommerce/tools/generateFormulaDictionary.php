<?php
/**
 * Generates Managers/AIManagers/Descriptions/FormulaDescriptions.php from the
 * @formula doc-comments found on the field models.
 *
 * A @formula tag documents a user-callable accessor (GetValue, GetText,
 * GetColumnValue, IsUsed, Contains, ...) that end users may reference inside a
 * formula. The generated dictionary maps each field class to
 * { methodName => description } and is later merged (following FieldTypeClassMap)
 * to build the per-field context sent to the AI.
 *
 * Usage:  php tools/generateFormulaDictionary.php
 *
 * DO NOT hand-edit FormulaDescriptions.php: edit the @formula comments and rerun.
 */

$root = dirname(__DIR__);
$scanDir = $root . '/core/Managers/FormManager/Fields';
$outputFile = $root . '/Managers/AIManagers/Descriptions/FormulaDescriptions.php';

if (!is_dir($scanDir)) {
    fwrite(STDERR, "Fields directory not found: $scanDir\n");
    exit(1);
}

// Matches:  /** \n * @formula <description> \n */ \n [modifiers] function <name>
$pattern = '/@formula\s+([^\r\n]+?)\s*\r?\n\s*\*\/\s*\r?\n\s*(?:public\s+|protected\s+|private\s+)?(?:static\s+)?function\s+(\w+)/';

$dictionary = array();
$files = glob($scanDir . '/*.php');
sort($files);

foreach ($files as $file) {
    $contents = file_get_contents($file);
    if ($contents === false)
        continue;

    if (!preg_match('/\bclass\s+(\w+)/', $contents, $classMatch))
        continue;
    $className = $classMatch[1];

    if (!preg_match_all($pattern, $contents, $matches, PREG_SET_ORDER))
        continue;

    foreach ($matches as $match) {
        $description = trim($match[1]);
        $methodName = $match[2];

        if (!isset($dictionary[$className]))
            $dictionary[$className] = array();

        // First @formula for a method wins (keeps diffs stable).
        if (!isset($dictionary[$className][$methodName]))
            $dictionary[$className][$methodName] = $description;
    }
}

// Stable ordering
ksort($dictionary);
foreach ($dictionary as &$methods)
    ksort($methods);
unset($methods);

// Render the PHP file
$timestamp = date('c');
$php = "<?php\n";
$php .= "// AUTO-GENERATED $timestamp - DO NOT EDIT MANUALLY.\n";
$php .= "// Run: php tools/generateFormulaDictionary.php\n";
$php .= "return array(\n";
foreach ($dictionary as $className => $methods) {
    $php .= "    '" . escapeForPhp($className) . "' => array(\n";
    foreach ($methods as $methodName => $description) {
        $php .= "        '" . escapeForPhp($methodName) . "' => '" . escapeForPhp($description) . "',\n";
    }
    $php .= "    ),\n";
}
$php .= ");\n";

$outputDir = dirname($outputFile);
if (!is_dir($outputDir))
    mkdir($outputDir, 0755, true);

file_put_contents($outputFile, $php);

$methodCount = 0;
foreach ($dictionary as $methods)
    $methodCount += count($methods);

echo "Generated " . count($dictionary) . " field classes / $methodCount methods -> $outputFile\n";

function escapeForPhp($value)
{
    return str_replace(array('\\', "'"), array('\\\\', "\\'"), $value);
}
