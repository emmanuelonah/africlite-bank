import { RequestHandler } from 'express';

import { UserServices } from './index.services';
import { asyncHandler } from '../../middlewares/async-handler';

export class UserController {
    private userServices = new UserServices();

    public httpGetUsers = asyncHandler(this.userServices.getUsers as unknown as RequestHandler);

    public httpGetUser = asyncHandler(this.userServices.getUser as unknown as RequestHandler);

    public httpCreateUser = asyncHandler(this.userServices.createUser as unknown as RequestHandler);

    public httpUpdateUser = asyncHandler(this.userServices.updateUser as unknown as RequestHandler);

    public httpPatchUser = asyncHandler(this.userServices.patchUser as unknown as RequestHandler);

    public httpDeleteUser = asyncHandler(this.userServices.deleteUser as unknown as RequestHandler);
}
