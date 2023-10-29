import { Router } from 'express';

import { UserController } from './index.controller';

const userRouter = Router();
const userController = new UserController();

/**
 * 🚨@TODO Add role authorization for `/` so its accessible by admins only
 */
userRouter.route('/').get(userController.httpGetUsers);
userRouter.route('/:userId').get(userController.httpGetUser);
userRouter.route('/:userId').put(userController.httpUpdateUser);
userRouter.route('/:userId').patch(userController.httpPatchUser);
userRouter.route('/:userId').delete(userController.httpDeleteUser);

export { userRouter };
