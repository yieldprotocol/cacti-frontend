import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import ConnectionWrapper from '../src/contexts/ConnectionWrapper';

export const Decorators = [
  (Story) => (
    <ConnectionWrapper>
      {' '}
      <Story />{' '}
    </ConnectionWrapper>
  ),
];
