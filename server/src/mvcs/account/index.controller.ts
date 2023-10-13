import { RequestHandler } from 'express';

import { AccountServices } from './index.services';
import { asyncHandler } from '../../middlewares/async-handler.middleware';

export class AccountController {
    private accountServices = new AccountServices();

    /**
     * @httpCreateAccount used to create a new account
     * ````ts
     * POST /accounts
     * ```
     */
    public httpCreateAccount = asyncHandler(
        this.accountServices.createAccount as unknown as RequestHandler
    );

    /**
     * @httpGetAccounts used to get accounts
     * ````ts
     * GET /accounts
     * ```
     */
    public httpGetAccounts = asyncHandler(
        this.accountServices.getAccounts as unknown as RequestHandler
    );

    /**
     * @httpGetAccount used to get a account
     * ````ts
     * GET /accounts/:accountId
     * ```
     */
    public httpGetAccount = asyncHandler(
        this.accountServices.getAccount as unknown as RequestHandler
    );

    /**
     * @httpUpdateAccount used to update an existing account
     * ````ts
     * PUT /accounts/:accountId
     * ```
     */
    public httpUpdateAccount = asyncHandler(
        this.accountServices.updateAccount as unknown as RequestHandler
    );

    /**
     * @httpPatchAccount used to patch an existing account
     * ````ts
     * PATCH /accounts/:accountId
     * ```
     */
    public httpPatchAccount = asyncHandler(
        this.accountServices.patchAccount as unknown as RequestHandler
    );

    /**
     * @httpDeleteAccount used to delete an existing account
     * ````ts
     * DELETE /accounts/:accountId
     * ```
     */
    public httpDeleteAccount = asyncHandler(
        this.accountServices.deleteAccount as unknown as RequestHandler
    );
}
