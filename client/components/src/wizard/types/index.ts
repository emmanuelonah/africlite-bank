import React from 'react';

import { ACTION_APPEAR_AS, ACTION_BEHAVE_AS } from '..';

type ValueOf<T> = T[keyof T];
type KeyOf<T> = keyof T;
/*********************************************************/

// Wizard Step type
type AppearAsType = ValueOf<typeof ACTION_APPEAR_AS>;
type BehaveAsType = ValueOf<typeof ACTION_BEHAVE_AS>;
type DestinationType = string;
type ActionType<Data> = {
    appearAs: AppearAsType;
    behaveAs: BehaveAsType;
    destination?: DestinationType;
    onClick?(_data: Data): Promise<unknown> | unknown;
};
type ValidationType<Data> = {
    isRequired?: ((_target: string, _data: Data) => boolean) | boolean;
};

type StepChildrenType<Data> = Array<{
    id: string | number;
    belongsTo: string;
    titleId?: string;
    subTitleId?: string;
    validation?: ValidationType<Data>;
    component: React.ComponentType;
    actions?: Array<ActionType<Data>>;
}>;
type StepType<Data> = {
    children: StepChildrenType<Data>;
};

type StepsType<Data> = {
    [stepName: string]: StepType<Data>;
};

type CurrentStepType<Data> = {
    belongsTo: string;
    titleId?: string;
    subTitleId?: string;
    validation?: ValidationType<Data>;
    component: React.ComponentType;
    actions?: Array<ActionType<Data>>;
    url: string;
};
type ProcessedStepsType<Data> = Array<CurrentStepType<Data>>;
/*********************************************************/

// Wizard Component Types
type DefaultDataType = Record<string, unknown>;
type PrimitiveDivPropTypes = React.ComponentPropsWithoutRef<'div'>;
type WizardElementType = React.ElementRef<'div'>;
interface WizardPropTypes<Data> extends Omit<PrimitiveDivPropTypes, 'onSubmit'> {
    baseUrl: string;
    titleId?: string;
    cancelReturnTo?: string;
    initialData?: Data;
    steps: StepsType<Data>;
    abortSignal?: AbortController;
    onClose?(_data: Data): void;
    onSubmit?(_data: Data): Promise<unknown> | unknown;
}
/*********************************************************/

// LowLevelWizardContextType
type LowLevelWizardContextType<Data> = {
    globalTitle: string | undefined;
    isOpen: boolean;
    isDataValid: boolean;
    isLoading: boolean;
    hasSkip: boolean;
    hasBack: boolean;
    hasNext: boolean;
    hasAsyncNext: boolean;
    isSubmitPage: boolean;
    error: string | null;
    data: Data;
    actions: Record<AppearAsType, { text: string; onClick(): void }>;
    setData: React.Dispatch<React.SetStateAction<Data>>;
    onClose(): void;
    rawStep: StepsType<Data>;
    currentStep: CurrentStepType<Data>;
};
/*********************************************************/

export {
    WizardElementType,
    WizardPropTypes,
    StepsType,
    ActionType,
    ValidationType,
    AppearAsType,
    BehaveAsType,
    DestinationType,
    ProcessedStepsType,
    StepChildrenType,
    CurrentStepType,
    LowLevelWizardContextType,
    DefaultDataType,
    StepType,
    ValueOf,
    KeyOf,
};
