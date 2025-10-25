import React, { useState, useEffect } from 'react';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Verificar si ya hay una sesión activa
    const checkExistingSession = () => {
      const existingSession = localStorage.getItem('arquiFi_session');
      if (existingSession) {
        const sessionData = JSON.parse(existingSession);
        setIsConnected(true);
        setWalletAddress(sessionData.address);
        userState.initializeUser(sessionData.address);
      }
    };

    checkExistingSession();
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Simular conexión de wallet para demo
      const mockAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      
      // Guardar sesión en localStorage
      localStorage.setItem('arquiFi_session', JSON.stringify({
        address: mockAddress,
        timestamp: Date.now()
      }));

      setIsConnected(true);
      setWalletAddress(mockAddress);
      
              // Mostrar notificación de éxito
              console.log('¡Wallet conectada exitosamente!');
    } catch (error) {
      console.error('Error conectando wallet:', error);
      console.log('Error conectando wallet. Inténtalo de nuevo.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('arquiFi_session');
    setIsConnected(false);
    setWalletAddress('');
    console.log('Wallet desconectada');
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2">
        <div className="bg-green-500 rounded-full w-2 h-2"></div>
        <span className="text-white text-xs font-medium">
          {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
        </span>
        <button
          onClick={handleDisconnect}
          className="text-gray-400 hover:text-white transition-colors p-1"
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
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-primary text-white p-3 rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg"
      title="Conectar Wallet"
    >
      {isConnecting ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 7h-3V6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1h3a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM5 4h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm15 4v6h-2V8h2z"/>
        </svg>
      )}
    </button>
  );
};

export default WalletConnect;
