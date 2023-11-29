import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ListaCadastroProvider } from './context/ListaCadastroContext';
import RootLayout from './layouts/RootLayout';

import Dashboard from './routes/Dashboard';
import Cadastro from './routes/Cadastro';
import Consulta from './routes/Consulta';
import Edicao from './routes/Edicao';
import Remocao from './routes/Remocao';
import Login from './routes/Login';

/**
 * Esse `router` abaixo é uma espécie de "configuração" do rotas da aplicação.
 *
 * O conceito principal é `no endereco X, renderize o componente/função Y`. E já sabemos
 * que cada tela nada mais é que um tipo de componente/função de React que gera HTML.
 *
 * Eu costumo salvar os componentes maiores, que representam telas, na pasta `routes`, e os
 * componentes menores que só compõem pedaços de telas sem vida própria eu salvo em `components`.
 *
 * O endereço '/' representa a capa/entrada inicial do sistema/site. Os outros endereços são
 * páginas/módulos com endereços próprios que podem ser acessados diretamente ou via Link/menu.
 *
 * Por fim, abaixo temos um esquema "inteligente" para manter uma base de layout/estrutura comum
 * que se repete em todas as telas. Podemos carregar um componente/função que representa o "layout"
 * de nossa aplicação, contendo topo, menu, rodapé e etc como a rota principal '/' e colocarmos
 * todos os outros endereços/páginas como filho (children) dessa rota de layout, assim como todos
 * os endereços são filhos desse "layout" todos eles ficarão "dentro dele".
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/cadastro',
        element: <Cadastro />,
      },
      {
        path: '/consulta',
        element: <Consulta />,
      },
      {
        path: '/edicao',
        element: <Edicao />,
      },
      {
        path: '/remocao',
        element: <Remocao />,
      },
    ],
  },
]);

export default function App() {
  return (
    <ListaCadastroProvider>
      <RouterProvider router={router} />
    </ListaCadastroProvider>
  );
}
