import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

export type Resources = {
    [langCode: string]: {
        translation: JSON;
    };
};

export function initializeI18n(resources: Resources, lng: string) {
    i18n.use(initReactI18next).init({
        resources,
        lng,
        interpolation: {
            escapeValue: false,
        },
    });
}
