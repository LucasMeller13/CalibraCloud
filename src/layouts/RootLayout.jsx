import { useState, useRef} from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';

export default function RootLayout() {
  const [isScrollingHeader, setIsScrollingHeader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const navLinkClassName =
    'mr-6 mt-4 block text-base font-medium text-lg hover:text-white-600 md:mt-0 md:inline-block';

  function toggleMenu(event) {
    event.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 z-50 w-full bg-black border-b-4 border-cyan-300 transform bg-black px-6 py-5 transition-all duration-500 ease-in-out ${
          isScrollingHeader ? '-translate-y-full' : 'shadow-md'
        }`}
      >
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between">
          <div className="sm:mr-8">
            <div className="display: flex">
              <img src="/images/logo.svg" width="40px" />
              <Link className="flex items-center" to="/root/dashboard">
                <span className="self-center text-2xl font-semibold text-white ml-1 mb-1 mr-5">
                  CalibraCloud
                </span>
              </Link>
            </div>
          </div>
          <nav
            className={`order-last mt-2 w-full flex-grow items-center md:order-none md:mt-0 md:flex md:w-auto ${
              !isMenuOpen ? 'hidden' : ''
            }`}
          >
            <NavLink
              title="Dashboard"
              to="/root/dashboard"
              className={({ isActive }) =>
                `${navLinkClassName} ${isActive ? 'text-cyan-300' : 'text-slate-400'}`
              }
              end
            >
              Dashboard
            </NavLink>
            <NavLink
              title="Cadastro de novos sensores"
              to="/root/cadastro"
              className={({ isActive }) =>
                `${navLinkClassName} ${isActive ? 'text-cyan-300' : 'text-slate-400'}`
              }
            >
              Cadastro S.
            </NavLink>
            <NavLink
              title="Consulta de sensores"
              to="/root/consulta"
              className={({ isActive }) =>
                `${navLinkClassName} ${isActive ? 'text-cyan-300' : 'text-slate-400'}`
              }
            >
              Consulta S.
            </NavLink>
            <NavLink
              title="Edição de sensores"
              to="/root/edicao"
              className={({ isActive }) =>
                `${navLinkClassName} ${isActive ? 'text-cyan-300' : 'text-slate-400'}`
              }
            >
              Edição S.
            </NavLink>
            <NavLink
              title="Remoção de sensores"
              to="/root/remocao"
              className={({ isActive }) =>
                `${navLinkClassName} ${isActive ? 'text-cyan-300' : 'text-slate-400'} `
              }
            >
              Remoção S.
            </NavLink>

            <div className="hidden md:block h-11 self-center border-l-2 border-white mx-4"></div> {/* Vertical line added here */}

            <NavLink
              title="Cadastro de novos usuários"
              to="/root/cadastroUsuario"
              className={({ isActive }) =>
                `ml-5 ${navLinkClassName} ${isActive ? 'text-cyan-300' : 'text-slate-400'} `
              }>
              Cadastro Us.
            </NavLink>

            <NavLink
              title="Consulta de usuários"
              to="/root/consultaUsuario"
              className={({ isActive }) =>
                `${navLinkClassName} ${isActive ? 'text-cyan-300' : 'text-slate-400'} `
              }>
              Consulta Us.
            </NavLink>

            <NavLink
              title="Edição de usuários"
              to="/root/edicaoUsuario"
              className={({ isActive }) =>
                `${navLinkClassName} ${isActive ? 'text-cyan-300' : 'text-slate-400'} `
              }>
              Edição Us.
            </NavLink>

            <NavLink
              title="Remoção de usuários"
              to="/root/remocaoUsuario"
              className={({ isActive }) =>
                `${navLinkClassName} ${isActive ? 'text-cyan-300' : 'text-slate-400'} `
              }>
              Remoção Us.
            </NavLink>
          </nav>
          <div
            onClick={toggleMenu}
            className="flex cursor-pointer items-center text-slate-700 hover:text-white-600 sm:ml-6 md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-5 w-5 text-white-900"
              viewBox="0 0 24 24"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </div>
          <h3 className="text-white mr-2 text-lg">Front End - ABP</h3>
        </div>
      </header>
      <main className="mx-7 mt-28 flex-grow lg:mx-6">
        <div className="mx-auto max-w-screen-xl"> 
          <Outlet />
        </div>
      </main>
    </>
  );
}