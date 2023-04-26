import useShortcutKey from '@/hooks/useShortcutKey';
import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer, useState } from 'react';

import { useHotkeys } from 'react-hotkeys-hook';

export enum Setting {
  APPROVAL_METHOD = 'approvalMethod',
  APPROVAL_MAX = 'approveMax',
  SLIPPAGE_TOLERANCE = 'slippageTolerance',
  DIAGNOSTICS = 'diagnostics',
  DARK_MODE = 'darkMode',
  DISCLAIMER_CHECKED = 'disclaimerChecked',

  FORCE_TRANSACTIONS = 'forceTransactions',

  FORKED_ENV = 'isForkedEnv',
  FORK_ENV_URL = 'forkEnvUrl',
}

export enum ApprovalType {
  TX = 'TX',
  SIG = 'SIG',
  DAI_SIG = 'DAI_SIG',
}

export interface ISettings {
  /* User Settings ( getting from the cache first ) */
  slippageTolerance: number;
  darkMode: boolean;
  approvalMethod: ApprovalType;
  approveMax: boolean;
  disclaimerChecked: boolean;

  /* developer setttings */
  forceTransactions: boolean;
  diagnostics: boolean;

  isForkedEnv: boolean;
  forkEnvUrl: string;
  forkId: string;
}

export interface ISettingsContext {
  settings: ISettings;
  changeSetting: (setting: Setting, value: string | number | boolean | ApprovalType) => void;
}

const initState: ISettings = {
  /** App/User Settings **/

  /* Use token approval by individual tranasaction */
  approvalMethod: ApprovalType.SIG,
  /* Approve MAX amount, so only one approval transaction is required */
  approveMax: false,
  /* Set the slippage tolerance to a particular % */
  slippageTolerance: 0.001,
  /* Color theme */
  darkMode: false,
  /* Has the usage disclaimer been checked? */
  disclaimerChecked: false,

  /** Development settings **/

  /* Always force transctions to the chain -> even if they will likely fail */
  forceTransactions: false,
  /* Show diagnostic messages in the console/chat */
  diagnostics: false,

  /* use a forked network */
  isForkedEnv: false,
  forkId: process.env.NEXT_PUBLIC_TENDERLY_FORK_ID || '',
  forkEnvUrl: `https://rpc.tenderly.co/fork/${process.env.NEXT_PUBLIC_TENDERLY_FORK_ID}`,
};

const initChangeSetting = () => null;

const SettingsContext = createContext<ISettingsContext>({
  settings: initState,
  changeSetting: initChangeSetting,
});

function settingsReducer(state: ISettings, action: { type: Setting; payload: any }): ISettings {
  /* Helper: if different from existing , update the state and cache */
  const cacheAndUpdate = (_action: { type: Setting; payload: any }) => {
    if (state[action.type] === _action.payload) {
      return state[action.type];
    }
    localStorage.setItem(_action.type, JSON.stringify(_action.payload));
    return _action.payload;
  };

  return {
    ...state, // return original state
    [action.type]: cacheAndUpdate(action), // but, overwrite the state with the new value
  };
}

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  /* LOCAL STATE */
  const [settings, updateState] = useReducer(settingsReducer, initState);

  /* Set universal Shortcut keys for the some settings */
  useHotkeys('alt+f', () => changeSetting( Setting.FORKED_ENV, !settings.isForkedEnv ));

  /* Pre - Update all settings in state based on localStorage */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Object.values(Setting).forEach((setting: Setting) => {
        if (JSON.parse(localStorage.getItem(setting)!) !== null) {
          updateState({ type: setting, payload: JSON.parse(localStorage.getItem(setting)!) });
        }
      });
    }
  }, []);

  /* Exposed changeSettings() for updating */
  const changeSetting = (setting: Setting, value: string | number | boolean | undefined) =>
    updateState({ type: setting, payload: value });

  return (
    <SettingsContext.Provider value={{ settings, changeSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
