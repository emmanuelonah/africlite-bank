import mongoose from 'mongoose';

import { AccountSchemaI } from './index.types';
import { _idToId } from '../../plugins/mongo-id-normalize.plugin';

const accountSchema = new mongoose.Schema<AccountSchemaI>(
    {
        userRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },

        bankName: {
            type: String,
            required: [true, 'Missing bank name'],
        },
        iban: {
            type: String,
            required: [true, 'Missing IBAN, e.g: "DE89370400440532013000"'],
            validate: {
                validator(value: string) {
                    const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
                    return ibanRegex.test(value);
                },
                message: 'Invalid IBAN format',
            },
        },
        bic: {
            type: String,
            required: [true, 'Missing BIC/Swift-code, e.g: "BELADEBEXXX"'],
            validate: {
                validator(value: string) {
                    const bicRegex = /^[A-Za-z]{4}[A-Za-z]{2}\w{2}(\w{3})?$/;
                    return bicRegex.test(value);
                },
                message: 'Invalid BIC format. BIC should be 8 or 11 characters long and contain only letters and digits.',
            },
        },
        branch: {
            type: String,
            required: [true, 'Missing branch name,  e.g: "Postdam 30, 14589 Berlin Germany"'],
        },
    },
    {
        collection: 'Accounts',
        timestamps: true,
        versionKey: false,
    }
);

accountSchema.plugin(_idToId);

export const Account = mongoose.model('Account', accountSchema);
