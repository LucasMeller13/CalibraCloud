import { useState, useRef, useEffect, useCallback } from 'react';
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
              to="/root/dashboard"
              className={({ isActive }) =>
                `${navLinkClassName} ${isActive ? 'text-cyan-300' : 'text-slate-400'}`
              }
              end
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/root/cadastro"
              className={({ isActive }) =>
                `${navLinkClassName} ${isActive ? 'text-cyan-300' : 'text-slate-400'}`
              }
            >
              Cadastro
            </NavLink>
            <NavLink
              to="/root/consulta"
              className={({ isActive }) =>
                `${navLinkClassName} ${isActive ? 'text-cyan-300' : 'text-slate-400'}`
              }
            >
              Consulta
            </NavLink>
            <NavLink
              to="/root/edicao"
              className={({ isActive }) =>
                `${navLinkClassName} ${isActive ? 'text-cyan-300' : 'text-slate-400'}`
              }
            >
              Edição
            </NavLink>
            <NavLink
              to="/root/remocao"
              className={({ isActive }) =>
                `${navLinkClassName} ${isActive ? 'text-cyan-300' : 'text-slate-400'} `
              }
            >
              Remoção
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

//<div className="mx-auto max-w-5xl"> 
