import { addons } from '@storybook/manager-api';

import { create } from '@storybook/theming/create';

addons.setConfig({
    theme: create({
        base: 'dark',
        brandTitle: 'ChatWeb3 Components',
        // brandUrl: 'https://yieldprotocol.com',
        // brandImage: '@/cw3-logo.png',
        // brandTarget: '_self',
      }),
  });