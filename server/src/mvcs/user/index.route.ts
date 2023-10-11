import { Router } from 'express';

import { UserController } from './index.controller';

const userRouter = Router();
const controller = new UserController();

userRouter.route('/').get(controller.httpGetUsers);
userRouter.route('/:userId').get(controller.httpGetUser);
userRouter.route('/').post(controller.httpCreateUser);
userRouter.route('/:userId').put(controller.httpUpdateUser);
userRouter.route('/:userId').patch(controller.httpPatchUser);
userRouter.route('/:userId').delete(controller.httpDeleteUser);

export { userRouter };
