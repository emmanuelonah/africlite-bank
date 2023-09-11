import { Router } from 'express';

import { userRouter } from '../mvcs/user/index.route';

const apiRouterV1 = Router();

apiRouterV1.use('/users', userRouter);

export { apiRouterV1 };
