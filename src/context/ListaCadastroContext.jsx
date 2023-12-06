import { useEffect, useState, useContext, createContext } from 'react';

import Sensores from '../sensors.json';
import Usuarios from '../users.json'

const ListaCadastroContext = createContext({});

export function ListaCadastroProvider(props) {

  const salvosSensores = JSON.parse(localStorage.getItem('selectedSensor')) || Sensores;
  const salvoNome = JSON.parse(localStorage.getItem('nomeLogin')) || null;
  const salvoUsuario = JSON.parse(localStorage.getItem('nomePessoa')) || Usuarios;
  const [selectedSensor, setSelectedSensor] = useState(salvosSensores);
  const [nomeLogin, setNomeLogin] = useState(salvoNome);
  const [usuarios, setUsuarios] = useState(salvoUsuario)

  /*Caso quiser resetar a LocalStorage, basta descomentar a linha de código abaixo e dar um F5 no seu navegador.
    Importante recomentar o código após resetá-lo, já que caso não fizer correrá o risco de perder os cadastros feitos
     por conta de um refresh do navegador. */
  
  //localStorage.clear()

  useEffect(() => {
    localStorage.setItem('selectedSensor', JSON.stringify(selectedSensor));
  }, [selectedSensor]);

  useEffect(() => {
    localStorage.setItem('nomeLogin', JSON.stringify(nomeLogin));
  }, [nomeLogin]);

  useEffect(() => {
    localStorage.setItem('nomePessoa', JSON.stringify(usuarios));
  }, [usuarios]);

  const contextValue = {
    selectedSensor,
    setSelectedSensor,
    nomeLogin,
    setNomeLogin, 
    usuarios,
    setUsuarios
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
