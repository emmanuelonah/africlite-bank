import { Router } from 'express';

import { AccountController } from './index.controller';

const accountRouter = Router();
const accountController = new AccountController();

/**
 * 🚨@TODO Add role authorization for `/` so its accessible by admins only
 */
accountRouter.route('/').get(accountController.httpGetAccounts);
accountRouter.route('/:accountId').get(accountController.httpGetAccount);
accountRouter.route('/:accountId').put(accountController.httpUpdateAccount);
accountRouter.route('/:accountId').patch(accountController.httpPatchAccount);

export { accountRouter };
