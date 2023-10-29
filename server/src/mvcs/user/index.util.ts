import { Request, Response, NextFunction } from 'express';

import { UserModel } from './index.model';
import { Query } from '../../services/query/index.service';
import { HttpException } from '../../services/http-exception/index.service';
import { UserRequestI, UserResponseI, UserQueryParams, UserIdParam } from './index.types';

export class UserUtil {
    private readonly userModel: UserModel;

    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }

    handlerMissingUserIdParam(userId?: string) {
        if (!userId) throw new HttpException(400, 'Missing user ID');
    }

    async getUsers(
        req: Request<never, UserResponseI[], never, UserQueryParams>,
        _res: Response<UserResponseI[]>,
        _next: NextFunction
    ) {
        const populateAccount = Query.getRawQueryValue<Array<string>>(
            req.query.include!
        )?.includes?.('accountRef');
        let users;

        if (populateAccount) {
            users = await this.userModel.findUsers().populate('Account').lean().exec();
        } else {
            users = await this.userModel.findUsers().lean().exec();
        }

        return users;
    }

    async getUser(
        userId: string,
        req: Request<UserIdParam, UserResponseI, Partial<UserRequestI>, UserQueryParams>
    ) {
        const populateAccount = Query.getRawQueryValue<Array<string>>(
            req.query.include!
        )?.includes?.('accountRef');
        let user;

        if (populateAccount) {
            user = await this.userModel.findUserById(userId).populate('Account').lean().exec();
        } else {
            user = await this.userModel.findUserById(userId).lean().exec();
        }

        if (!user) throw new HttpException(404, `User with ID ${userId} is not found`);

        return user;
    }
}
