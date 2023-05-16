import React from 'react';
import ConnectionWrapper from '../src/contexts/ConnectionWrapper';
import '@rainbow-me/rainbowkit/styles.css';

export const Decorators = [(Story) => <ConnectionWrapper> <Story /> </ConnectionWrapper>]