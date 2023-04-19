import { createContext, Dispatch, ReactNode, useEffect, useReducer } from 'react';

export enum Setting {
  APPROVAL_METHOD = 'approvalMethod',
  APPROVAL_MAX = 'approveMax',
  SLIPPAGE_TOLERANCE = 'slippageTolerance',
  DIAGNOSTICS = 'diagnostics',
  DARK_MODE = 'darkMode',
  DISCLAIMER_CHECKED = 'disclaimerChecked',

  FORCE_TRANSACTIONS = 'forceTransactions',
  USE_FORKED_ENV = 'useForkedEnv',
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

  useForkedEnv: boolean;
  forkEnvUrl: string;

}

export interface ISettingsContext {
  settings: ISettings;
  changeSetting: (setting: Setting, value: string | number | boolean | ApprovalType) => void ;
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
  useForkedEnv: false,
  forkEnvUrl:
    process.env.REACT_APP_DEFAULT_FORK_RPC_URL || process.env.REACT_APP_LOCALHOST_RPC_URL || 'http://127.0.0.1:8545',

};

const initChangeSetting = () => null;

const SettingsContext = createContext<ISettingsContext>({
  settings: initState,
  changeSetting: initChangeSetting,
});

function settingsReducer( state: ISettings, action: { type:Setting, payload: any} ): ISettings {
  
  /* Helper: if different from existing , update the state and cache */
  const cacheAndUpdate = (_action: {type:Setting, payload: any}) => {
    if (state[action.type] === _action.payload) {
      return state[action.type];
    }
    localStorage.setItem(_action.type, JSON.stringify(_action.payload));
    return _action.payload;
  };

  return { 
    ...state,  // return original state 
    [action.type]: cacheAndUpdate(action)  // but, overwrite the state with the new value
    };
}


const SettingsProvider = ({ children }: { children: ReactNode }) => {
  
  /* LOCAL STATE */
  const [settings, updateState] = useReducer(settingsReducer, initState);

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

/* Exposed changeSettings action for updating */
const changeSetting = (setting: Setting, value: string | number | boolean | undefined) =>  updateState({ type: setting, payload: value })

  return (
    <SettingsContext.Provider value={{settings, changeSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext };
export default SettingsProvider;