import { Action, ACTION_BEHAVE_AS, ACTION_APPEAR_AS } from './action.helper';

describe('Action', () => {
    describe('ACTION_APPEAR_AS', () => {
        it('should match `ACTION_APPEAR_AS`', () => {
            expect(ACTION_APPEAR_AS).toMatchObject({
                BACK: 'back',
                NEXT: 'next',
                SKIP: 'skip',
                ASYNC_NEXT: 'asyncNext',
                SUBMIT: 'submit',
            });
        });
    });

    describe('ACTION_BEHAVE_AS', () => {
        it('should match `ACTION_BEHAVE_AS`', () => {
            expect(ACTION_BEHAVE_AS).toMatchObject({
                BACK: 'back',
                NEXT: 'next',
                SKIP: 'skip',
                ASYNC_NEXT: 'asyncNext',
                SUBMIT: 'submit',
            });
        });
    });
    describe('validateDestinations', () => {
        it('should not throw an error when destinations are valid', () => {
            const rawDestinations = ['destination1', 'destination2'];
            const processedDestinations = ['destination1', 'destination2'];

            expect(() => Action.validateDestinations(rawDestinations, processedDestinations)).not.toThrow();
        });

        it('should throw a WizardDestinationError when destinations are invalid', () => {
            const rawDestinations = ['destination1', 'destination2', 'destination3'];
            const processedDestinations = ['destination1', 'destination2'];

            expect(() =>
                Action.validateDestinations(rawDestinations, processedDestinations)
            ).toThrowErrorMatchingSnapshot();
        });
    });
});
