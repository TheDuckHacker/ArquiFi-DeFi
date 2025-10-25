import React, { useState, useEffect } from 'react';
import ArquiFiLogo from '../components/ArquiFiLogo';

const StacksDashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState('2.450000');
  const [transactions, setTransactions] = useState([
    { tx_id: 'tx1', tx_type: 'STX Transfer', block_height: 12345, status: 'success' },
    { tx_id: 'tx2', tx_type: 'Contract Call', block_height: 12340, status: 'success' },
  ]);
  const [nfts, setNfts] = useState([
    { id: 1, name: 'ArquiFi NFT #1', imageUrl: 'https://via.placeholder.com/150/0099ff/FFFFFF?text=NFT+1' },
    { id: 2, name: 'ArquiFi NFT #2', imageUrl: 'https://via.placeholder.com/150/0066cc/FFFFFF?text=NFT+2' },
  ]);

  useEffect(() => {
    // Simular datos de demo
    const mockAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
    setBalance('2.450000');
    setIsConnected(true);
  }, []);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <ArquiFiLogo size={40} color="white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Conecta tu Wallet de Stacks</h2>
          <p className="text-gray-400 mb-8">Para acceder a tu dashboard, necesitas conectar tu wallet de Stacks</p>
          <button 
            onClick={() => setIsConnected(true)}
            className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
          >
            Conectar Wallet
          </button>
        </div>
      </div>
    );
  }

  const stxAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-300 bg-clip-text text-transparent">
          Dashboard de Stacks
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Tarjeta de Balance STX */}
          <div className="bg-gradient-to-r from-primary/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6 border border-primary/30 shadow-lg hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Balance STX</p>
                <p className="text-2xl font-bold text-white">
                  {balance} STX
                </p>
              </div>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <ArquiFiLogo size={24} color="white" />
              </div>
            </div>
          </div>

          {/* Tarjeta de NFTs */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 shadow-lg hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tus NFTs</p>
                <p className="text-2xl font-bold text-white">{nfts.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Tarjeta de Dirección de Wallet */}
          <div className="bg-gradient-to-r from-purple-500/20 to-fuchsia-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 shadow-lg hover-lift">
            <div>
              <p className="text-gray-400 text-sm">Tu Dirección STX</p>
              <p className="text-lg font-semibold text-white break-all">{stxAddress}</p>
            </div>
            <div className="mt-4 text-right">
              <button 
                onClick={() => navigator.clipboard.writeText(stxAddress)}
                className="text-primary hover:text-blue-400 transition-colors text-sm"
              >
                Copiar Dirección
              </button>
            </div>
          </div>
        </div>

        {/* Sección de Últimas Transacciones */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Últimas Transacciones</h2>
          {transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.tx_id} className="flex items-center justify-between bg-gray-700/50 p-4 rounded-xl">
                  <div>
                    <p className="text-white font-semibold">{tx.tx_type}</p>
                    <p className="text-gray-400 text-sm">Block: {tx.block_height}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 text-sm">✅ {tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No hay transacciones recientes.</p>
          )}
        </div>

        {/* Sección de Colección de NFTs */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Tu Colección de NFTs</h2>
          {nfts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {nfts.map((nft) => (
                <div key={nft.id} className="bg-gray-700/50 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
                  <img src={nft.imageUrl} alt={nft.name} className="w-full h-32 object-cover"/>
                  <div className="p-4">
                    <p className="text-white font-semibold">{nft.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No tienes NFTs en tu colección.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StacksDashboard;