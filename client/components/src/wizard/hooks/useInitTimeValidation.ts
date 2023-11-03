import { useEffect, useCallback } from 'react';

import { throwError } from '@afb/utils';

import { Action } from '../helpers/action.helper';

type UseValidationArgType = {
    hasSteps: boolean;
    rawDestinations: Array<string>;
    processedDestinations: Array<string>;
};

/**
 * @useValidation we run an init-time validation on the hook variable
 * instances that never changes during a render-lifecycle. So if the
 * validation doesn't pass, then the Wizard infrastructure
 * breaks(everything breaks) because, the success of this init-time
 * validation is paramount to the effective behavior of the Wizard
 *
 * @param arg:UseValidationArgType
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
