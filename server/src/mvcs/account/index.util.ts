import { Request } from 'express';

import { AccountModel } from './index.model';
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

    async getAccount(
        accountId: string,
        req: Request<
            AccountIdParam,
            AccountResponseI,
            Partial<AccountRequestI> | never,
            AccountQueryParams
        >
    ) {
        const populateAccount = req.query.include?.includes?.('userRef');
        let account;
        if (populateAccount) {
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
