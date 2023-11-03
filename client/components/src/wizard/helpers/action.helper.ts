import { throwError } from '@afb/utils';

const ACTION_APPEAR_AS = Object.freeze({
    BACK: 'back',
    NEXT: 'next',
    SKIP: 'skip',
    ASYNC_NEXT: 'asyncNext',
    SUBMIT: 'submit',
});

const ACTION_BEHAVE_AS = Object.freeze({
    BACK: 'back',
    NEXT: 'next',
    SKIP: 'skip',
    ASYNC_NEXT: 'asyncNext',
    SUBMIT: 'submit',
});

class Action {
    public static validateDestinations(rawDestinations: Array<string>, processedDestinations: Array<string>) {
        const invalidDestinations: Array<string> = [];

        const isRawDestinationsValid = rawDestinations.every((destination) => {
            const isValid = processedDestinations.includes(destination);

            if (isValid) invalidDestinations.push(destination);

            return isValid;
        });

        if (!isRawDestinationsValid) {
            throwError({
                name: 'WizardDestinationError',
                message: `[INVALID_DESTINATIONS]: ${invalidDestinations.join(' ')}`,
                callee: Action.validateDestinations,
            });
        }
    }
}

export { ACTION_APPEAR_AS, ACTION_BEHAVE_AS, Action };
