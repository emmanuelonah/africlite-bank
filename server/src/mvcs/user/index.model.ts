import { UserRequestI } from './index.types';

import { User } from './index.schema';

export class UserModel {
    ///GET
    public findUsers() {
        return User.find({}, { __v: 0 });
    }

    public findUserByEmail(email: string) {
        return User.findOne({ email }, { __v: 0 });
    }

    public findUserById(userId: string) {
        return User.findById(userId, { __v: 0 });
    }

    public findUserByMultipleQueries(user: Partial<UserRequestI>) {
        return User.findOne(user, { __v: 0 });
    }

    /// POST
    public createUser(user: UserRequestI) {
        return User.create(user);
    }

    ///PUT
    public updateUserById(userId: string, user: UserRequestI) {
        return User.findByIdAndUpdate(userId, user, { new: true, runValidators: true });
    }

    ///PATCH
    public patchUserById(userId: string, user: Partial<UserRequestI>) {
        const _user = User.findOne({ email: user.email }, { __v: 0 });

        return User.findByIdAndUpdate(userId, Object.assign(_user, user), { new: true, runValidators: true });
    }

    ///DELETE
    public deleteUserById(userId: string) {
        return User.findByIdAndDelete(userId);
    }
}
