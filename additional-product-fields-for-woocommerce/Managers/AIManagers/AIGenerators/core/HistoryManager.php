<?php


namespace rednaowooextraproduct\Managers\AIManagers\AIGenerators\core;


/**
 * Keeps the running chat history (a list of {role, content}) between requests.
 * The frontend round-trips the history object untouched so the conversation can
 * grow across messages.
 */
class HistoryManager
{
    private $historyData;

    public function __construct($history)
    {
        $this->historyData = $history;
    }

    public function LogIsEmpty()
    {
        return $this->historyData == null || !isset($this->historyData->log) || count($this->historyData->log) == 0;
    }

    public function GetLog()
    {
        if ($this->LogIsEmpty())
            return array();
        return $this->historyData->log;
    }

    public function GetOrCreateHistory()
    {
        if ($this->historyData == null)
            $this->historyData = new \stdClass();
        return $this->historyData;
    }

    public function RecordHistoryLog($message, $role = 'assistant')
    {
        $history = $this->GetOrCreateHistory();
        if (!isset($history->log))
            $history->log = array();

        $history->log[] = (object)array(
            'role' => $role,
            'content' => $message,
        );

        return $history;
    }

    public function GetHistory()
    {
        return $this->historyData;
    }

    public function GetAllMessagesOfRole($role = 'user')
    {
        $result = array();
        foreach ($this->GetLog() as $item) {
            if (isset($item->role) && $item->role == $role)
                $result[] = $item;
        }
        return $result;
    }
}
