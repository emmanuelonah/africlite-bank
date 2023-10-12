import { Account } from './index.schema';
import { AccountRequestI } from './index.types';

export class AccountModel {
    /**
     * @createAccount creates a new account using the provided account request data.
     * @param {AccountRequestI} account - The `account` parameter is of type `AccountRequestI`.
     * @returns The `createAccount` function is returning the result of calling the `Account.create` method
     * with the `account` parameter.
     */
    public createAccount(account: AccountRequestI) {
        return Account.create(account);
    }

    /**
     * @findAccounts returns all accounts without the "createdAt" and "updatedAt" fields.
     * @returns The findAccounts() function is returning a query to find all accounts in the database. The
     * query is using the Account model and specifying that the createdAt and updatedAt fields should not
     * be included in the results. The lean() method is used to return plain JavaScript objects instead of
     * Mongoose documents, and the exec() method is used to execute the query.
     */
    public findAccounts() {
        return Account.find({}, { createdAt: 0, updatedAt: 0 }).lean().exec();
    }

    /**
     * @findAccountById retrieves an account by its ID and returns it without the `createdAt`
     * and `updatedAt` fields.
     * @param {string} accountId - A string representing the ID of the account to be found.
     * @returns the result of the `Account.findById` query, with the `createdAt` and `updatedAt` fields
     * excluded, and the result is converted to a plain JavaScript object using the `lean()` method.
     */
    public findAccountById(accountId: string) {
        return Account.findById(accountId, { createdAt: 0, updatedAt: 0 }).lean().exec();
    }

    /**
     * @updateAccount updates an account with the given accountId using the provided account data.
     * @param {string} accountId - A string representing the ID of the account that needs to be updated.
     * @param account - The `account` parameter is an object of type `Partial<AccountRequestI>`. It
     * represents the updated account information that needs to be applied to the account with the
     * specified `accountId`.
     * @returns the result of the `Account.findByIdAndUpdate` method, which is a promise that resolves to
     * the updated account object.
     */
    public updateAccount(accountId: string, account: Partial<AccountRequestI>) {
        return Account.findByIdAndUpdate(accountId, account, { new: true, runValidators: true }).lean().exec();
    }

    /**
     * @patchAccount patches an  existing account with the provided account data.
     * @param {string} accountId - A string representing the ID of the account that needs to be updated.
     * @param account - The `account` parameter is an object of type `Partial<AccountRequestI>`. It
     * represents the updated account information that needs to be patched.
     * @returns the updated account object.
     */
    public async patchAccount(accountId: string, account: Partial<AccountRequestI>) {
        const _account = await Account.findById(accountId);
        return Account.findByIdAndUpdate(accountId, Object.assign(_account, account), { new: true, runValidators: true }).lean().exec();
    }

    /**
     * @deleteAccountById deletes an account from the database based on its ID.
     * @param {string} accountId - A string representing the unique identifier of the account that needs to
     * be deleted.
     * @returns the result of the `Account.findByIdAndDelete(accountId)` method.
     */

    public deleteAccountById(accountId: string) {
        return Account.findByIdAndDelete(accountId);
    }
}
