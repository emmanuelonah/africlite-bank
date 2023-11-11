import React from 'react';

import { initializeI18n } from '@afb/i18n';

import enTranslations from './i18n/en.json';

import { Body } from './components/body';
import { Header } from './components/header.component';
import { Footer } from './components/footer.component';
import { WizardElementType, WizardPropTypes, DefaultDataType } from './types';
import { WizardProvider, useWizardContextValues } from './hooks/useWizardContextValues';
import { LowLevelWizardProvider, useLowLevelWizardContextValues } from './hooks/useLowLevelWizardContextValues';

initializeI18n({ en: { translation: enTranslations as unknown as JSON } }, 'en');

export const Wizard = React.forwardRef<WizardElementType, WizardPropTypes<DefaultDataType>>(
    function Wizard(props, forwardedRef) {
        const lowLevelWizardValues = useLowLevelWizardContextValues(props);
        const highLevelWizardValues = useWizardContextValues({
            data: lowLevelWizardValues.data,
            setData: lowLevelWizardValues.setData,
        });

        return (
            <div ref={forwardedRef} aria-label={props['aria-label'] ?? 'Wizard'}>
                <LowLevelWizardProvider value={lowLevelWizardValues}>
                    <WizardProvider value={highLevelWizardValues}>
                        {/*@Header holds whole progress view*/}
                        <Header />
                        {/*@Body holds the current component view*/}
                        <Body />
                        {/*@Footer holds the actions e.g `Back`, `Next`, `Submit`*/}
                        <Footer />
                    </WizardProvider>
                </LowLevelWizardProvider>
            </div>
        );
    }
);
