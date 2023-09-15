import { Request, Response, NextFunction } from 'express';

import { UserRequestI, UserSchemaI } from './index.types';

import { UserModel } from './index.model';
import { asyncHandler } from '../../middlewares/async-handler';
import { response } from '../../services/response/index.service';
import { HttpException } from '../../services/http-exception/index.service';

export class UserController {
    model = new UserModel();

    public httpGetUsers = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
        const users = await this.model.findUsers();

        return res.status(200).json(response(users));
    });

    public httpGetUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;

        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        const user = await this.model.findUserById(userId);

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));

        return res.status(200).json(response(user));
    });

    /**
     * How user creation is gonna happen:
     * => During sign up, we derive account creation data and create account.
     * => We then derive user creation data and create user. If we don't succeed, then we delete the created account
     */
    public httpCreateUser = asyncHandler(async (req: Request<{}, UserRequestI>, res: Response, next: NextFunction) => {
        const user = await this.model.findUserByMultipleQueries(req.body);

        if (user) return next(new HttpException(409, 'User already exists'));

        await this.model.createUser(req.body);

        return res.status(200).json(response(req.body));
    });

    public httpUpdateUser = asyncHandler(async (req: Request<any, UserSchemaI>, res: Response, next: NextFunction) => {
        const { userId } = req.params;

        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        const user = await this.model.findUserById(userId);

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));

        await this.model.updateUserById(userId, req.body);

        return res.status(200).json(response(user));
    });

    public httpPatchUser = asyncHandler(async (req: Request<any, Partial<UserSchemaI>>, res: Response, next: NextFunction) => {
        const { userId } = req.params;

        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        const user = await this.model.findUserById(userId);

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));

        await this.model.patchUserById(userId, req.body);

        return res.status(200).json(response(user));
    });

    public httpDeleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;

        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        const user = await this.model.findUserById(userId);

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));

        await this.model.deleteUserById(userId);

        return res.status(200).json(response(user));
    });
}
