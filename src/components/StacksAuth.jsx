import React, { useState, useEffect } from 'react';
import ArquiFiLogo from './ArquiFiLogo';

const StacksAuth = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Verificar si hay sesión guardada
    const savedSession = localStorage.getItem('arquiFi_stacks_session');
    if (savedSession) {
      setIsConnected(true);
    }
  }, []);

  const authenticate = async () => {
    setIsConnecting(true);
    
    try {
      // Simulación de conexión con Stacks
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Crear sesión simulada
      const mockSession = {
        address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        timestamp: Date.now(),
        network: 'testnet'
      };
      
      localStorage.setItem('arquiFi_stacks_session', JSON.stringify(mockSession));
      setIsConnected(true);
      setIsConnecting(false);
      
      // Recargar para actualizar el dashboard
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('Error connecting to Stacks:', error);
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    localStorage.removeItem('arquiFi_stacks_session');
    setIsConnected(false);
    
    // Recargar para actualizar el dashboard
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  if (isConnected) {
    const savedSession = JSON.parse(localStorage.getItem('arquiFi_stacks_session') || '{}');
    const address = savedSession.address || 'ST1...';
    
    return (
      <div className="flex items-center space-x-2">
        <div className="bg-green-500 rounded-full w-2 h-2 animate-pulse"></div>
        <span className="text-white text-xs font-medium">
          {address.slice(0, 4)}...{address.slice(-4)}
        </span>
        <button
          onClick={disconnect}
          className="text-gray-400 hover:text-white transition-colors p-1"
          title="Desconectar Wallet"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={authenticate}
      disabled={isConnecting}
      className="bg-primary text-white p-3 rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg"
      title="Conectar con Stacks"
    >
      {isConnecting ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <ArquiFiLogo size={20} color="currentColor" />
      )}
    </button>
  );
};

export default StacksAuth;