import React, { useMemo } from 'react';

import { createContext } from '@afb/utils';

type WizardContextType<Data = Record<string, unknown>> = {
    data: Data;
    setData: React.Dispatch<React.SetStateAction<Data>>;
};

const [WizardProvider, useWizard] = createContext<WizardContextType>('WizardContext');

type UseWizardContextValuesArgType<D> = WizardContextType<D>;

function useWizardContextValues<Data = Record<string, unknown>>(arg: UseWizardContextValuesArgType<Data>) {
    return useMemo(
        () => ({
            ...arg,
        }),
        [arg]
    );
}

export { WizardProvider, useWizard, useWizardContextValues };
