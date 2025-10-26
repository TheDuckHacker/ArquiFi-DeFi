import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StacksAuth from './StacksAuth';
import ArquiFiLogo from './ArquiFiLogo';
import { useNotifications } from '../hooks/useNotifications';

const NavigationBar = ({ onLogout }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { notifications } = useNotifications();
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

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);
  
  return (
    <nav className="bg-[#121012] border-b border-[#27323a] fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section - Elegant Style */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-8 h-8 text-[#0099ff] group-hover:text-white transition-colors duration-300">
                <ArquiFiLogo size={32} color="currentColor" animated={true} />
              </div>
              <h1 className="text-xl font-bold text-white leading-tight tracking-[-0.015em]">
                ArquiFi
              </h1>
            </div>
          </div>

          {/* Navigation Links - Los 4 más importantes */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink icon="home" text="Inicio" to="/" active={location.pathname === '/'} />
            <NavLink icon="group" text="Social" to="/social" active={location.pathname === '/social'} />
            <NavLink icon="sports_esports" text="Juegos" to="/games" active={location.pathname === '/games'} />
            <NavLink icon="school" text="Aprender" to="/education" active={location.pathname === '/education'} />
          </div>

          {/* Right Section - Elegant Style */}
          <div className="flex items-center space-x-4">
            {/* Status Indicators - Iconos con tooltip */}
            <div className="hidden lg:flex items-center space-x-2">
              {/* AP Icon */}
              <div className="relative group">
                <Link 
                  to="/profile" 
                  className="p-2 text-[#0099ff] hover:text-white transition-colors duration-200 hover:bg-[#1a1a1a] rounded-lg"
                  title="Ver ArquiPuntos en Perfil"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </Link>
                {/* Burbuja AP */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-[#0099ff] text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                  <span className="text-sm font-bold">1,000 AP</span>
                </div>
              </div>

              {/* RP Icon */}
              <div className="relative group">
                <Link 
                  to="/profile" 
                  className="p-2 text-green-500 hover:text-white transition-colors duration-200 hover:bg-[#1a1a1a] rounded-lg"
                  title="Ver Reputación en Perfil"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6 4.8 2.4-7.2L2 9.2h7.6L12 2z"/>
                  </svg>
                </Link>
                {/* Burbuja RP */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-green-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                  <span className="text-sm font-bold">850 RP</span>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-[#1a1a1a] rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#0099ff] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
            </button>

            {/* Stacks Authentication */}
            <StacksAuth onLogout={onLogout} />


            {/* Profile - Only visible when wallet connected */}
            {isWalletConnected && (
              <Link 
                to="/profile" 
                className="w-8 h-8 bg-[#0099ff] rounded-lg flex items-center justify-center hover:bg-[#0088ee] transition-colors duration-200"
                title="Perfil"
              >
                <span className="text-white font-bold text-sm">U</span>
              </Link>
            )}

            {/* Desktop Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hidden md:flex p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-[#1a1a1a] rounded-lg"
              title="Menú"
            >
              <svg className={`w-5 h-5 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-[#1a1a1a] rounded-lg"
            >
              <svg className={`w-5 h-5 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop & Mobile Dropdown Menu - Enlaces secundarios */}
      {isMenuOpen && (
        <div ref={menuRef} className="absolute top-full right-0 mt-2 bg-[#121012] border border-[#27323a] rounded-lg shadow-lg z-50 w-[220px] transform -translate-x-8">
          <div className="py-2">
            {/* Enlaces principales para móvil */}
            <div className="md:hidden">
              <MobileNavLink icon="home" text="Inicio" to="/" active={location.pathname === '/'} />
              <MobileNavLink icon="group" text="Social" to="/social" active={location.pathname === '/social'} />
              <MobileNavLink icon="sports_esports" text="Juegos" to="/games" active={location.pathname === '/games'} />
              <MobileNavLink icon="school" text="Aprender" to="/education" active={location.pathname === '/education'} />
              <div className="border-t border-[#27323a] my-2"></div>
            </div>
            
            {/* Enlaces secundarios */}
            {!isWalletConnected && (
              <MobileNavLink icon="account_balance_wallet" text="Wallet" to="/wallet" active={location.pathname === '/wallet'} />
            )}
            <MobileNavLink icon="gavel" text="Gobernanza" to="/governance" active={location.pathname === '/governance'} />
            <MobileNavLink icon="swap_horiz" text="P2P" to="/p2p" active={location.pathname === '/p2p'} />
            <MobileNavLink icon="chat" text="Chat" to="/chat" active={location.pathname === '/chat'} />
            <div className="relative">
              <MobileNavLink icon="person_add" text="Solicitudes de Amistad" to="/friend-requests" active={location.pathname === '/friend-requests'} />
              {/* Contador de solicitudes pendientes */}
              {notifications.friendRequests > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  {notifications.friendRequests}
                </div>
              )}
            </div>
            <MobileNavLink icon="settings" text="Configuración" to="/settings" active={location.pathname === '/settings'} />
          </div>
        </div>
      )}
    </nav>
  );
};

// Componente para enlaces de navegación - Elegant Style
const NavLink = ({ icon, text, to, active = false }) => {
  return (
    <Link
      to={to}
      className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center space-x-2 rounded-lg ${
        active
          ? 'text-[#0099ff] bg-[#1a1a1a] border border-[#27323a]'
          : 'text-gray-300 hover:text-white hover:bg-[#1a1a1a]'
      }`}
    >
      <Icon name={icon} active={active} />
      <span>{text}</span>
    </Link>
  );
};

// Componente para enlaces móviles - Elegant Style
const MobileNavLink = ({ icon, text, to, active = false }) => {
  return (
    <Link
      to={to}
      onClick={() => setIsMenuOpen(false)}
      className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
        active
          ? 'text-[#0099ff] bg-[#1a1a1a] border-l-2 border-[#0099ff]'
          : 'text-gray-300 hover:text-white hover:bg-[#1a1a1a]'
      }`}
    >
      <Icon name={icon} active={active} />
      <span>{text}</span>
    </Link>
  );
};

// Componente de iconos SVG - Elegant Style
const Icon = ({ name, active = false }) => {
  const iconClass = `w-4 h-4 transition-colors duration-200 ${active ? 'text-[#0099ff]' : 'text-gray-400 group-hover:text-white'}`;
  
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
      ),
      person_add: (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      )
    };

  return icons[name] || null;
};

export default NavigationBar;