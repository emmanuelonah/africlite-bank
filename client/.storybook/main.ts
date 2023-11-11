import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    //'../i18n/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    //'../utils/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    //'../admin/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    //'../customer/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    //'../services/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    //'../design-system/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react-webpack5',
  docs: {
    autodocs: 'tag',
  },
};
export default config;
