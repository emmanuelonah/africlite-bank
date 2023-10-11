import { Document, Schema } from 'mongoose';

/**
 * @SharedUserType type represents a shared user with various personal information fields.
 * @property accountRef - The `accountRef` property is of type `Schema.Types.ObjectId` and is used to
 * reference the account associated with the shared user.
 * @property {string} lastName - The last name of the shared user.
 * @property {string} firstName - The first name of the shared user.
 * @property {string} dob - Date of birth of the shared user.
 * @property {string} email - The email property is a string that represents the email address of the
 * shared user.
 * @property {string} password - The `password` property is used to store the password for the user's
 * account. It is typically encrypted or hashed for security purposes.
 * @property {string} phone - The `phone` property is a string that represents the phone number of the
 * shared user.
 * @property {string} address - The address property represents the physical address of the shared
 * user.
 * @property {string} taxId - The `taxId` property is used to store the tax identification number of
 * the shared user.
 * @property {string} personalIdType - The property "personalIdType" is a string that represents the
 * type of personal identification document for the shared user. It could be a driver's license,
 * passport, national ID card, etc.
 * @property {string} personalIdNo - The `personalIdNo` property in the `SharedUserType` represents the
 * personal identification number of the user. It is a string value that uniquely identifies the user.
 */
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
 * @UserSchemaI interface extends SharedUserType, Document` is defining
 * an interface called `UserSchemaI` that extends the `SharedUserType`
 * interface and the `Document` interface from the `mongoose` library.
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

export type UserRequestI = SharedUserType;

/**
 * @UserIdParam type represents a parameter object with a single property
 * called "userId" of type string.
 * @property {string} userId - A string representing the user ID.
 */
export type UserIdParam = { userId: string };
