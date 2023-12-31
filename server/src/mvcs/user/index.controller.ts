import { RequestHandler } from 'express';

import { UserServices } from './index.services';
import { asyncHandler } from '../../middlewares/async-handler.middleware';

export class UserController {
    private userServices = new UserServices();

    /**
     * @httpCreateUser used to create a new user
     * ````ts
     * POST /users
     * ```
     */
    httpCreateUser = asyncHandler(this.userServices.createUser as unknown as RequestHandler);

    /**
     * @httpGetUsers used to get users
     * ````ts
     * GET /users
     * ```
     */
    httpGetUsers = asyncHandler(this.userServices.getUsers as unknown as RequestHandler);

    /**
     * @httpGetUser used to get a user
     * ````ts
     * GET /users/:userId
     * ```
     */
    httpGetUser = asyncHandler(this.userServices.getUser as unknown as RequestHandler);

    /**
     * @httpUpdateUser used to update an existing user
     * ````ts
     * PUT /users/:userId
     * ```
     */
    httpUpdateUser = asyncHandler(this.userServices.updateUser as unknown as RequestHandler);

    /**
     * @httpPatchUser used to patch an existing user
     * ````ts
     * PATCH /users/:userId
     * ```
     */
    httpPatchUser = asyncHandler(this.userServices.patchUser as unknown as RequestHandler);

    /**
     * @httpDeleteUser used to delete an existing user
     * ````ts
     * DELETE /users/:userId
     * ```
     */
    httpDeleteUser = asyncHandler(this.userServices.deleteUser as unknown as RequestHandler);
}
