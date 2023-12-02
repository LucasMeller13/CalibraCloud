import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ListaCadastroProvider } from './context/ListaCadastroContext';
import RootLayout from './layouts/RootLayout';

import Dashboard from './routes/Dashboard';
import Cadastro from './routes/Cadastro';
import Consulta from './routes/Consulta';
import Edicao from './routes/Edicao';
import Remocao from './routes/Remocao';
import Login from './routes/Login';

import CadastroUsuario from './routes/CadastroUsuario'
import ConsultaUsuario from './routes/ConsultaUsuario'
import EdicaoUsuario from './routes/EdicaoUsuario'
import RemocaoUsuario from './routes/RemocaoUsuario'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/root',
    element: <RootLayout />,
    children: [
      {
        path: '/root/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/root/cadastro',
        element: <Cadastro />,
      },
      {
        path: '/root/consulta',
        element: <Consulta />,
      },
      {
        path: '/root/edicao',
        element: <Edicao />,
      },
      {
        path: '/root/remocao',
        element: <Remocao />,
      },
      {
        path: '/root/cadastroUsuario',
        element: <CadastroUsuario />,
      },
      {
        path: '/root/consultaUsuario',
        element: <ConsultaUsuario />,
      },
      {
        path: '/root/edicaoUsuario',
        element: <EdicaoUsuario />,
      },
      {
        path: '/root/remocaoUsuario',
        element: <RemocaoUsuario />,
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
