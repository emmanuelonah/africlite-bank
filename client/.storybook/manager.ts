import { create } from '@storybook/theming/create';
import { addons } from '@storybook/manager-api';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'AfricLiteBank Storybook',
  }),
});
