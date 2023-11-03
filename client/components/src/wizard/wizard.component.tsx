import React from 'react';

import { initializeI18n } from '@afb/i18n';

import enTranslations from './i18n/en.json';

import { Body } from './components/body';
import { Header } from './components/header.component';
import { Footer } from './components/footer.component';
import { WizardElementType, WizardPropTypes } from './types';
import { WizardProvider, useWizardContextValues } from './hooks/useWizardContextValues';

initializeI18n({ en: { translation: enTranslations as unknown as JSON } }, 'en');

export const Wizard = React.forwardRef<WizardElementType, WizardPropTypes>(function Wizard(props, forwardedRef) {
    const values = useWizardContextValues(props);

    return (
        <div ref={forwardedRef} aria-label={props['aria-label'] ?? 'Wizard'}>
            <WizardProvider value={values}>
                {/*@Header holds whole progress view*/}
                <Header />
                {/*@Body holds the current component view*/}
                <Body />
                {/*@Footer holds the actions e.g `Back`, `Next`, `Submit`*/}
                <Footer />
            </WizardProvider>
        </div>
    );
});
