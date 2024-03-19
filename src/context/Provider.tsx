import { ReactNode, useState } from 'react';
import Context, { MyContextProps } from './Context';

interface MyProviderProps {
  children: ReactNode;
}

function Provider({ children }: MyProviderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleCategories = async () => {
    console.log('fui chamado');
    setSidebarOpen(!sidebarOpen);
  };

  // Estados e funções a serem compartilhados entre os componentes.
  const value:MyContextProps = {
    toggleCategories,
    sidebarOpen,
    setSidebarOpen,
  };
  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

export default Provider;