import { useEffect, useState, useContext, createContext } from 'react';

import Sensores from '../sensors.json';


const ListaCadastroContext = createContext({});

export function ListaCadastroProvider(props) {

  const salvosSensores = JSON.parse(localStorage.getItem('selectedSensor')) || Sensores;
  const salvoNome = JSON.parse(localStorage.getItem('nomeLogin')) || null;
  const [selectedSensor, setSelectedSensor] = useState(salvosSensores);
  const [nomeLogin, setNomeLogin] = useState(salvoNome);

  useEffect(() => {
    localStorage.setItem('selectedSensor', JSON.stringify(selectedSensor));
  }, [selectedSensor]);

  useEffect(() => {
    localStorage.setItem('nomeLogin', JSON.stringify(nomeLogin));
  }, [nomeLogin]);

  //setNomeLogin(localStorage.getItem('login'))

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
