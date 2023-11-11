import React from 'react';

import { If } from './index.component';

export default {
    title: 'Components/If',
    component: If,
};

export const DoNode = () => (
    <If condition={true} do={() => "Render me the 'Do Node 🤗'"} else={() => "Don't render me 😥"} />
);

export const ElseNode = () => (
    <If condition={false} do={() => "Don't the 'Do Node 😥"} else={() => "Render render me the 'Else Node🤗'"} />
);
