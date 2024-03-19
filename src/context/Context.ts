import { Dispatch, SetStateAction, createContext } from 'react';

type Open = boolean;

export interface MyContextProps {
  toggleCategories: () => void,
  sidebarOpen: boolean,
  setSidebarOpen: Dispatch<SetStateAction<Open>>,
}

const Context = createContext<MyContextProps | undefined>(undefined);

export default Context;