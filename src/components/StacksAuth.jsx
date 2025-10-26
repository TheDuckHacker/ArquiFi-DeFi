import React, { useState, useEffect } from 'react';
import ArquiFiLogo from './ArquiFiLogo';

const StacksAuth = ({ onLogout }) => {
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
    
    // Llamar a la función de logout del padre
    if (onLogout) {
      onLogout();
    }
  };

  if (isConnected) {
    const savedSession = JSON.parse(localStorage.getItem('arquiFi_stacks_session') || '{}');
    const address = savedSession.address || 'ST1...';
    
    return (
      <div className="relative group">
        <button className="p-2 text-green-500 hover:text-white transition-colors duration-200 hover:bg-[#1a1a1a] rounded-lg">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 7h-3V6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1h3a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM5 4h10a1 1 0 0 1 1 1v1H5V5a1 1 0 0 1 1-1zm11 14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8h12v10z"/>
            <path d="M15 11H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"/>
          </svg>
        </button>
        
        {/* Burbuja con dirección */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-green-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
          <span className="text-sm font-bold">{address.slice(0, 4)}...{address.slice(-4)}</span>
        </div>
        
        {/* Botón de desconectar oculto */}
        <button
          onClick={disconnect}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          title="Desconectar Wallet"
        >
          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={authenticate}
      disabled={isConnecting}
      className="bg-[#0099ff] text-white px-4 py-2 rounded-lg hover:bg-[#0088ee] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
      title="Conectar Wallet"
    >
      {isConnecting ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 7h-3V6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1h3a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM5 4h10a1 1 0 0 1 1 1v1H5V5a1 1 0 0 1 1-1zm11 14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8h12v10z"/>
            <path d="M15 11H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"/>
          </svg>
          <span className="text-sm font-medium">Conectar</span>
        </>
      )}
    </button>
  );
};

export default StacksAuth;