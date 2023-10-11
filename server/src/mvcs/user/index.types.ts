import { Document, Schema } from 'mongoose';

type SharedUserType = {
    accountRef: Schema.Types.ObjectId;
    lastName: string;
    firstName: string;
    dob: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    taxId: string;
    personalIdType: string;
    personalIdNo: string;
};

/**
 * Type for Schema
 */
export interface UserSchemaI extends SharedUserType, Document {
    id: string;
    accountRef: Schema.Types.ObjectId;
    lastName: string;
    firstName: string;
    dob: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    taxId: string;
    personalIdType: string;
    personalIdNo: string;
}

/**
 * Type for Client
 */
export type UserRequestI = SharedUserType;

/**
 * Type for express request Parameter
 */
export type UserIdParam = { userId: string };
