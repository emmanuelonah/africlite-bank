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
export interface UserRequestI {
    account: Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
}
