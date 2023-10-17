import { Request, Response, NextFunction } from 'express';

import { AccountModel } from './index.model';
import { initDto } from '../../utils/init-dto.util';
import { response } from '../../services/response/index.service';
import { CreateAuthorDto, UpdateAccountDto, PatchAccountDto } from './dto';
import { HttpException } from '../../services/http-exception/index.service';
import {
    AccountRequestI,
    AccountResponseI,
    AccountQueryParams,
    AccountIdParam,
} from './index.types';

export class AccountServices {
    private accountModel = new AccountModel();

    public createAccount = async (
        req: Request<never, AccountResponseI, AccountRequestI>,
        res: Response<AccountResponseI>,
        next: NextFunction
    ) => {
        const { hasErrors, error } = await initDto(CreateAuthorDto, req.body);
        if (hasErrors) return next(new HttpException(400, error));

        const account = await this.accountModel.findAccountByIban(req.body.iban);
        if (account) return next(new HttpException(409, 'Account already exist'));

        const createdAccount = await this.accountModel.createAccount(req.body);
        return res
            .status(200)
            .json(response(Object.assign(createdAccount, { id: createdAccount.id })));
    };

    public getAccounts = async (
        req: Request<never, AccountResponseI[], never, AccountQueryParams>,
        res: Response<AccountResponseI[]>,
        _next: NextFunction
    ) => {
        let accounts;

        if (req.query.include?.includes?.('userRef')) {
            accounts = await this.accountModel.findAccounts().populate('User').lean().exec();
        } else {
            accounts = await this.accountModel.findAccounts().lean().exec();
        }
        return res.status(200).json(response(accounts) as unknown as AccountResponseI[]);
    };

    public getAccount = async (
        req: Request<AccountIdParam, AccountResponseI, never, AccountQueryParams>,
        res: Response<AccountResponseI>,
        next: NextFunction
    ) => {
        const { accountId } = req.params;
        if (!accountId) return next(new HttpException(400, 'Missing user ID'));

        let account;

        if (req.query.include?.includes?.('userRef')) {
            account = await this.accountModel
                .findAccountById(accountId)
                .populate('User')
                .lean()
                .exec();
        } else {
            account = await this.accountModel.findAccountById(accountId).lean().exec();
        }

        if (!account) {
            return next(new HttpException(404, `Account with ID ${accountId} is not found`));
        }
        return res.status(200).json(response(account) as AccountResponseI);
    };

    public updateAccount = async (
        req: Request<AccountIdParam, AccountResponseI, AccountRequestI, AccountQueryParams>,
        res: Response<AccountResponseI>,
        next: NextFunction
    ) => {
        const { hasErrors, error } = await initDto(UpdateAccountDto, req.body);
        if (hasErrors) return next(new HttpException(400, error));

        const { accountId } = req.params;
        if (!accountId) return next(new HttpException(400, 'Missing account ID'));

        let account;

        if (req.query.include?.includes?.('userRef')) {
            account = await this.accountModel
                .findAccountById(accountId)
                .populate('User')
                .lean()
                .exec();
        } else {
            account = await this.accountModel.findAccountById(accountId).lean().exec();
        }

        if (!account) {
            return next(new HttpException(404, `Account with ID ${accountId} is not found`));
        }

        await this.accountModel.updateAccountById(accountId, req.body);
        return res.status(200).json(response(account) as AccountResponseI);
    };

    public patchAccount = async (
        req: Request<
            AccountIdParam,
            AccountResponseI,
            Partial<AccountRequestI>,
            AccountQueryParams
        >,
        res: Response<AccountResponseI>,
        next: NextFunction
    ) => {
        const { hasErrors, error } = await initDto(PatchAccountDto, req.body);
        if (hasErrors) return next(new HttpException(400, error));

        const { accountId } = req.params;
        if (!accountId) return next(new HttpException(400, 'Missing account ID'));

        let account;

        if (req.query.include?.includes?.('userRef')) {
            account = await this.accountModel
                .findAccountById(accountId)
                .populate('User')
                .lean()
                .exec();
        } else {
            account = await this.accountModel.findAccountById(accountId).lean().exec();
        }

        if (!account)
            return next(new HttpException(404, `Account with ID ${accountId} is not found`));

        await this.accountModel.patchAccountById(accountId, req.body);
        return res.status(200).json(response(account) as AccountResponseI);
    };

    public deleteAccount = async (
        req: Request<AccountIdParam, AccountResponseI, never, AccountQueryParams>,
        res: Response<AccountResponseI>,
        next: NextFunction
    ) => {
        const { accountId } = req.params;
        if (!accountId) return next(new HttpException(400, 'Missing account ID'));

        let account;

        if (req.query.include?.includes?.('userRef')) {
            account = await this.accountModel
                .findAccountById(accountId)
                .populate('User')
                .lean()
                .exec();
        } else {
            account = await this.accountModel.findAccountById(accountId).lean().exec();
        }

        if (!account) {
            return next(new HttpException(404, `Account with ID ${accountId} is not found`));
        }

        await this.accountModel.deleteAccountById(accountId);
        return res.status(200).json(response(account) as AccountResponseI);
    };
}
