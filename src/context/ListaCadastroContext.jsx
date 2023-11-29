import { useEffect, useState, useContext, createContext } from 'react';

import Sensores from '../sensors.json';


const ListaCadastroContext = createContext({});

export function ListaCadastroProvider(props) {

  const [selectedSensor, setSelectedSensor] = useState(Sensores);
  const [nomeLogin, setNomeLogin] = useState(null);

  useEffect(() => {

    if (selectedSensor.length > 0) {
      localStorage.setItem('items', JSON.stringify(selectedSensor));
    }
  }, [selectedSensor]);

  const contextValue = {
    selectedSensor,
    setSelectedSensor,
    nomeLogin,
    setNomeLogin, 
  };

  return <ListaCadastroContext.Provider value={contextValue} {...props} />;
}

export function useListaCadastro() {
  const context = useContext(ListaCadastroContext);
  if (context === undefined) {
    throw new Error(
      `useListaCadastro must be used within a ListaCadastroProvider`
    );
  }
  return context;
}

export function generateId() {
  return Math.random().toString(36).substr(2, 5);
}
