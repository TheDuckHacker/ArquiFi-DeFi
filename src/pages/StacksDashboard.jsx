import React, { useState, useEffect } from 'react';
import ArquiFiLogo from '../components/ArquiFiLogo';
import ArquiFiContract from '../components/ArquiFiContract';

const StacksDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [stxBalance, setStxBalance] = useState(0);
  const [apy, setApy] = useState(8.5);
  const [transactions, setTransactions] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedSession = localStorage.getItem('arquiFi_stacks_session');
        if (savedSession) {
          const sessionData = JSON.parse(savedSession);
          setUserData(sessionData);
          
          // Obtener datos reales de Stacks
          if (sessionData.userData?.profile?.stxAddress) {
            const stxAddressObj = sessionData.userData.profile.stxAddress;
            // Extraer la dirección correcta del objeto
            const stxAddress = typeof stxAddressObj === 'object' ? 
              (stxAddressObj.testnet || stxAddressObj.mainnet || Object.values(stxAddressObj)[0]) : 
              stxAddressObj;
            console.log('✅ Usuario conectado:', stxAddress);
            
            try {
              // Obtener balance real de STX
              const balanceResponse = await fetch(`/api/stacks/extended/v1/address/${stxAddress}/stx`);
              const balanceData = await balanceResponse.json();
              const realBalance = parseFloat(balanceData.balance) / 1000000;
              setStxBalance(realBalance);
              setPortfolioValue(realBalance);
              
              // Obtener transacciones reales
              const txResponse = await fetch(`/api/stacks/extended/v1/address/${stxAddress}/transactions?limit=10`);
              const txData = await txResponse.json();
              setTransactions(txData.results || []);
              
              // Obtener NFTs reales
              const nftResponse = await fetch(`/api/stacks/extended/v1/tokens/nft/holdings?principal=${stxAddress}&limit=10`);
              const nftData = await nftResponse.json();
              setNfts(nftData.results || []);
              
              console.log('✅ Datos reales cargados:', { realBalance, txCount: txData.results?.length, nftCount: nftData.results?.length });
              
              // Si no hay balance, mostrar mensaje informativo
              if (realBalance === 0) {
                console.log('ℹ️ Wallet sin STX - Datos reales pero vacíos');
              }
            } catch (error) {
              console.error('❌ Error obteniendo datos reales:', error);
              // Fallback a datos simulados si hay error
              setStxBalance(0);
              setPortfolioValue(0);
              setTransactions([]);
              setNfts([]);
            }
          }
        }
      } catch (error) {
        console.error('Error cargando datos de usuario:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Simular actualización de precios
  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolioValue(prev => {
        const change = (Math.random() - 0.5) * 100;
        return Math.max(0, prev + change);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const showNotificationWithMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleDeposit = async () => {
    setIsDepositing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPortfolioValue(prev => prev + 1000);
    setIsDepositing(false);
    showNotificationWithMessage('¡Depósito exitoso! +$1,000 agregados a tu portfolio');
  };

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPortfolioValue(prev => Math.max(0, prev - 500));
    setIsWithdrawing(false);
    showNotificationWithMessage('¡Retiro exitoso! $500 retirados de tu portfolio');
  };

  const handleStake = async () => {
    setIsStaking(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setApy(prev => prev + 0.5);
    setIsStaking(false);
    showNotificationWithMessage('¡Staking exitoso! APY aumentado a ' + (apy + 0.5) + '%');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121012] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-[#0099ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Cargando Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121012] text-white pt-20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Wallet Info - Real Address */}
        {userData?.userData?.profile?.stxAddress && (
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a] mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Wallet Conectada</h2>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 7h-3V6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1h3a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM5 4h10a1 1 0 0 1 1 1v1H5V5a1 1 0 0 1 1-1zm11 14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8h12v10z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold">Dirección Real de tu Wallet</p>
                <p className="text-gray-400 text-sm font-mono">
                  {typeof userData.userData.profile.stxAddress === 'object' ? 
                    (userData.userData.profile.stxAddress.testnet || 
                     userData.userData.profile.stxAddress.mainnet || 
                     Object.values(userData.userData.profile.stxAddress)[0]) : 
                    userData.userData.profile.stxAddress}
                </p>
                <p className="text-green-400 text-xs mt-1">
                  ✅ Conectada a Stacks Testnet
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Overview - Elegant Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Valor Total del Portfolio */}
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a] hover:border-[#0099ff]/30 transition-all duration-200">
            <h3 className="text-gray-400 text-sm font-medium mb-4">Valor Total del Portfolio</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white mb-2">${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14l5-5 5 5z"/>
                  </svg>
                  <span className="text-green-400 text-sm font-medium">+5.8% en los últimos 7 días</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#0099ff] rounded-lg flex items-center justify-center">
                <ArquiFiLogo size={24} color="white" animated={false} />
              </div>
            </div>
          </div>

          {/* APY Actual */}
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a] hover:border-[#0099ff]/30 transition-all duration-200">
            <h3 className="text-gray-400 text-sm font-medium mb-4">APY Actual</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white mb-2">{apy}%</p>
                <p className="text-gray-400 text-sm">Rendimiento anual</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Elegant Style */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={handleDeposit}
            disabled={isDepositing}
            className="bg-[#0099ff] text-white px-6 py-3 rounded-lg hover:bg-[#0088ee] transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isDepositing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Depositando...</span>
              </>
            ) : (
              <span>Depositar</span>
            )}
          </button>
          <button 
            onClick={handleWithdraw}
            disabled={isWithdrawing}
            className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg hover:bg-[#1f1f1f] border border-[#27323a] transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isWithdrawing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Retirando...</span>
              </>
            ) : (
              <span>Retirar</span>
            )}
          </button>
          <button 
            onClick={handleStake}
            disabled={isStaking}
            className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg hover:bg-[#1f1f1f] border border-[#27323a] transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isStaking ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Haciendo Stacking...</span>
              </>
            ) : (
              <span>Stake / Ganar</span>
            )}
          </button>
        </div>

        {/* Assets Table - Elegant Style */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a] mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Tus Activos</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#27323a]">
                  <th className="text-left py-3 px-2 text-gray-400 font-medium">Activo</th>
                  <th className="text-left py-3 px-2 text-gray-400 font-medium">Balance</th>
                  <th className="text-left py-3 px-2 text-gray-400 font-medium">Precio</th>
                  <th className="text-left py-3 px-2 text-gray-400 font-medium">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#27323a] hover:bg-[#1f1f1f] transition-colors duration-200">
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">B</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Bitcoin</p>
                        <p className="text-gray-400 text-sm">BTC</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-white font-semibold">0.5</td>
                  <td className="py-4 px-2 text-white font-semibold">$65,000</td>
                  <td className="py-4 px-2 text-white font-semibold">$32,500</td>
                </tr>
                <tr className="border-b border-[#27323a] hover:bg-[#1f1f1f] transition-colors duration-200">
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#0099ff] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Ξ</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Ethereum</p>
                        <p className="text-gray-400 text-sm">ETH</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-white font-semibold">3.2</td>
                  <td className="py-4 px-2 text-white font-semibold">$4,000</td>
                  <td className="py-4 px-2 text-white font-semibold">$12,800</td>
                </tr>
                <tr className="border-b border-[#27323a] hover:bg-[#1f1f1f] transition-colors duration-200">
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">$</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Tether</p>
                        <p className="text-gray-400 text-sm">USDT</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-white font-semibold">5,000</td>
                  <td className="py-4 px-2 text-white font-semibold">$1</td>
                  <td className="py-4 px-2 text-white font-semibold">$5,000</td>
                </tr>
                <tr className="hover:bg-[#1f1f1f] transition-colors duration-200">
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <ArquiFiLogo size={16} color="white" animated={false} />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Stacks</p>
                        <p className="text-gray-400 text-sm">STX</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-white font-semibold">{stxBalance.toFixed(6)}</td>
                  <td className="py-4 px-2 text-white font-semibold">$2.50</td>
                  <td className="py-4 px-2 text-white font-semibold">${(stxBalance * 2.50).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Transacciones Reales - Elegant Style */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a] mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Transacciones Recientes</h2>
          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.slice(0, 5).map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#1f1f1f] rounded-lg border border-[#27323a] hover:border-[#0099ff]/30 transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#0099ff] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {tx.tx_type === 'token_transfer' ? 'Transferencia' : 
                         tx.tx_type === 'contract_call' ? 'Llamada de Contrato' : 
                         tx.tx_type === 'smart_contract' ? 'Contrato Inteligente' : 
                         'Transacción'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(tx.burn_block_time * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {tx.tx_type === 'token_transfer' && tx.token_transfer ? 
                        `${StacksAPI.formatSTXAmount(tx.token_transfer.amount)} STX` : 
                        'Ver detalles'
                      }
                    </p>
                    <p className="text-gray-400 text-sm">
                      {tx.tx_status === 'success' ? '✅ Exitoso' : 
                       tx.tx_status === 'pending' ? '⏳ Pendiente' : 
                       '❌ Fallido'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <p className="text-gray-400">No hay transacciones recientes</p>
              </div>
            )}
          </div>
        </div>

        {/* NFTs Reales - Elegant Style */}
        {nfts.length > 0 && (
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a] mb-8">
            <h2 className="text-xl font-bold text-white mb-6">Tus NFTs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nfts.map((nft, index) => (
                <div key={index} className="bg-[#1f1f1f] rounded-lg border border-[#27323a] hover:border-[#0099ff]/30 transition-all duration-200 overflow-hidden">
                  <img 
                    src={nft.imageUrl} 
                    alt={nft.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{nft.name}</h3>
                    <p className="text-gray-400 text-sm">Token ID: {nft.tokenId}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sección de Contrato Inteligente */}
        <div className="mb-8">
          <ArquiFiContract />
        </div>
      </div>

      {/* Notificación flotante */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span className="font-medium">{notificationMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StacksDashboard;