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
}
