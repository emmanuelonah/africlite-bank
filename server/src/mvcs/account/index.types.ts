import { Document, Schema } from 'mongoose';

import { ClientResponse } from '../../services/response/index.service';

/**
 * @SharedAccountType type represents a shared bank account with user reference, bank details, and
 * branch information.
 * @property userRef - The userRef property is a reference to the user associated with the shared
 * account. It is of type Schema.Types.ObjectId, which is typically used to represent a unique
 * identifier for an object in a MongoDB database.
 * @property {string} bankName - The bank name associated with the shared account.
 * @property {string} iban - The IBAN (International Bank Account Number) is a standardized
 * international numbering system used to identify bank accounts. It consists of a country code, check
 * digits, and the basic bank account number.
 * @property {string} bic - The BIC (Bank Identifier Code) is a unique identification code for a
 * particular bank. It is used in international money transfers to identify the recipient's bank.
 * @property {string} branch - The "branch" property refers to the branch or location of the bank where
 * the shared account is held.
 */
type SharedAccountType = {
    userRef: Schema.Types.ObjectId;
    bankName: string;
    iban: string;
    bic: string;
    branch: string;
};

export interface AccountSchemaI extends SharedAccountType, Document {}

export type AccountRequestI = SharedAccountType;

type D = SharedAccountType & { id: string };
export interface AccountResponseI extends ClientResponse<D> {}

/**
 * @AccountIdParam type represents a parameter object with an accountId property of type string.
 * @property {string} accountId - A string representing the account ID.
 */
export type AccountIdParam = { accountId: string };

export type AccountQueryParams = {
    /**
     * @include to be added to client query parameters
     * @sample ```ts
     *  /users?include=["userRef"]
     * ```
     */
    include?: string; // e.g ?'include=["userRef"]'
};
