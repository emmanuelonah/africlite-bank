import { Schema } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import { UserModel } from './index.model';
import { UserIdParam } from './index.types';
import { initDto } from '../../utils/init-dto.util';
import { AccountModel } from '../account/index.model';
import { response } from '../../services/response/index.service';
import { CreateUserDto, UpdateUserDto, PatchUserDto } from './dto';
import { HttpException } from '../../services/http-exception/index.service';
import { UserRequestI, UserResponseI, UserQueryParams } from './index.types';

export class UserServices {
    private userModel = new UserModel();

    public createUser = async (
        req: Request<never, UserResponseI, UserRequestI>,
        res: Response<UserResponseI>,
        next: NextFunction
    ) => {
        const { hasErrors, error } = await initDto(CreateUserDto, req.body);
        if (hasErrors) return next(new HttpException(400, error));

        const user = await this.userModel.findUserByEmail(req.body.email);
        if (user) return next(new HttpException(409, 'User already exists'));

        const createdUser = await this.userModel.createUser(req.body);
        delete req.body.password;
        return res.status(200).json(response(Object.assign(req.body, { id: createdUser.id })));
    };

    public getUsers = async (
        req: Request<never, UserResponseI[], never, UserQueryParams>,
        res: Response<UserResponseI[]>,
        _next: NextFunction
    ) => {
        let users;

        if (req.query.include?.includes?.('accountRef')) {
            users = await this.userModel.findUsers().populate('Account').lean().exec();
        } else {
            users = await this.userModel.findUsers().lean().exec();
        }
        return res.status(200).json(response(users) as unknown as UserResponseI[]);
    };

    public getUser = async (
        req: Request<UserIdParam, UserResponseI, never, UserQueryParams>,
        res: Response<UserResponseI>,
        next: NextFunction
    ) => {
        const { userId } = req.params;
        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        let user;

        if (req.query.include?.includes?.('accountRef')) {
            user = await this.userModel.findUserById(userId).populate('Account').lean().exec();
        } else {
            user = await this.userModel.findUserById(userId).lean().exec();
        }

        console.log('USER', user);

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));
        return res.status(200).json(response(user) as UserResponseI);
    };

    public updateUser = async (
        req: Request<UserIdParam, UserResponseI, UserRequestI, UserQueryParams>,
        res: Response<UserResponseI>,
        next: NextFunction
    ) => {
        const { hasErrors, error } = await initDto(UpdateUserDto, req.body);
        if (hasErrors) return next(new HttpException(400, error));

        const { userId } = req.params;
        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        let user;

        if (req.query.include?.includes?.('accountRef')) {
            user = await this.userModel.findUserById(userId).populate('Account').lean().exec();
        } else {
            user = await this.userModel.findUserById(userId).lean().exec();
        }

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));

        await this.userModel.updateUserById(userId, req.body);
        return res.status(200).json(response(user) as UserResponseI);
    };

    public patchUser = async (
        req: Request<UserIdParam, UserResponseI, Partial<UserRequestI>, UserQueryParams>,
        res: Response<UserResponseI>,
        next: NextFunction
    ) => {
        const { hasErrors, error } = await initDto(PatchUserDto, req.body);
        if (hasErrors) return next(new HttpException(400, error));

        const { userId } = req.params;
        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        let user;

        if (req.query.include?.includes?.('accountRef')) {
            user = await this.userModel.findUserById(userId).populate('Account').lean().exec();
        } else {
            user = await this.userModel.findUserById(userId).lean().exec();
        }

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));

        await this.userModel.patchUserById(userId, req.body);
        return res.status(200).json(response(user) as UserResponseI);
    };

    public deleteUser = async (
        req: Request<UserIdParam, UserResponseI, never, UserQueryParams>,
        res: Response<UserResponseI>,
        next: NextFunction
    ) => {
        const { userId } = req.params;
        if (!userId) return next(new HttpException(400, 'Missing user ID'));

        let user;

        if (req.query.include?.includes?.('accountRef')) {
            user = await this.userModel.findUserById(userId).populate('Account').lean().exec();
        } else {
            user = await this.userModel.findUserById(userId).lean().exec();
        }

        if (!user) return next(new HttpException(404, `User with ID ${userId} is not found`));

        await this.userModel.deleteUserById(userId);

        const accountModel = new AccountModel();
        const accountToDelete = await accountModel
            .findAccountByMultipleQueries({
                userRef: userId as unknown as Schema.Types.ObjectId,
            })
            .lean()
            .exec();
        await accountModel.deleteAccountById(accountToDelete?.id);

        return res.status(200).json(response(user) as UserResponseI);
    };
}
