import { Account } from './index.schema';
import { AccountRequestI } from './index.types';

export class AccountModel {
    /**
     * @createAccount creates a new account using the provided account request data.
     * @param {AccountRequestI} account - The `account` parameter is of type `AccountRequestI`.
     * @returns The `createAccount` function is returning the result of calling the `Account.create` method
     * with the `account` parameter.
     */
    createAccount(account: AccountRequestI) {
        return Account.create(account);
    }

    /**
     * @findAccounts returns all accounts without the "createdAt" and "updatedAt" fields.
     * @returns The findAccounts() function is returning a query to find all accounts in the database. The
     * query is using the Account model and specifying that the createdAt and updatedAt fields should not
     * be included in the results. The lean() method is used to return plain JavaScript objects instead of
     * Mongoose documents, and the exec() method is used to execute the query.
     */
    findAccounts() {
        return Account.find({}, { createdAt: 0, updatedAt: 0 });
    }

    /**
     * @findAccountById retrieves an account by its ID and returns it without the `createdAt`
     * and `updatedAt` fields.
     * @param {string} accountId - A string representing the ID of the account to be found.
     * @returns the result of the `Account.findById` query, with the `createdAt` and `updatedAt` fields
     * excluded, and the result is converted to a plain JavaScript object using the `lean()` method.
     */
    findAccountById(accountId: string) {
        return Account.findById(accountId, { createdAt: 0, updatedAt: 0 });
    }

    /**
     * @findAccountByIban finds an account by its IBAN and returns it without including the
     * `createdAt` and `updatedAt` fields.
     * @param {string} iban - The `iban` parameter is a string that represents the International Bank
     * Account Number (IBAN) of an account.
     * @returns the result of the `Account.findOne()` method.
     */
    findAccountByIban(iban: string) {
        return Account.findOne({ iban }, { createdAt: 0, updatedAt: 0 });
    }

    /**
     * @findAccountByMultipleQueries finds an account by multiple queries and returns it without the createdAt and updatedAt
     * fields.
     * @param account - A partial object of type AccountRequestI. This object contains properties that can
     * be used to query and find an account in the database.
     * @returns the result of the `findOne` method of the `Account` model. The `findOne` method is used to
     * find a single document in the `Account` collection that matches the given query criteria. In this
     * case, the query criteria is the `account` object, which is a partial `AccountRequestI` object. The
     * second argument `{ createdAt: 0, updatedAt:0}
     */
    findAccountByMultipleQueries(account: Partial<AccountRequestI>) {
        return Account.findOne(account, { createdAt: 0, updatedAt: 0 });
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
    updateAccountById(accountId: string, account: Partial<AccountRequestI>) {
        return Account.findByIdAndUpdate(accountId, account, { new: true, runValidators: true });
    }

    /**
     * @patchAccount patches an  existing account with the provided account data.
     * @param {string} accountId - A string representing the ID of the account that needs to be updated.
     * @param account - The `account` parameter is an object of type `Partial<AccountRequestI>`. It
     * represents the updated account information that needs to be patched.
     * @returns the updated account object.
     */
    async patchAccountById(accountId: string, account: Partial<AccountRequestI>) {
        const _account = await Account.findById(accountId);
        return Account.findByIdAndUpdate(accountId, Object.assign(_account!, account), {
            new: true,
            runValidators: true,
        });
    }

    /**
     * @deleteAccountById deletes an account from the database based on its ID.
     * @param {string} accountId - A string representing the unique identifier of the account that needs to
     * be deleted.
     * @returns the result of the `Account.findByIdAndDelete(accountId)` method.
     */

    deleteAccountById(accountId: string) {
        return Account.findByIdAndDelete(accountId);
    }
}
