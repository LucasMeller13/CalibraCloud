import { useEffect, useState, useContext, createContext } from 'react';

import Sensores from '../sensors.json';


const ListaCadastroContext = createContext([[], () => { }]);

export function ListaCadastroProvider(props) {

  const [items, setItems] = useState(Sensores);

  useEffect(() => {

    if (items.length > 0) {
      localStorage.setItem('items', JSON.stringify(items));
    }
  }, [items]);

  return <ListaCadastroContext.Provider value={[items, setItems]} {...props} />;
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
