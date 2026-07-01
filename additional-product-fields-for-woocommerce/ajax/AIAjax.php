<?php


namespace rednaowooextraproduct\ajax;


use rednaowooextraproduct\Managers\AIManagers\AIException;
use rednaowooextraproduct\Managers\AIManagers\AIGenerators\AIFormulaGenerator\AIFormulaGenerator;
use rednaowooextraproduct\Managers\AIManagers\APICaller\APICallerBase;
use rednaowooextraproduct\repository\AISettings;

/**
 * Ajax endpoints for the AI assistant. It reuses the builder nonce
 * ('product_designer') so the already localized rednaoProductDesigner._nonce
 * works with no extra plumbing.
 *
 * The chat endpoints switch on messageType so the same configurable side panel
 * can later serve other prompt types (styles, conditions, ...). Today only
 * 'formula-generator' is wired.
 */
class AIAjax extends AjaxBase
{
    public function __construct($core, $prefix)
    {
        parent::__construct($core, $prefix, 'product_designer');
    }

    protected function RegisterHooks()
    {
        // Nonce is verified manually (VerifyBuilderNonce) so the same endpoints
        // work from both the per-product builder ('product_designer') and the
        // global product builder ('global_product'), which localize different
        // nonces into the shared rednaoProductDesigner global. The administrator
        // capability check is still enforced by RegisterPrivate.
        $this->RegisterPrivate('save_ai_settings', 'SaveAISettings', 'administrator', false);
        $this->RegisterPrivate('validate_ai_key', 'ValidateAIKey', 'administrator', false);
        $this->RegisterPrivate('ai_generate_formula', 'GenerateFormula', 'administrator', false);
        $this->RegisterPrivate('ai_build_prompt', 'BuildPrompt', 'administrator', false);
        $this->RegisterPrivate('ai_process_external_response', 'ProcessExternalResponse', 'administrator', false);
    }

    /**
     * Accepts either builder nonce (product_designer or global_product).
     */
    private function VerifyBuilderNonce()
    {
        $nonce = '';
        if (isset($_POST['_nonce']))
            $nonce = $_POST['_nonce'];
        else if (isset($_GET['_nonce']))
            $nonce = $_GET['_nonce'];

        if ($nonce != '' && (\wp_verify_nonce($nonce, $this->prefix . '_product_designer') || \wp_verify_nonce($nonce, $this->prefix . '_global_product')))
            return;

        $this->SendErrorMessage(__('Invalid request, please refresh the screen and try again', 'additional-product-fields-for-woocommerce'));
    }

    public function SaveAISettings()
    {
        $this->VerifyBuilderNonce();
        $provider = $this->GetRequired('Provider');
        $apiKey = $this->GetOptional('ApiKey', '');
        $model = $this->GetOptional('Model', '');

        // The client never receives the stored key, so an empty ApiKey while the
        // same provider is already configured means "keep the current key".
        if ($apiKey === '' && AISettings::GetProvider($this->Loader) === $provider)
            $apiKey = AISettings::GetApiKey($this->Loader);

        AISettings::Save($this->Loader, $provider, $apiKey, $model);
        $this->SendSuccessMessage(AISettings::GetForClient($this->Loader));
    }

    public function ValidateAIKey()
    {
        $this->VerifyBuilderNonce();
        $provider = $this->GetRequired('Provider');
        $apiKey = $this->GetOptional('ApiKey', '');
        $model = $this->GetOptional('Model', '');

        if ($apiKey === '' && AISettings::GetProvider($this->Loader) === $provider)
            $apiKey = AISettings::GetApiKey($this->Loader);

        if ($apiKey === '')
            $this->SendErrorMessage(__('Please enter an API key before validating.', 'additional-product-fields-for-woocommerce'));

        $caller = APICallerBase::GetCallerByName($this->Loader, $provider);
        if ($caller === null)
            $this->SendErrorMessage(__('The selected AI provider is not supported.', 'additional-product-fields-for-woocommerce'));

        $caller->SetAPIKey($apiKey)->SetModel($model);

        try {
            $caller->Chat(array(
                (object)array('role' => 'user', 'content' => 'Reply with a tiny JSON object like {"ok":true} and nothing else.'),
            ));
            $this->SendSuccessMessage(__('The API key is valid.', 'additional-product-fields-for-woocommerce'));
        } catch (AIException $e) {
            $this->SendErrorMessage($e->getMessage());
        } catch (\Throwable $e) {
            $this->SendErrorMessage(__('The API key could not be validated, please try again.', 'additional-product-fields-for-woocommerce'));
        }
    }

    public function GenerateFormula()
    {
        $this->VerifyBuilderNonce();
        $messageType = $this->GetRequired('messageType');
        $message = $this->GetRequired('message');
        $history = $this->GetOptional('history', null);

        try {
            switch ($messageType) {
                case 'formula-generator':
                    $generator = new AIFormulaGenerator($this->Loader);
                    $result = $generator->Generate(
                        $message,
                        $history,
                        $this->GetOptional('fields', array()),
                        $this->GetOptional('targetField', null),
                        $this->GetOptional('expectedReturnType', 'any')
                    );
                    $this->SendSuccessMessage($result);
                    break;
                default:
                    $this->SendErrorMessage(__('Unsupported AI request.', 'additional-product-fields-for-woocommerce'));
            }
        } catch (AIException $e) {
            $this->SendErrorMessage($e->getMessage());
        } catch (\Throwable $e) {
            $this->SendErrorMessage(__('The AI request failed, please try again.', 'additional-product-fields-for-woocommerce'));
        }
    }

    public function BuildPrompt()
    {
        $this->VerifyBuilderNonce();
        $messageType = $this->GetRequired('messageType');
        $message = $this->GetRequired('message');
        $history = $this->GetOptional('history', null);

        try {
            switch ($messageType) {
                case 'formula-generator':
                    $generator = new AIFormulaGenerator($this->Loader);
                    $result = $generator->BuildPromptOnly(
                        $message,
                        $history,
                        $this->GetOptional('fields', array()),
                        $this->GetOptional('targetField', null),
                        $this->GetOptional('expectedReturnType', 'any')
                    );
                    $this->SendSuccessMessage($result);
                    break;
                default:
                    $this->SendErrorMessage(__('External chat is not available for this request.', 'additional-product-fields-for-woocommerce'));
            }
        } catch (AIException $e) {
            $this->SendErrorMessage($e->getMessage());
        } catch (\Throwable $e) {
            $this->SendErrorMessage(__('The prompt could not be built, please try again.', 'additional-product-fields-for-woocommerce'));
        }
    }

    public function ProcessExternalResponse()
    {
        $this->VerifyBuilderNonce();
        $messageType = $this->GetRequired('messageType');
        $responseJson = $this->GetRequired('responseJson');
        $message = $this->GetOptional('message', '');
        $history = $this->GetOptional('history', null);

        try {
            switch ($messageType) {
                case 'formula-generator':
                    $generator = new AIFormulaGenerator($this->Loader);
                    $result = $generator->ProcessExternalResponse($responseJson, $message, $history);
                    $this->SendSuccessMessage($result);
                    break;
                default:
                    $this->SendErrorMessage(__('External chat is not available for this request.', 'additional-product-fields-for-woocommerce'));
            }
        } catch (AIException $e) {
            $this->SendErrorMessage($e->getMessage());
        } catch (\Throwable $e) {
            $this->SendErrorMessage(__('The response could not be processed, please try again.', 'additional-product-fields-for-woocommerce'));
        }
    }
}
