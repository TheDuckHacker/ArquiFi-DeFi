import React, { useState, useEffect } from 'react';
import { connect, showConnect } from '@stacks/connect';
import { StacksTestnet, StacksMainnet } from '@stacks/network';
import { userSession } from '../utils/stacksSession';
import ArquiFiLogo from './ArquiFiLogo';

const StacksAuth = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
        setIsConnected(true);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
      setIsConnected(true);
    }
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await showConnect({
        appDetails: {
          name: 'ArquiFi',
          icon: window.location.origin + '/logo192.png',
        },
        redirectTo: '/',
        onFinish: () => {
          const userData = userSession.loadUserData();
          setUserData(userData);
          setIsConnected(true);
          setIsConnecting(false);
        },
        userSession,
      });
    } catch (error) {
      console.error('Error connecting to Stacks:', error);
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    userSession.signUserOut();
    setUserData(null);
    setIsConnected(false);
  };

  if (isConnected && userData) {
    return (
      <div className="flex items-center space-x-2">
        <div className="bg-green-500 rounded-full w-2 h-2"></div>
        <span className="text-white text-xs font-medium">
          {userData.profile.stxAddress.mainnet.slice(0, 4)}...{userData.profile.stxAddress.mainnet.slice(-4)}
        </span>
        <button
          onClick={handleDisconnect}
          className="text-gray-400 hover:text-white transition-colors p-1"
          title="Desconectar"
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
