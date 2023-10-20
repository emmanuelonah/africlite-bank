import { throwError } from './index.util';

const ERROR_CONSTRUCT = {
    name: 'ConstructorInstantiationError',
    message: 'You can not invoke a constructor with the new keyword',
    option: { scope: 'Jest' },
};

describe('throwError', () => {
    it('should confirm that throwError actually throws an error', () => {
        function errorContext() {
            throwError({
                name: ERROR_CONSTRUCT.name,
                message: ERROR_CONSTRUCT.message,
                callee: errorContext,
                option: ERROR_CONSTRUCT.option,
            });
        }

        expect(errorContext).toThrowError(ERROR_CONSTRUCT);
    });
});
