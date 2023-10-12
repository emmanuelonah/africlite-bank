import mongoose from 'mongoose';

import { UserSchemaI } from './index.types';
import { _idToId } from '../../plugins/mongo-id-normalize.plugin';

const userSchema = new mongoose.Schema<UserSchemaI>(
    {
        accountRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: false,
        },
        lastName: {
            type: String,
            required: [true, 'Missing last name'],
        },
        firstName: {
            type: String,
            required: [true, 'Missing first name'],
        },
        dob: {
            type: String,
            required: [true, 'Missing date of birth'],
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Missing email'],
            validate: {
                validator(value: string) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
                },
                message(props) {
                    return `${props.value} is not a valid email!`;
                },
            },
        },
        password: {
            type: String,
            required: [true, 'Missing password'],
            minlength: [8, 'Password must be at least 8 characters long'],
            validate: {
                validator(value: string) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
                },
                message: 'Password should have at least one number, one lowercase and one uppercase letter',
            },
        },
        phone: {
            type: String,
            unique: true,
            required: [true, 'Missing phone number'],
        },
        address: {
            type: String,
            required: [true, 'Missing address'],
            match: [/^\d{10}$/, 'Please fill a valid phone number'],
        },
        taxId: {
            type: String,
            unique: true,
            required: [true, 'Missing tax id'],
        },
        personalIdType: {
            type: String,
            required: [true, 'Missing personal id type e.g: "passport, residence permit, driver\'s license"'],
        },
        personalIdNo: {
            type: String,
            unique: true,
            required: [true, 'Missing personal id no'],
        },
    },
    {
        collection: 'Users',
        timestamps: true,
        versionKey: false,
    }
);

userSchema.plugin(_idToId);

export const User = mongoose.model('User', userSchema);
