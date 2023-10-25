import { Schema } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import { UserUtil } from './index.util';
import { UserModel } from './index.model';
import { initDto } from '../../utils/init-dto.util';
import { AccountModel } from '../account/index.model';
import { response } from '../../services/response/index.service';
import { CreateUserDto, UpdateUserDto, PatchUserDto } from './dto';
import { HttpException } from '../../services/http-exception/index.service';
import { UserRequestI, UserResponseI, UserQueryParams, UserIdParam } from './index.types';

export class UserServices {
    private userModel = new UserModel();
    private userUtil = new UserUtil(this.userModel);

    createUser = async (
        req: Request<never, UserResponseI, UserRequestI>,
        res: Response<UserResponseI>,
        next: NextFunction
    ) => {
        try {
            await initDto(CreateUserDto, req.body);

            const user = await this.userModel.findUserByEmail(req.body.email);

            if (user) throw new HttpException(409, 'User already exists');

            const createdUser = await this.userModel.createUser(req.body);

            delete req.body.password;
            return res.status(200).json(response(Object.assign(req.body, { id: createdUser.id })));
        } catch (error) {
            return next(new HttpException(error.statusCode, error.message));
        }
    };

    getUsers = async (
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

    getUser = async (
        req: Request<UserIdParam, UserResponseI, never, UserQueryParams>,
        res: Response<UserResponseI>,
        next: NextFunction
    ) => {
        try {
            const { userId } = req.params;
            this.userUtil.handlerMissingUserIdParam(userId);

            const user = await this.userUtil.getUser(userId, req);

            return res.status(200).json(response(user) as UserResponseI);
        } catch (error) {
            return next(new HttpException(error.statusCode, error.message));
        }
    };

    updateUser = async (
        req: Request<UserIdParam, UserResponseI, UserRequestI, UserQueryParams>,
        res: Response<UserResponseI>,
        next: NextFunction
    ) => {
        try {
            await initDto(UpdateUserDto, req.body);

            const { userId } = req.params;
            this.userUtil.handlerMissingUserIdParam(userId);

            const user = await this.userUtil.getUser(userId, req);

            await this.userModel.updateUserById(userId, req.body);
            return res.status(200).json(response(user) as UserResponseI);
        } catch (error) {
            return next(new HttpException(error.statusCode, error.message));
        }
    };

    patchUser = async (
        req: Request<UserIdParam, UserResponseI, Partial<UserRequestI>, UserQueryParams>,
        res: Response<UserResponseI>,
        next: NextFunction
    ) => {
        try {
            await initDto(PatchUserDto, req.body);

            const { userId } = req.params;
            this.userUtil.handlerMissingUserIdParam(userId);

            const user = await this.userUtil.getUser(userId, req);

            await this.userModel.patchUserById(userId, req.body);
            return res.status(200).json(response(user) as UserResponseI);
        } catch (error) {
            return next(new HttpException(error.statusCode, error.message));
        }
    };

    deleteUser = async (
        req: Request<UserIdParam, UserResponseI, never, UserQueryParams>,
        res: Response<UserResponseI>,
        next: NextFunction
    ) => {
        try {
            const { userId } = req.params;
            this.userUtil.handlerMissingUserIdParam(userId);

            const user = await this.userUtil.getUser(userId, req);

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
        } catch (error) {
            return next(new HttpException(error.statusCode, error.message));
        }
    };
}
