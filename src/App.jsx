import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import LoginScreen from './components/LoginScreen';
import StacksDashboard from './pages/StacksDashboard';
import Dashboard from './pages/Dashboard';
import Social from './pages/Social';
import Chat from './pages/Chat';
import Wallet from './pages/Wallet';
import Governance from './pages/Governance';
import Games from './pages/Games';
import Education from './pages/Education';
import P2P from './pages/P2P';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ArquiBot from './components/ArquiBot';
import ArquiBotFloating from './components/ArquiBotFloating';

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay sesión guardada
    const checkWalletConnection = () => {
      const savedSession = localStorage.getItem('arquiFi_stacks_session');
      if (savedSession) {
        setIsWalletConnected(true);
      }
      setIsLoading(false);
    };

    checkWalletConnection();
    
    // Escuchar cambios en el localStorage
    const handleStorageChange = () => {
      checkWalletConnection();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // También verificar periódicamente
    const interval = setInterval(checkWalletConnection, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogin = () => {
    setIsWalletConnected(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('arquiFi_stacks_session');
    setIsWalletConnected(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121012] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-[#0099ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no está conectado, mostrar solo la pantalla de login
  if (!isWalletConnected) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Si está conectado, mostrar la aplicación completa
  return (
    <Router>
      <div className="min-h-screen bg-[#121012]">
        <NavigationBar onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<StacksDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/social" element={<Social />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/games" element={<Games />} />
          <Route path="/education" element={<Education />} />
          <Route path="/p2p" element={<P2P />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bot" element={<ArquiBot />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        {/* ArquiBot flotante en todas las páginas excepto configuraciones */}
        <ArquiBotFloating />
      </div>
    </Router>
  );
}

export default App;