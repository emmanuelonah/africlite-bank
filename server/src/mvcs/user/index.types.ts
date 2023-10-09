import { Document, Schema } from 'mongoose';

/**
 * Type for Schema
 */
export interface UserSchemaI extends Document {
    id: string;
    account: Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
}

/**
 * Type for Client
 */
export type UserRequestI = {
    account: Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
};

/**
 * Type for UserDTO constructor arg
 */
export interface UserDTOConstructorArg extends UserRequestI {
    id: string;
}

/**
 * Type for express request Parameter
 */
export type UserIdParam = { userId: string };
