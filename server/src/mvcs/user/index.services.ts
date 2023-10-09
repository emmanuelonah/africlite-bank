import { Request, Response, NextFunction } from 'express';

import { UserModel } from './index.model';
import { UserIdParam } from './index.types';
import { UserRequestI, UserSchemaI } from './index.types';
import { response } from '../../services/response/index.service';
import { HttpException } from '../../services/http-exception/index.service';

export class UserServices {
    private model = new UserModel();

    public async getUsers(_req: Request, res: Response, _next: NextFunction) {
        const users = await this.model.findUsers();
        return res.status(200).json(response(users));
    }

    public async getUser(req: Request<UserIdParam>, res: Response, next: NextFunction) {
        const { userId } = req.params;

        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        const user = await this.model.findUserById(userId);

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));

        return res.status(200).json(response(user));
    }

    public async createUser(req: Request<never, UserRequestI>, res: Response, next: NextFunction) {
        if (!Object.values(req.body).length) return next(new HttpException(400, 'Missing request body'));

        const user = await this.model.findUserByMultipleQueries(req.body);

        if (user) return next(new HttpException(409, 'User already exists'));

        await this.model.createUser(req.body);

        return res.status(200).json(response(req.body));
    }

    public async updateUser(req: Request<UserIdParam, UserSchemaI>, res: Response, next: NextFunction) {
        const { userId } = req.params;

        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        const user = await this.model.findUserById(userId);

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));

        await this.model.updateUserById(userId, req.body);

        return res.status(200).json(response(user));
    }

    public async patchUser(req: Request<UserIdParam, Partial<UserSchemaI>>, res: Response, next: NextFunction) {
        const { userId } = req.params;

        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        const user = await this.model.findUserById(userId);

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));

        await this.model.patchUserById(userId, req.body);

        return res.status(200).json(response(user));
    }

    public async deleteUser(req: Request<UserIdParam>, res: Response, next: NextFunction) {
        const { userId } = req.params;

        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        const user = await this.model.findUserById(userId);

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));

        await this.model.deleteUserById(userId);

        return res.status(200).json(response(user));
    }
}
