<?php


namespace rednaowooextraproduct\Managers\AIManagers\AIGenerators\core;


use rednaowooextraproduct\core\Loader;
use rednaowooextraproduct\Managers\AIManagers\APICaller\APICallerBase;

/**
 * Base class for every AI "generator" (formula, and later style, condition,
 * etc). A generator turns a chat message + context into a provider prompt,
 * calls the provider and shapes the response for the frontend. The message type
 * routing lives in AIAjax; this class holds the shared plumbing.
 */
abstract class AIGeneratorBase
{
    /** @var Loader */
    protected $Loader;
    /** @var APICallerBase */
    protected $Caller;
    /** @var HistoryManager */
    public $History;

    public function __construct($loader, $caller = null)
    {
        $this->Loader = $loader;
        $this->Caller = $caller;
    }

    public function GetCaller()
    {
        if ($this->Caller == null)
            $this->Caller = APICallerBase::GetConfiguredCaller($this->Loader);
        return $this->Caller;
    }

    public function CreateMessage($role, $content)
    {
        return (object)array(
            'role' => $role,
            'content' => $content,
        );
    }

    /**
     * Extracts the content between the LAST opening [$tag] and the first matching
     * [/$tag] after it.
     *
     * In external-chat mode the reply pasted back frequently contains the prompt
     * itself (it sits right above the paste box, and some models echo it), and the
     * prompt uses these very delimiters in its instructions and examples. Anchoring
     * on the FIRST match would then capture prompt text and internal tags instead of
     * the answer. The real answer is always written last, so we anchor on the last
     * opening delimiter and read up to its closing tag.
     *
     * @param string $response full reply text
     * @param string $tag delimiter name without brackets, e.g. 'FORMULA'
     * @return string|null trimmed inner content, or null when the block is absent
     */
    protected function ExtractMarkerBlock($response, $tag)
    {
        if (!is_string($response))
            return null;

        $open = '[' . $tag . ']';
        $close = '[/' . $tag . ']';

        $start = strripos($response, $open);
        if ($start === false)
            return null;

        $contentStart = $start + strlen($open);
        $end = stripos($response, $close, $contentStart);
        if ($end === false)
            return null;

        return trim(substr($response, $contentStart, $end - $contentStart));
    }

    /**
     * Removes any stray delimiter tokens that leaked into a human-facing message.
     * Belt-and-suspenders for {@see ExtractMarkerBlock}: the extracted block is
     * already isolated, but if the model nested a delimiter inside its explanation
     * we still never want to show raw [FORMULA]/[CONDITIONS]/[EXPLANATION] tags.
     *
     * @param string $explanation
     * @return string
     */
    protected function SanitizeExplanation($explanation)
    {
        if (!is_string($explanation))
            return '';

        $explanation = preg_replace('/\[\/?(?:FORMULA|CONDITIONS|EXPLANATION)\]/i', '', $explanation);
        return trim($explanation);
    }
}
