import { Request } from 'express';

import { UserModel } from './index.model';
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

    async getUser(
        userId: string,
        req: Request<UserIdParam, UserResponseI, Partial<UserRequestI>, UserQueryParams>
    ) {
        const populateAccount = req.query.include?.includes?.('accountRef');
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
