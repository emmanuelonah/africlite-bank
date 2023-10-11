import { RequestHandler } from 'express';

import { UserServices } from './index.services';
import { asyncHandler } from '../../middlewares/async-handler';

export class UserController {
    private userServices = new UserServices();

    /**
     * @httpGetUsers used to get users
     * ````ts
     * GET /users
     * ```
     */
    public httpGetUsers = asyncHandler(this.userServices.getUsers as unknown as RequestHandler);

    /**
     * @httpGetUser used to get a user
     * ````ts
     * GET /users/:userId
     * ```
     */
    public httpGetUser = asyncHandler(this.userServices.getUser as unknown as RequestHandler);

    /**
     * @httpCreateUser used to create a new user
     * ````ts
     * POST /users
     * ```
     */
    public httpCreateUser = asyncHandler(this.userServices.createUser as unknown as RequestHandler);

    /**
     * @httpUpdateUser used to update an existing user
     * ````ts
     * PUT /users/:userId
     * ```
     */
    public httpUpdateUser = asyncHandler(this.userServices.updateUser as unknown as RequestHandler);

    /**
     * @httpPatchUser used to patch an existing user
     * ````ts
     * PATCH /users/:userId
     * ```
     */
    public httpPatchUser = asyncHandler(this.userServices.patchUser as unknown as RequestHandler);

    /**
     * @httpDeleteUser used to delete an existing user
     * ````ts
     * DELETE /users/:userId
     * ```
     */
    public httpDeleteUser = asyncHandler(this.userServices.deleteUser as unknown as RequestHandler);
}
