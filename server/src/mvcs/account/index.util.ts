import { Request, Response, NextFunction } from 'express';

import { AccountModel } from './index.model';
import { Query } from '../../services/query/index.service';
import { HttpException } from '../../services/http-exception/index.service';
import {
    AccountRequestI,
    AccountResponseI,
    AccountQueryParams,
    AccountIdParam,
} from './index.types';

export class AccountUtil {
    private readonly accountModel: AccountModel;

    constructor(accountModel: AccountModel) {
        this.accountModel = accountModel;
    }

    handleMissingAccountIdParam(accountId?: string) {
        if (!accountId) throw new HttpException(400, 'Missing user ID');
    }

    async getAccounts(
        req: Request<never, AccountResponseI[], never, AccountQueryParams>,
        _res: Response<AccountResponseI[]>,
        _next: NextFunction
    ) {
        const populateUsers = Query.getRawQueryValue<Array<string>>(req.query.include!)?.includes?.(
            'userRef'
        );
        let accounts;

        if (populateUsers) {
            accounts = await this.accountModel.findAccounts().populate('User').lean().exec();
        } else {
            accounts = await this.accountModel.findAccounts().lean().exec();
        }

        return accounts;
    }

    async getAccount(
        accountId: string,
        req: Request<
            AccountIdParam,
            AccountResponseI,
            Partial<AccountRequestI> | never,
            AccountQueryParams
        >
    ) {
        const populateUser = Query.getRawQueryValue<Array<string>>(req.query.include!)?.includes?.(
            'userRef'
        );
        let account;

        if (populateUser) {
            account = await this.accountModel
                .findAccountById(accountId)
                .populate('User')
                .lean()
                .exec();
        } else {
            account = await this.accountModel.findAccountById(accountId).lean().exec();
        }

        if (!account) throw new HttpException(404, `Account with ID ${accountId} is not found`);

        return account;
    }
}
