import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ListaCadastroProvider } from './context/ListaCadastroContext';
import RootLayout from './layouts/RootLayout';

import Dashboard from './routes/Dashboard';
import Cadastro from './routes/Cadastro';
import Consulta from './routes/Consulta';
import Edicao from './routes/Edicao';
import Remocao from './routes/Remocao';
import Login from './routes/Login';

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
