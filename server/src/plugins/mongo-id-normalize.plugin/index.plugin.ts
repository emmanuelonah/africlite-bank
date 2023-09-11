import { Schema } from 'mongoose';

export function _idToId<SchemaT>(schema: Schema<SchemaT>) {
    schema.virtual('id').get(function () {
        return (this as any)._id.toHexString();
    });
    schema.set('toJSON', { virtuals: true });
}
