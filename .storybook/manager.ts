import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Cacti Components',
    // brandUrl: 'https://yieldprotocol.com',
    // brandImage: '@/cacti-logo.png',
    // brandTarget: '_self',
  }),
});
