import { useNavigate } from 'react-router-dom';
import { useMemo, useCallback, useState } from 'react';

import { createContext, useBoolean } from '@afb/utils';

import { useAccessibleUrl } from './useAccessibleUrl';
import { useInitTimeValidation } from './useInitTimeValidation';
import { WizardPropTypes, ProcessedStepsType, StepChildrenType, ActionType, StepType } from '../types';

type WizardContextType = object;

type UseWizardContextValuesArgType = WizardPropTypes;

const [WizardProvider, useWizard] = createContext<WizardContextType>('WizardContext');

const MIN_STEP_INDEX = 0;

function useWizardContextValues<Data = Record<string, unknown>>(args: UseWizardContextValuesArgType) {
    const { baseUrl, titleId, cancelReturnTo, initialData, steps = {}, abortSignal, onClose, onSubmit } = args;

    const navigate = useNavigate();

    ///
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

    const [data, setData] = useState<Data>(initialData as Data);
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(MIN_STEP_INDEX);
    const [isOpen, { toggle }] = useBoolean(true);

    const currentStep = useMemo(() => processedSteps[currentStepIndex], [currentStepIndex, processedSteps]);

    const url = baseUrl.concat(currentStep.url);

    useAccessibleUrl(url);

    const isDataValid = true;

    const stepsIndexSize = processedSteps.length - 1;

    const disableCurrentStepNext = useMemo(() => !isDataValid, [isDataValid]);

    const hasBack = useMemo(() => currentStepIndex > MIN_STEP_INDEX, [currentStepIndex]);

    const hasNext = useMemo(() => currentStepIndex !== stepsIndexSize, [currentStepIndex, stepsIndexSize]);

    const isSubmitPage = useMemo(
        () => !!onSubmit && currentStepIndex === stepsIndexSize,
        [currentStepIndex, onSubmit, stepsIndexSize]
    );

    const onBack = useCallback(() => {
        if (hasBack) setCurrentStepIndex((prev) => --prev);
    }, [hasBack]);

    const onNext = useCallback(() => {
        if (hasNext) setCurrentStepIndex((prev) => ++prev);
    }, [hasNext]);

    const onCloseHandler = useCallback(() => {
        toggle();
        onClose?.(data!);
        if (cancelReturnTo) navigate(cancelReturnTo);
        if (abortSignal) abortSignal.abort();
    }, [abortSignal, cancelReturnTo, data, navigate, onClose, toggle]);

    const onSubmitHandler = useCallback(() => {}, []);

    return useMemo(
        () => ({
            titleId,
            currentStep,
            isOpen,
            disableCurrentStepNext,
            hasBack,
            hasNext,
            isSubmitPage,
            onBack,
            onNext,
            data,
            setData,
            onClose: onCloseHandler,
            onSubmit: onSubmitHandler,
            rawStep: steps,
        }),
        [currentStep, data, disableCurrentStepNext, hasBack, hasNext, isOpen, isSubmitPage, onBack, onCloseHandler, onNext, onSubmitHandler, steps, titleId]
    );
}

export { WizardProvider, useWizard, useWizardContextValues };
