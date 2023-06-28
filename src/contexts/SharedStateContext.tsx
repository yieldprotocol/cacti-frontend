import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

// export interface ListItem {
//   name: string;
//   params: string;
// }

type SharedStateContextType = {
  items: Widget[];
  setItems: Dispatch<SetStateAction<Widget[]>>;
  prefix: string;
  setPrefix: Dispatch<SetStateAction<string>>;
  suffix: string;
  setSuffix: Dispatch<SetStateAction<string>>;
  isThinking: boolean;
  setIsThinking: Dispatch<SetStateAction<boolean>>;
};

const initialState = {
  items: [] as Widget[],
  setItems: () => {
    throw new Error('setItems must be used within SharedStateContext');
  },
  prefix: '',
  setPrefix: () => {
    throw new Error('setPrefix must be used within SharedStateContext');
  },
  suffix: '',
  setSuffix: () => {
    throw new Error('setSuffix must be used within SharedStateContext');
  },
  isThinking: false,
  setIsThinking: () => {
    throw new Error('setIsThinking must be used within SharedStateContext');
  },
};

const SharedStateContext = createContext<SharedStateContextType>(initialState);

export const SharedStateContextProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState(initialState.items);
  const [prefix, setPrefix] = useState(initialState.prefix);
  const [suffix, setSuffix] = useState(initialState.suffix);
  const [isThinking, setIsThinking] = useState(initialState.isThinking);
  return (
    <SharedStateContext.Provider
      value={{
        items,
        setItems,
        prefix,
        setPrefix,
        suffix,
        setSuffix,
        isThinking,
        setIsThinking,
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedStateContext = () => useContext(SharedStateContext);
export default SharedStateContextProvider;
