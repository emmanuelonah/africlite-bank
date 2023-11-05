import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo, useCallback, useState } from 'react';

import { createContext, useBoolean } from '@afb/utils';

import { useInitTimeValidation } from './useInitTimeValidation';
import { ACTION_BEHAVE_AS, ACTION_APPEAR_AS } from '../helpers/action.helper';
import { WizardPropTypes, ProcessedStepsType, StepChildrenType, ActionType, BehaveAsType, StepType } from '../types';

type LowLevelWizardContextType = object;

type UseLowLevelWizardContextValuesArgType = WizardPropTypes;

const [LowLevelWizardProvider, useLowLevelWizard] = createContext<LowLevelWizardContextType>('LowLevelWizardContext');

const MIN_STEP_INDEX = 0;

function useLowLevelWizardContextValues<Data = Record<string, unknown>>(arg: UseLowLevelWizardContextValuesArgType) {
    const { baseUrl, titleId, cancelReturnTo, initialData, steps = {}, abortSignal, onClose, onSubmit } = arg;

    const [data, setData] = useState<Data>(initialData as Data);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(MIN_STEP_INDEX);
    const [isOpen, { toggle }] = useBoolean(true);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { processedSteps, rawDestinations, processedDestinations, hasSteps } = useMemo(() => {
        const stepsCollection = Object.values(steps);
        const hasSteps = !!stepsCollection.length;
        const stepsChildren = [] as Array<StepChildrenType>;
        const actions = [] as Array<Array<ActionType>>;
        const processedDestinations = [] as Array<string>;

        const addActions = (step: StepType) => {
            step.children.forEach((child) => {
                if (child.actions) actions.push(child.actions);
            });
        };

        stepsCollection.forEach((step) => {
            addActions(step);
            stepsChildren.push(step.children);
        });

        const rawDestinations = actions.flat().reduce((acc: Array<string>, curr) => {
            if (curr.destination) acc.push(curr.destination);
            return acc;
        }, []);

        const processedSteps = stepsChildren.flat().reduce((acc: ProcessedStepsType, curr) => {
            const { belongsTo } = curr;
            const index = steps[belongsTo].children.findIndex((child) => child.id === curr.id);
            const _url = `/${curr.belongsTo}/${index}`;
            acc.push({ ...curr, url: _url });
            processedDestinations.push(_url);
            return acc;
        }, []);

        return { hasSteps, processedSteps, rawDestinations, processedDestinations };
    }, [steps]);

    useInitTimeValidation({ hasSteps, rawDestinations, processedDestinations });

    const currentStep = useMemo(() => processedSteps[currentStepIndex], [currentStepIndex, processedSteps]);

    const globalTitle = titleId ? t(titleId) : undefined;

    const url = baseUrl.concat(currentStep.url);

    const isDataValid = true;

    const stepsIndexSize = processedSteps.length - 1;

    const hasBack = useMemo(() => currentStepIndex > MIN_STEP_INDEX, [currentStepIndex]);

    const hasNext = useMemo(() => currentStepIndex !== stepsIndexSize, [currentStepIndex, stepsIndexSize]);

    const isSubmitPage = useMemo(
        () => !!onSubmit && currentStepIndex === stepsIndexSize,
        [currentStepIndex, onSubmit, stepsIndexSize]
    );

    const onBack = useCallback(() => {
        if (hasBack) {
            setCurrentStepIndex((prev) => --prev);
            navigate(url);
        }
    }, [hasBack, navigate, url]);

    const onNext = useCallback(() => {
        if (hasNext) {
            setCurrentStepIndex((prev) => ++prev);
            navigate(url);
        }
    }, [hasNext, navigate, url]);

    const findAction = useCallback(
        (behaveAs: BehaveAsType) => {
            const action = currentStep.actions?.find((ac) => ac.behaveAs === behaveAs);
            return action;
        },
        [currentStep.actions]
    );

    const asyncNextAction = findAction(ACTION_BEHAVE_AS.ASYNC_NEXT);

    const hasAsyncNext = useMemo(() => asyncNextAction != undefined, [asyncNextAction]);

    const onAsyncNext = useCallback(async () => {
        setIsLoading(true);
        try {
            await asyncNextAction?.onClick?.(data as Record<string, unknown>);
            setError(null);
            navigate(url);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [asyncNextAction, data, navigate, url]);

    const hasSkip = useMemo(() => {
        const skipAction = findAction(ACTION_BEHAVE_AS.SKIP);
        return skipAction != undefined;
    }, [findAction]);

    const onSkip = useCallback(() => {
        if (hasSkip) {
            setCurrentStepIndex((prev) => ++prev);
            navigate(url);
        }
    }, [hasSkip, navigate, url]);

    const onCloseHandler = useCallback(() => {
        toggle();
        onClose?.(data!);
        if (cancelReturnTo) navigate(cancelReturnTo);
        if (abortSignal) abortSignal.abort();
    }, [abortSignal, cancelReturnTo, data, navigate, onClose, toggle]);

    const onSubmitHandler = useCallback(async () => {
        setIsLoading(true);
        try {
            await onSubmit?.(data as Record<string, unknown>);
            setError(null);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [data, onSubmit]);

    const actions = useMemo(
        () => ({
            [ACTION_BEHAVE_AS.BACK]: {
                text: t('Wizard.'.concat(ACTION_APPEAR_AS.BACK)),
                onClick: onBack,
            },
            [ACTION_BEHAVE_AS.NEXT]: {
                text: t('Wizard.'.concat(ACTION_APPEAR_AS.NEXT)),
                onClick: onNext,
            },
            [ACTION_BEHAVE_AS.SKIP]: {
                text: t('Wizard.'.concat(ACTION_APPEAR_AS.SKIP)),
                onClick: onSkip,
            },
            [ACTION_BEHAVE_AS.ASYNC_NEXT]: {
                text: t('Wizard.'.concat(ACTION_APPEAR_AS.ASYNC_NEXT)),
                onClick: onAsyncNext,
            },
            [ACTION_BEHAVE_AS.SUBMIT]: {
                text: t('Wizard.'.concat(ACTION_APPEAR_AS.SUBMIT)),
                onClick: onSubmitHandler,
            },
        }),
        [onAsyncNext, onBack, onNext, onSkip, onSubmitHandler, t]
    );

    return useMemo(
        () => ({
            globalTitle,
            currentStep,
            isOpen,
            isDataValid,
            isLoading,
            hasSkip,
            hasBack,
            hasNext,
            hasAsyncNext,
            isSubmitPage,
            error,
            data,
            actions,
            setData,
            onClose: onCloseHandler,
            rawStep: steps,
        }),
        [
            actions,
            currentStep,
            data,
            error,
            globalTitle,
            hasAsyncNext,
            hasBack,
            hasNext,
            hasSkip,
            isDataValid,
            isLoading,
            isOpen,
            isSubmitPage,
            onCloseHandler,
            steps,
        ]
    );
}

export { LowLevelWizardProvider, useLowLevelWizard, useLowLevelWizardContextValues };
