import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StacksAuth from './StacksAuth';
import ArquiFiLogo from './ArquiFiLogo';

const NavigationBar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const menuRef = useRef(null);

  // Verificar estado de wallet
  useEffect(() => {
    const checkWalletStatus = () => {
      const savedSession = localStorage.getItem('arquiFi_stacks_session');
      setIsWalletConnected(!!savedSession);
    };

    checkWalletStatus();
    
    // Escuchar cambios en el localStorage
    const handleStorageChange = () => {
      checkWalletStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // También verificar periódicamente
    const interval = setInterval(checkWalletStatus, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-4 py-4 relative backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <ArquiFiLogo size={24} color="white" />
          </div>
          <h1 className="text-white text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            ArquiFi
          </h1>
        </div>

        {/* Navegación Principal */}
        <div className="hidden md:flex items-center space-x-2">
          <NavLink icon="home" text="Inicio" to="/" active={location.pathname === '/'} />
          <NavLink icon="group" text="Social" to="/social" active={location.pathname === '/social'} />
          <NavLink icon="account_balance_wallet" text="Wallet" to="/wallet" active={location.pathname === '/wallet'} />
          <NavLink icon="sports_esports" text="Juegos" to="/games" active={location.pathname === '/games'} />
          <NavLink icon="school" text="Aprender" to="/education" active={location.pathname === '/education'} />
        </div>

        {/* Sección Derecha */}
        <div className="flex items-center space-x-3">
          {/* Indicadores de Estado */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary/20 to-blue-600/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-primary/30 flex items-center space-x-2 hover:scale-105 transition-all duration-300">
              <div className="w-5 h-5 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="text-white text-sm font-semibold">2.4K AP</span>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-green-500/30 flex items-center space-x-2 hover:scale-105 transition-all duration-300">
              <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span className="text-white text-sm font-semibold">850 RP</span>
            </div>
          </div>

          {/* Notificaciones */}
          <button className="relative p-3 text-gray-400 hover:text-white transition-all duration-300 hover:bg-gray-800/50 rounded-xl group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
          </button>

                  {/* Stacks Authentication */}
                  <StacksAuth />

          {/* Perfil - Solo visible si hay wallet conectada */}
          {isWalletConnected && (
            <Link 
              to="/profile" 
              className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-primary/25"
            >
              <span className="text-white font-bold text-sm">U</span>
            </Link>
          )}

          {/* Menú Hamburguesa */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 text-gray-400 hover:text-white transition-all duration-300 hover:bg-gray-800/50 rounded-xl group"
          >
            <svg className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú Desplegable */}
      {isMenuOpen && (
        <div ref={menuRef} className="absolute top-full right-0 mt-3 bg-gray-800/95 backdrop-blur-xl border border-gray-600/50 rounded-2xl shadow-2xl z-50 min-w-[240px] animate-in slide-in-from-top-2 duration-300">
          <div className="py-3">
            {/* En pantallas pequeñas: todas las páginas */}
            <div className="md:hidden">
              <MobileNavLink icon="home" text="Inicio" to="/" active={location.pathname === '/'} />
              <MobileNavLink icon="group" text="Social" to="/social" active={location.pathname === '/social'} />
              <MobileNavLink icon="account_balance_wallet" text="Wallet" to="/wallet" active={location.pathname === '/wallet'} />
              <MobileNavLink icon="sports_esports" text="Juegos" to="/games" active={location.pathname === '/games'} />
              <MobileNavLink icon="school" text="Aprender" to="/education" active={location.pathname === '/education'} />
              
              {/* Separador */}
              <div className="border-t border-gray-600/50 my-2 mx-3"></div>
            </div>
            
            {/* Páginas adicionales - siempre visibles */}
            <MobileNavLink icon="chat" text="Chat" to="/chat" active={location.pathname === '/chat'} />
            <MobileNavLink icon="gavel" text="Gobernanza" to="/governance" active={location.pathname === '/governance'} />
            <MobileNavLink icon="swap_horiz" text="P2P" to="/p2p" active={location.pathname === '/p2p'} />
            <MobileNavLink icon="settings" text="Ajustes" to="/settings" active={location.pathname === '/settings'} />
          </div>
        </div>
      )}
    </nav>
  );
};

// Componente para enlaces de navegación
const NavLink = ({ icon, text, to, active = false }) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
        active
          ? 'text-white bg-gradient-to-r from-primary/20 to-blue-600/20 border border-primary/30 shadow-lg'
          : 'text-gray-400 hover:text-white hover:bg-gray-800/50 hover:scale-105'
      }`}
    >
      <Icon name={icon} active={active} />
      <span className="hidden lg:block">{text}</span>
    </Link>
  );
};

// Componente para enlaces móviles
const MobileNavLink = ({ icon, text, to, active = false }) => {
  return (
    <Link
      to={to}
      onClick={() => setIsMenuOpen(false)}
      className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-300 group ${
        active
          ? 'text-primary bg-primary/10 border-l-4 border-primary'
          : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
      }`}
    >
      <Icon name={icon} active={active} />
      <span>{text}</span>
    </Link>
  );
};

// Componente de iconos SVG
const Icon = ({ name, active = false }) => {
  const iconClass = `w-5 h-5 transition-all duration-300 ${active ? 'text-primary' : 'text-gray-400 group-hover:text-white group-hover:scale-110'}`;
  
  const icons = {
    home: (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    ),
    group: (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5 12.01 8.99A2.5 2.5 0 0 0 10 8H8.46c-.8 0-1.54.37-2.01.99L4 10.5 2.01 8.99A2.5 2.5 0 0 0 0 8v10h2v6h4v-6h2v6h4v-6h2v6h4z"/>
      </svg>
    ),
    account_balance_wallet: (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-2.28c.59-.35 1-.98 1-1.72V9c0-.74-.41-1.37-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z"/>
      </svg>
    ),
    sports_esports: (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.58 16.09l-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91zM11 11H9v2H8v-2H6v-1h2V8h1v2h2v1zm4-1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
      </svg>
    ),
    school: (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
      </svg>
    ),
    chat: (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6l-2 2V4h16v10z"/>
      </svg>
    ),
    gavel: (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.64 9l-.6.6-1.41-1.41.6-.6L5.64 9zm11.5-4.5L13.5 1.5l-1.41 1.41L16.73 6l1.41-1.41zM1 22h2l6-6-2-2-6 6zm20.5-2.5L13.5 1.5l-1.41 1.41L20.09 19l1.41-1.41zM5.64 9l-.6.6-1.41-1.41.6-.6L5.64 9zm11.5-4.5L13.5 1.5l-1.41 1.41L16.73 6l1.41-1.41zM1 22h2l6-6-2-2-6 6zm20.5-2.5L13.5 1.5l-1.41 1.41L20.09 19l1.41-1.41z"/>
      </svg>
    ),
    swap_horiz: (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
      </svg>
    ),
    settings: (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
      </svg>
    )
  };

  return icons[name] || null;
};

export default NavigationBar;