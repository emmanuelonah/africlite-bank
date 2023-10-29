import { Request, Response, NextFunction } from 'express';

import { AccountUtil } from './index.util';
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
    private accountUtil = new AccountUtil(this.accountModel);

    createAccount = async (
        req: Request<never, AccountResponseI, AccountRequestI>,
        res: Response<AccountResponseI>,
        next: NextFunction
    ) => {
        try {
            await initDto(CreateAuthorDto, req.body);

            const account = await this.accountModel.findAccountByIban(req.body.iban);

            if (account) throw new HttpException(409, 'Account already exist');

            const createdAccount = await this.accountModel.createAccount(req.body);

            return res
                .status(200)
                .json(response(Object.assign(createdAccount, { id: createdAccount.id })));
        } catch (error) {
            return next(new HttpException(error.statusCode, error.message));
        }
    };

    getAccounts = async (
        req: Request<never, AccountResponseI[], never, AccountQueryParams>,
        res: Response<AccountResponseI[]>,
        next: NextFunction
    ) => {
        const accounts = await this.accountUtil.getAccounts(req, res, next);
        return res.status(200).json(response(accounts) as unknown as AccountResponseI[]);
    };

    getAccount = async (
        req: Request<AccountIdParam, AccountResponseI, never, AccountQueryParams>,
        res: Response<AccountResponseI>,
        next: NextFunction
    ) => {
        try {
            const { accountId } = req.params;

            this.accountUtil.handleMissingAccountIdParam(accountId);

            const account = await this.accountUtil.getAccount(accountId, req);

            return res.status(200).json(response(account) as AccountResponseI);
        } catch (error) {
            return next(new HttpException(error.statusCode, error.message));
        }
    };

    updateAccount = async (
        req: Request<AccountIdParam, AccountResponseI, AccountRequestI, AccountQueryParams>,
        res: Response<AccountResponseI>,
        next: NextFunction
    ) => {
        try {
            await initDto(UpdateAccountDto, req.body);

            const { accountId } = req.params;

            this.accountUtil.handleMissingAccountIdParam(accountId);

            const account = await this.accountUtil.getAccount(accountId, req);

            await this.accountModel.updateAccountById(accountId, req.body);

            return res.status(200).json(response(account) as AccountResponseI);
        } catch (error) {
            return next(new HttpException(error.statusCode, error.message));
        }
    };

    patchAccount = async (
        req: Request<
            AccountIdParam,
            AccountResponseI,
            Partial<AccountRequestI>,
            AccountQueryParams
        >,
        res: Response<AccountResponseI>,
        next: NextFunction
    ) => {
        try {
            await initDto(PatchAccountDto, req.body);

            const { accountId } = req.params;

            this.accountUtil.handleMissingAccountIdParam(accountId);

            const account = await this.accountUtil.getAccount(accountId, req);

            await this.accountModel.patchAccountById(accountId, req.body);

            return res.status(200).json(response(account) as AccountResponseI);
        } catch (error) {
            return next(new HttpException(error.statusCode, error.message));
        }
    };

    deleteAccount = async (
        req: Request<AccountIdParam, AccountResponseI, never, AccountQueryParams>,
        res: Response<AccountResponseI>,
        next: NextFunction
    ) => {
        try {
            const { accountId } = req.params;

            this.accountUtil.handleMissingAccountIdParam(accountId);

            const account = await this.accountUtil.getAccount(accountId, req);

            await this.accountModel.deleteAccountById(accountId);

            return res.status(200).json(response(account) as AccountResponseI);
        } catch (error) {
            return next(new HttpException(error.statusCode, error.message));
        }
    };
}
