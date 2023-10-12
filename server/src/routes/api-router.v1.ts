import { Router } from 'express';

import { userRouter } from '../mvcs/user/index.route';
import { accountRouter } from '../mvcs/account/index.route';

const apiRouterV1 = Router();

apiRouterV1.use('/users', userRouter);
apiRouterV1.use('/accounts', accountRouter);

export { apiRouterV1 };
