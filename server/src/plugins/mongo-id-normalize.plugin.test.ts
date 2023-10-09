import { Schema, type Document } from 'mongoose';

import { _idToId } from './mongo-id-normalize.plugin';

describe.skip('_idToId', () => {
    it('should remove _id and add id virtual field to the schema', () => {
        const schema = new Schema({});

        _idToId(schema);

        expect(typeof (schema as any).options.toJSON.transform).toBe('function');
        expect(schema.virtualpath('id')).toBeDefined();

        const doc: Document = { _id: 'mockObjectId', toJSON: () => ({ _id: 'mockObjectId' }) } as any;
        const transformedDoc = (schema as any).options.toJSON.transform.call(doc, doc, doc.toJSON());

        expect(transformedDoc._id).toBeUndefined();
        expect(transformedDoc.id).toBe('mockObjectId');
    });
});
