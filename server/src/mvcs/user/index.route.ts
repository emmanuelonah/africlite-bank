import { Router } from 'express';

import { UserController } from './index.controller';

const userRouter = Router();
const controller = new UserController();

userRouter.get('/', controller.httpGetUsers);
userRouter.get('/:userId', controller.httpGetUser);
userRouter.post('/', controller.httpCreateUser);
userRouter.put('/:userId', controller.httpUpdateUser);
userRouter.patch('/:userId', controller.httpPatchUser);
userRouter.delete('/:userId', controller.httpDeleteUser);

export { userRouter };
