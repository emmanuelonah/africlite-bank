import { Query } from './index.service';

describe('Query', () => {
    describe('Query.getQuery', () => {
        it('should return pagination-data which is computed from default value', () => {
            expect(Query.getQuery({})).toMatchObject({ skip: 0, limit: 0 });
        });

        it('should return pagination-data which is computed from passed in argument', () => {
            expect(Query.getQuery({ page: '2', limit: '10' })).toMatchObject({ skip: 10, limit: 10 });
        });

        it('should return pagination-data which is computed from passed in argument of decimal values', () => {
            expect(Query.getQuery({ page: '2.50', limit: '10.1929393' })).toMatchObject({ skip: 10, limit: 10 });
        });

        it('should return pagination-data which is computed from passed in argument of negative values', () => {
            expect(Query.getQuery({ page: '-2.50', limit: '-10.1929393' })).toMatchObject({ skip: 0, limit: 0 });
        });
    });

    describe('Query.getPagination', () => {
        const cases = [
            [
                { page: 2, limit: 10, total: 100 },
                {
                    page: 2,
                    pages: 10,
                    limit: 10,
                    skip: 10,
                    total: 100,
                },
            ],
            [
                { page: 2, limit: 10, total: 100 },
                {
                    page: 2,
                    pages: 10,
                    limit: 10,
                    skip: 10,
                    total: 100,
                },
            ],
            [
                { page: -12, limit: 10, total: 89 },
                {
                    page: 1,
                    pages: 8,
                    limit: 10,
                    skip: 0,
                    total: 89,
                },
            ],
        ];
        it.each(cases)('should return pagination data', (arg, expected) => {
            expect(Query.getPagination(arg)).toMatchObject(expected);
        });
    });
});
