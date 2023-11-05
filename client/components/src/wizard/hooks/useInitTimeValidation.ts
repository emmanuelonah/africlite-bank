import { useEffect, useCallback } from 'react';

import { throwError } from '@afb/utils';

import { Action } from '../helpers/action.helper';

type UseValidationArgType = {
    hasSteps: boolean;
    rawDestinations: Array<string>;
    processedDestinations: Array<string>;
};

/**
 * @useInitTimeValidation performs validation on destinations and steps.
 * @param {UseValidationArgType} arg - The `arg` parameter is an object
 * that contains the following properties:
 *  @hasSteps boolean;
 *  @rawDestinations Array<string>;
 *  @processedDestinations Array<string>;
 */
export function useInitTimeValidation(arg: UseValidationArgType) {
    const onValidate = useCallback(() => {
        const { rawDestinations, processedDestinations, hasSteps } = arg;

        if (!hasSteps) {
            throwError({
                name: 'WizardStepsError',
                message: `[EMPTY_STEPS]: steps can't be an empty}`,
                callee: onValidate,
            });
        }

        if (rawDestinations.length && processedDestinations.length) {
            Action.validateDestinations(rawDestinations, processedDestinations);
        }
    }, [arg]);

    useEffect(() => onValidate(), [onValidate]);
}
