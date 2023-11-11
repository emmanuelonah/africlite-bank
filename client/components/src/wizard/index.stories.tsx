import React from 'react';

import { Wizard } from '.';
import { StepsType, DefaultDataType } from './types/index';

export default {
    title: 'Components/Wizard',
    component: Wizard,
};

const steps = {
    contact: {
        children: [
            {
                id: 1,
                belongsTo: 'contact',
                titleId: 'Contact.Email.title',
                subTitleId: 'Contact.Email.subTitle',
                component: () => <p>Contact Form</p>,
                actions: [
                    { appearAs: 'next', behaveAs: 'asyncNext' },
                    { appearAs: 'skip', behaveAs: 'skip', destination: '/referral/1' },
                ],
                validation: { name: { isRequired: (_target: string, _data: Record<'name', string>) => true } },
            },
        ],
    },
    referral: {
        children: [
            {
                id: 1,
                titleId: 'Referral.Email.title',
                subTitleId: 'Referral.Email.subTitle',
                belongsTo: 'referral',
                component: () => <p>Referral Form</p>,
                actions: [
                    { appearAs: 'next', behaveAs: 'next' },
                    { appearAs: 'skip', behaveAs: 'skip' },
                ],
                validation: { name: { isRequired: (_target: string, _data: Record<'name', string>) => true } },
            },
        ],
    },
};

export const WithTitle = () => {
    return (
        <Wizard
            baseUrl="/signup"
            titleId="Signup.title"
            cancelReturnTo="/signup"
            initialData={{ name: 'Emmanuel Onah' }}
            steps={steps as StepsType<DefaultDataType>}
            onClose={console.log}
            onSubmit={console.log}
        />
    );
};
