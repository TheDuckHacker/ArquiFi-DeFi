import React, { useState } from 'react';
import { showConnect } from '@stacks/connect';
import { userSession } from '../config/stacks';
import ArquiFiLogo from './ArquiFiLogo';

const LoginScreen = ({ onLogin }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    
    try {
      // Usar Stacks Connect real para conectar con Hiro Wallet o Xverse
      await showConnect({
        userSession,
        appDetails: {
          name: 'ArquiFi',
          icon: '/favicon.svg',
        },
        onFinish: (userData) => {
          console.log('Usuario conectado con wallet real:', userData);
          
          // Guardar sesión real con datos de la wallet
          const sessionData = {
            userData,
            timestamp: Date.now(),
            network: 'testnet'
          };
          
          localStorage.setItem('arquiFi_stacks_session', JSON.stringify(sessionData));
          setIsConnecting(false);
          onLogin();
        },
        onCancel: () => {
          console.log('Conexión de wallet cancelada');
          setIsConnecting(false);
        }
      });
      
    } catch (error) {
      console.error('Error connecting to Stacks wallet:', error);
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121012] flex items-center justify-center p-4">
      <div className="max-w-[480px] w-full">
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-10 h-10 text-white mb-4">
            <ArquiFiLogo size={40} color="currentColor" animated={false} />
          </div>
          <h1 className="text-white text-3xl font-bold">ArquiFi</h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 p-4">
          <div className="text-center">
            <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-4">
              Desbloquea el Futuro de las Finanzas
            </p>
            <p className="text-[#9aaebc] text-base font-normal leading-normal">
              Conecta tu Hiro Wallet o Xverse para comenzar
            </p>
          </div>

          {/* Connect Wallet Button */}
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 flex-1 bg-[#0099ff] text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-[#0088ee] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 7h-3V6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1h3a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM5 4h10a1 1 0 0 1 1 1v1H5V5a1 1 0 0 1 1-1zm11 14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8h12v10z"/>
                    <path d="M15 11H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"/>
                  </svg>
                  <span className="truncate">Conectar con Stacks</span>
                </>
              )}
            </button>
          </div>

          {/* Terms */}
          <div className="text-center mt-4 px-4 py-3">
            <p className="text-[#9aaebc] text-xs">
              Al conectar tu wallet, aceptas los{' '}
              <a className="text-white hover:underline" href="#">
                Términos de Servicio
              </a>{' '}
              y la{' '}
              <a className="text-white hover:underline" href="#">
                Política de Privacidad
              </a>
              {' '}de ArquiFi. Los nuevos usuarios serán invitados a crear un perfil después de conectar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
