import { addons } from '@storybook/manager-api';

import { create } from '@storybook/theming/create';

addons.setConfig({
    theme: create({
        base: 'dark',
        brandTitle: 'cw3 components Storybook',
        // brandUrl: 'https://yieldprotocol.com',
        // brandImage: '@/cw3-logo.png',
        // brandTarget: '_self',
      }),
  });