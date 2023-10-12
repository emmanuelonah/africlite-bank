import { Router } from 'express';

import { AccountController } from './index.contoller';

const accountRouter = Router();
const accountController = new AccountController();

accountRouter.route('/').post(accountController.httpCreateAccount);
accountRouter.route('/').get(accountController.httpGetAccounts);
accountRouter.route('/:accountId').get(accountController.httpGetAccount);
accountRouter.route('/:accountId').put(accountController.httpUpdateAccount);
accountRouter.route('/:accountId').patch(accountController.httpPatchAccount);
accountRouter.route('/:accountId').delete(accountController.httpDeleteAccount);

export { accountRouter };
