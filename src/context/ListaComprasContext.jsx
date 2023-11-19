import { useEffect, useState, useContext, createContext } from 'react';

/**
 * Contexto é um tópico um pouco mais avançado de React, mas o que você precisa aprender aqui
 * é que é uma forma viável de compartilhar dados entre componentes de forma "global" sem precisar
 * passar dados de um componente para outro via props ou recriar os useStates comuns em cada santa função.
 *
 * O principio da simplificação aqui é que os useStates ficam "aqui" e o resto da aplicação só acessa e lê
 * desse local centralizado através do Provider e do hook `useContext`.
 */

const ListaComprasContext = createContext([[], () => {}]);

/**
 * Além do `const [items, setItems] = useState([]);` que divulga a lista para toda aplicação
 * também fiz uma sincronização dos nossos itens com a memória do navegador (localStorage) assim
 * não perderemos os itens da lista de compras mesmo que fechamos a janela.
 */
export function ListaComprasProvider(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsData = localStorage.getItem('items');
    const items = itemsData ? JSON.parse(itemsData) : [];
    setItems(items);
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('items', JSON.stringify(items));
    }
  }, [items]);

  return <ListaComprasContext.Provider value={[items, setItems]} {...props} />;
}

export function useListaCompras() {
  const context = useContext(ListaComprasContext);
  if (context === undefined) {
    throw new Error(
      `useListaCompras must be used within a ListaComprasProvider`
    );
  }
  return context;
}

export function generateId() {
  return Math.random().toString(36).substr(2, 5);
}
