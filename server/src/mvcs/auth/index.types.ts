import { Schema } from 'mongoose';

type SharedTypes = {
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

export interface SignupRequestI extends SharedTypes {}

export interface SignupResponseI extends SharedTypes {
    userRef: Schema.Types.ObjectId;
    bankName: string;
    bankBranch: string;
    iban: string;
    bic: string;
}
