import { User } from './index.schema';
import { UserRequestI } from './index.types';

export class UserModel {
    /**
     * @createUser creates a new user by calling the `create` method of the `User` class with
     * the provided user data.
     * @param {UserRequestI} user - The `user` parameter is of type `UserRequestI`, which is an interface
     * representing the request body for creating a user.
     * @returns The createUser function is returning the result of calling the User.create method with the
     * user parameter.
     */
    public createUser(user: UserRequestI) {
        return User.create(user);
    }

    /**
     * @findUsers returns all users from the database without including the `createdAt` and
     * `updatedAt` fields.
     * @returns a query to find all users in the database. The query is using the `find()` method with an
     * empty filter object `{}` to retrieve all users. The second argument `{ createdAt: 0, updatedAt: 0 }`
     * is used to exclude the `createdAt` and `updatedAt` fields from the returned documents. The `lean()`
     * method is used to convert the documents to
     */
    public findUsers() {
        return User.find({}, { createdAt: 0, updatedAt: 0 });
    }

    /**
     * @findUserByEmail finds a user in the database based on their email and returns the
     * user object without the `createdAt` and `updatedAt` fields.
     * @param {string} email - A string representing the email address of the user to be found.
     * @returns a promise that resolves to the user object with the specified email. The user object will
     * not include the createdAt and updatedAt fields.
     */
    public findUserByEmail(email: string) {
        return User.findOne({ email }, { createdAt: 0, updatedAt: 0 });
    }

    /**
     * @findUserById retrieves a user from the database by their ID, excluding the
     * `createdAt` and `updatedAt` fields.
     * @param {string} userId - A string representing the unique identifier of the user you want to find.
     * @returns a promise that resolves to the user object with the specified userId. The user object will
     * not include the createdAt and updatedAt fields.
     */
    public findUserById(userId: string) {
        return User.findById(userId, { createdAt: 0, updatedAt: 0 });
    }

    /**
     * @findUserByMultipleQueries  finds a user in the database based on multiple queries and
     * returns the result without the `createdAt` and `updatedAt` fields.
     * @param user - A partial object of type UserRequestI, which represents the query parameters to find a
     * user. It contains partial properties of the User model that can be used to filter the search.
     * @returns a promise that resolves to a user object that matches the provided partial user request.
     * The returned user object will not include the createdAt and updatedAt fields.
     */
    public findUserByMultipleQueries(user: Partial<UserRequestI>) {
        return User.findOne(user, { createdAt: 0, updatedAt: 0 });
    }

    /**
     * @updateUserById updates a user by their ID using the provided user object.
     * @param {string} userId - A string representing the unique identifier of the user to be updated.
     * @param {UserRequestI} user - The `user` parameter is an object of type `UserRequestI`. It contains
     * the updated information for the user that needs to be updated in the database.
     * @returns the result of the `User.findByIdAndUpdate` method.
     */
    public updateUserById(userId: string, user: UserRequestI) {
        return User.findByIdAndUpdate(userId, user, { new: true, runValidators: true });
    }

    /**
     * @patchUserById updates a user by their ID with the provided partial user object.
     * @param {string} userId - The userId parameter is a string that represents the unique identifier of
     * the user you want to update.
     * @param user - The `user` parameter is an object of type `Partial<UserRequestI>`. It represents the
     * updated user data that needs to be patched.
     * @returns the result of the `User.findByIdAndUpdate` method.
     */
    public async patchUserById(userId: string, user: Partial<UserRequestI>) {
        const _user = await User.findById(userId, { createdAt: 0, updatedAt: 0 });
        return User.findByIdAndUpdate(userId, Object.assign(_user, user), { new: true, runValidators: true });
    }

    /**
     * @deleteUserById deletes a user from the database based on their ID.
     * @param {string} userId - A string representing the unique identifier of the user to be deleted.
     * @returns The `User.findByIdAndDelete(userId)` method is being returned.
     */
    public deleteUserById(userId: string) {
        return User.findByIdAndDelete(userId);
    }
}
