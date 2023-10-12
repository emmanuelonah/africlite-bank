import { Request, Response, NextFunction } from 'express';

import { UserModel } from './index.model';
import { UserIdParam } from './index.types';
import { initDto } from '../../utils/init-dto.util';
import { response } from '../../services/response/index.service';
import { CreateUserDto, UpdateUserDto, PatchUserDto } from './dto';
import { UserRequestI, UserSchemaI, UserQueryParams } from './index.types';
import { HttpException } from '../../services/http-exception/index.service';

export class UserServices {
    private model = new UserModel();

    public async createUser(req: Request<never, UserRequestI, UserRequestI>, res: Response, next: NextFunction) {
        const { hasErrors, error } = await initDto(CreateUserDto, req.body);
        if (hasErrors) return next(new HttpException(400, error));

        const user = await this.model.findUserByEmail(req.body.email);
        if (user) return next(new HttpException(409, 'User already exists'));

        const createdUser = await this.model.createUser(req.body);
        return res.status(200).json(response(Object.assign(req.body, { id: createdUser.id })));
    }

    public async getUsers(req: Request<never, {}, {}, UserQueryParams>, res: Response, _next: NextFunction) {
        let users;

        if (req.query.include?.includes?.('accountRef')) {
            users = await this.model.findUsers().populate('Account').lean().exec();
        } else {
            users = await this.model.findUsers().lean().exec();
        }
        return res.status(200).json(response(users));
    }

    public async getUser(req: Request<UserIdParam, {}, {}, UserQueryParams>, res: Response, next: NextFunction) {
        const { userId } = req.params;
        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        let user;

        if (req.query.include?.includes?.('accountRef')) {
            user = await this.model.findUserById(userId).populate('Account').lean().exec();
        } else {
            user = await this.model.findUserById(userId).lean().exec();
        }

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));

        return res.status(200).json(response(user));
    }

    public async updateUser(req: Request<UserIdParam, {}, UserRequestI, UserQueryParams>, res: Response, next: NextFunction) {
        const { hasErrors, error } = await initDto(UpdateUserDto, req.body);
        if (hasErrors) return next(new HttpException(400, error));

        const { userId } = req.params;
        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        let user;

        if (req.query.include?.includes?.('accountRef')) {
            user = await this.model.findUserById(userId).populate('Account').lean().exec();
        } else {
            user = await this.model.findUserById(userId).lean().exec();
        }

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));

        await this.model.updateUserById(userId, req.body);
        return res.status(200).json(response(user));
    }

    public async patchUser(req: Request<UserIdParam, {}, Partial<UserSchemaI>, UserQueryParams>, res: Response, next: NextFunction) {
        const { hasErrors, error } = await initDto(PatchUserDto, req.body);
        if (hasErrors) return next(new HttpException(400, error));

        const { userId } = req.params;
        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        let user;

        if (req.query.include?.includes?.('accountRef')) {
            user = await this.model.findUserById(userId).populate('Account').lean().exec();
        } else {
            user = await this.model.findUserById(userId).lean().exec();
        }

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));

        await this.model.patchUserById(userId, req.body);
        return res.status(200).json(response(user));
    }

    public async deleteUser(req: Request<UserIdParam, {}, {}, UserQueryParams>, res: Response, next: NextFunction) {
        const { userId } = req.params;
        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        let user;

        if (req.query.include?.includes?.('accountRef')) {
            user = await this.model.findUserById(userId).populate('Account').lean().exec();
        } else {
            user = await this.model.findUserById(userId).lean().exec();
        }

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));

        await this.model.deleteUserById(userId);
        return res.status(200).json(response(user));
    }
}
