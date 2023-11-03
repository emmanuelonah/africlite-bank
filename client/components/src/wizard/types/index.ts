import React from 'react';

import { ACTION_APPEAR_AS, ACTION_BEHAVE_AS } from '..';

type ValueOf<T> = T[keyof T];
type KeyOf<T> = keyof T;
/*********************************************************/

// Wizard Step type
type AppearAsType = ValueOf<typeof ACTION_APPEAR_AS>;
type BehaveAsType = ValueOf<typeof ACTION_BEHAVE_AS>;
type DestinationType = string;
type ActionType<Data = Record<string, unknown>> = {
    appearAs: AppearAsType;
    behaveAs: BehaveAsType;
    destination?: DestinationType;
    onClick?(_data: Data): Promise<unknown> | unknown;
};
type ValidationType<Data = Record<string, unknown>> = {
    isRequired?: ((_target: string, _data: Data) => boolean) | boolean;
};

type StepChildrenType<Data = Record<string, unknown>> = Array<{
    id: string | number;
    belongsTo: string;
    titleId?: string;
    subTitleId?: string;
    validation?: ValidationType<Data>;
    component: React.ComponentType;
    actions?: Array<ActionType>;
}>;
type StepType<Data = Record<string, unknown>> = {
    children: StepChildrenType<Data>;
};

type StepsType<Data = Record<string, unknown>> = {
    [stepName: string]: StepType<Data>;
};

type ProcessedStepsType<Data = Record<string, unknown>> = Array<{
    belongsTo: string;
    titleId?: string;
    subTitleId?: string;
    validation?: ValidationType<Data>;
    component: React.ComponentType;
    actions?: Array<ActionType>;
    url: string;
}>;
/*********************************************************/

// Wizard Component Types
type PrimitiveDivPropTypes = React.ComponentPropsWithoutRef<'div'>;
type WizardElementType = React.ElementRef<'div'>;
interface WizardPropTypes<Data = Record<string, unknown>> extends Omit<PrimitiveDivPropTypes, 'onSubmit'> {
    baseUrl: string;
    titleId?: string;
    cancelReturnTo?: string;
    initialData?: Data;
    steps: StepsType;
    abortSignal?: AbortController;
    onClose?(_data: Data): void;
    onSubmit?(_data: Data): Promise<unknown> | unknown;
}
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
    StepType,
    ValueOf,
    KeyOf,
};
