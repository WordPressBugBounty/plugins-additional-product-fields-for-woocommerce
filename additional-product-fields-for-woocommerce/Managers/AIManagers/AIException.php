<?php


namespace rednaowooextraproduct\Managers\AIManagers;


use Exception;

/**
 * Exception whose message is safe to show to the user (e.g. "the api key is
 * invalid"). AIAjax surfaces these messages verbatim; any other Throwable is
 * replaced with a generic message so internal details are not leaked.
 */
class AIException extends Exception
{
}
