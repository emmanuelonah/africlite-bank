import mongoose from 'mongoose';

import { UserSchemaI } from './index.types';
import { _idToId } from '../../plugins/mongo-id-normalize.plugin/index.plugin';

const userSchema = new mongoose.Schema<UserSchemaI>(
    {
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: [true, 'Missing account ID'],
        },
        name: {
            type: String,
            required: [true, 'Missing name'],
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Missing email'],
            validate: {
                validator: function (v: string) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
                },
                message: function (props) {
                    return `${props.value} is not a valid email!`;
                },
            },
        },
        password: {
            type: String,
            required: [true, 'Missing password'],
            minlength: [8, 'Password must be at least 8 characters long'],
            validate: {
                validator: function (v: string) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v);
                },
                message: function () {
                    return `Password should have at least one number, one lowercase and one uppercase letter`;
                },
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
    },
    {
        collection: 'Users',
        timestamps: true,
    }
);

userSchema.plugin(_idToId);

export const User = mongoose.model('User', userSchema);
