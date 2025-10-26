import React, { useState, useEffect } from 'react';

const Wallet = () => {
  const [assets, setAssets] = useState([
    { 
      id: 1,
      name: "Bitcoin", 
      symbol: "BTC", 
      amount: "0.15", 
      value: "$6,487.50", 
      change: "+5.2%",
      color: "bg-orange-500",
      icon: "₿"
    },
    { 
      id: 2,
      name: "Ethereum", 
      symbol: "ETH", 
      amount: "2.5", 
      value: "$6,625.00", 
      change: "+3.8%",
      color: "bg-blue-500",
      icon: "Ξ"
    },
    { 
      id: 3,
      name: "Stacks", 
      symbol: "STX", 
      amount: "1,250", 
      value: "$1,062.50", 
      change: "+12.4%",
      color: "bg-purple-500",
      icon: "S"
    },
    { 
      id: 4,
      name: "USDC", 
      symbol: "USDC", 
      amount: "500", 
      value: "$500.00", 
      change: "0.0%",
      color: "bg-blue-600",
      icon: "$"
    }
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "send",
      asset: "BTC",
      amount: "0.05",
      to: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      timestamp: "2 horas",
      status: "completed",
      hash: "abc123..."
    },
    {
      id: 2,
      type: "receive",
      asset: "ETH",
      amount: "1.2",
      from: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
      timestamp: "1 día",
      status: "completed",
      hash: "def456..."
    },
    {
      id: 3,
      type: "swap",
      asset: "STX",
      amount: "100",
      to: "USDC",
      timestamp: "3 días",
      status: "pending",
      hash: "ghi789..."
    }
  ]);

  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [sendAmount, setSendAmount] = useState('');
  const [sendAddress, setSendAddress] = useState('');
  const [swapFrom, setSwapFrom] = useState('');
  const [swapTo, setSwapTo] = useState('');
  const [swapAmount, setSwapAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    // Simular actualización de precios
    const interval = setInterval(() => {
      setAssets(prev => prev.map(asset => {
        const change = (Math.random() - 0.5) * 0.1;
        const currentValue = parseFloat(asset.value.replace('$', '').replace(',', ''));
        const newValue = currentValue * (1 + change);
        return {
          ...asset,
          value: `$${newValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          change: `${change > 0 ? '+' : ''}${(change * 100).toFixed(1)}%`
        };
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const showNotificationWithMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleSend = async () => {
    if (!sendAmount || !sendAddress || !selectedAsset) return;

    setIsProcessing(true);
    try {
      // Simular tiempo de transacción
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Agregar transacción
      const newTransaction = {
        id: Date.now(),
        type: "send",
        asset: selectedAsset.symbol,
        amount: sendAmount,
        to: sendAddress,
        timestamp: "ahora",
        status: "completed",
        hash: Math.random().toString(36).substring(7) + "..."
      };

      setTransactions(prev => [newTransaction, ...prev]);

      // Actualizar balance
      setAssets(prev => prev.map(asset => {
        if (asset.id === selectedAsset.id) {
          const newAmount = parseFloat(asset.amount) - parseFloat(sendAmount);
          return {
            ...asset,
            amount: newAmount.toString()
          };
        }
        return asset;
      }));

      showNotificationWithMessage(`¡Transacción enviada! ${sendAmount} ${selectedAsset.symbol}`);
      setShowSendModal(false);
      setSendAmount('');
      setSendAddress('');
      setSelectedAsset(null);
    } catch (error) {
      console.error('Error enviando:', error);
      showNotificationWithMessage('Error al enviar transacción');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSwap = async () => {
    if (!swapFrom || !swapTo || !swapAmount) return;

    setIsProcessing(true);
    try {
      // Simular tiempo de swap
      await new Promise(resolve => setTimeout(resolve, 4000));

      // Agregar transacción
      const newTransaction = {
        id: Date.now(),
        type: "swap",
        asset: swapFrom,
        amount: swapAmount,
        to: swapTo,
        timestamp: "ahora",
        status: "completed",
        hash: Math.random().toString(36).substring(7) + "..."
      };

      setTransactions(prev => [newTransaction, ...prev]);

      showNotificationWithMessage(`¡Swap completado! ${swapAmount} ${swapFrom} → ${swapTo}`);
      setShowSwapModal(false);
      setSwapFrom('');
      setSwapTo('');
      setSwapAmount('');
    } catch (error) {
      console.error('Error en swap:', error);
      showNotificationWithMessage('Error en el swap');
    } finally {
      setIsProcessing(false);
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'send': return '↗️';
      case 'receive': return '↙️';
      case 'swap': return '🔄';
      default: return '💰';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'send': return 'text-red-400';
      case 'receive': return 'text-green-400';
      case 'swap': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#121012] text-white">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Billetera Digital</h1>
        
        {/* Resumen del Portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#0099ff] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">💰</span>
              </div>
              <span className="text-green-400 text-sm font-semibold">+8.2%</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Valor Total</h3>
            <p className="text-3xl font-bold text-white">$14,674.50</p>
          </div>
          
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📈</span>
              </div>
              <span className="text-green-400 text-sm font-semibold">+$1,100</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Ganancia 24h</h3>
            <p className="text-3xl font-bold text-white">+7.5%</p>
          </div>
          
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🏦</span>
              </div>
              <span className="text-blue-400 text-sm font-semibold">4</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Activos</h3>
            <p className="text-3xl font-bold text-white">4</p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setShowSendModal(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center space-x-2"
          >
            <span>↗️</span>
            <span>Enviar</span>
          </button>
          <button
            onClick={() => setShowReceiveModal(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center space-x-2"
          >
            <span>↙️</span>
            <span>Recibir</span>
          </button>
          <button
            onClick={() => setShowSwapModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center space-x-2"
          >
            <span>🔄</span>
            <span>Intercambiar</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activos */}
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a]">
            <h2 className="text-xl font-bold text-white mb-6">Mis Activos</h2>
            <div className="space-y-4">
              {assets.map((asset) => (
                <div key={asset.id} className="flex items-center justify-between p-4 bg-[#27323a] rounded-lg hover:bg-[#27323a]/80 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${asset.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                      {asset.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{asset.name}</h3>
                      <p className="text-sm text-gray-400">{asset.amount} {asset.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{asset.value}</p>
                    <p className={`text-sm ${asset.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {asset.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historial de Transacciones */}
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a]">
            <h2 className="text-xl font-bold text-white mb-6">Historial de Transacciones</h2>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-[#27323a] rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getTransactionIcon(transaction.type)}</div>
                    <div>
                      <h3 className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                        {transaction.type === 'send' ? 'Enviado' : 
                         transaction.type === 'receive' ? 'Recibido' : 'Intercambiado'}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {transaction.type === 'swap' 
                          ? `${transaction.amount} ${transaction.asset} → ${transaction.to}`
                          : `${transaction.amount} ${transaction.asset}`
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{transaction.timestamp}</p>
                    <p className={`text-sm ${getStatusColor(transaction.status)}`}>
                      {transaction.status === 'completed' ? 'Completado' : 
                       transaction.status === 'pending' ? 'Pendiente' : 'Fallido'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal de Envío */}
        {showSendModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-8 max-w-md w-full mx-4 animate-bounce-in border border-[#27323a]">
              <h3 className="text-xl font-bold text-white mb-6">Enviar Criptomoneda</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Seleccionar Activo</label>
                  <select
                    value={selectedAsset?.id || ''}
                    onChange={(e) => setSelectedAsset(assets.find(a => a.id === parseInt(e.target.value)))}
                    className="w-full bg-[#27323a] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                  >
                    <option value="">Seleccionar...</option>
                    {assets.map(asset => (
                      <option key={asset.id} value={asset.id}>{asset.name} ({asset.symbol})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Cantidad</label>
                  <input
                    type="number"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#27323a] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Dirección de Destino</label>
                  <input
                    type="text"
                    value={sendAddress}
                    onChange={(e) => setSendAddress(e.target.value)}
                    placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                    className="w-full bg-[#27323a] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSendModal(false)}
                  className="flex-1 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSend}
                  disabled={!selectedAsset || !sendAmount || !sendAddress || isProcessing}
                  className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <span>Enviar</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Recepción */}
        {showReceiveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-8 max-w-md w-full mx-4 animate-bounce-in border border-[#27323a]">
              <h3 className="text-xl font-bold text-white mb-6">Recibir Criptomoneda</h3>
              
              <div className="text-center">
                <div className="w-48 h-48 bg-[#27323a] rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-4xl">📱</span>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">Escanea este código QR para recibir pagos</p>
                <p className="text-sm text-gray-500">Dirección: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM</p>
              </div>

              <button
                onClick={() => setShowReceiveModal(false)}
                className="w-full mt-6 bg-[#0099ff] text-white px-4 py-3 rounded-lg hover:bg-[#0088ee] transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal de Intercambio */}
        {showSwapModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-8 max-w-md w-full mx-4 animate-bounce-in border border-[#27323a]">
              <h3 className="text-xl font-bold text-white mb-6">Intercambiar Activos</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">De</label>
                  <select
                    value={swapFrom}
                    onChange={(e) => setSwapFrom(e.target.value)}
                    className="w-full bg-[#27323a] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                  >
                    <option value="">Seleccionar...</option>
                    {assets.map(asset => (
                      <option key={asset.id} value={asset.symbol}>{asset.name} ({asset.symbol})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">A</label>
                  <select
                    value={swapTo}
                    onChange={(e) => setSwapTo(e.target.value)}
                    className="w-full bg-[#27323a] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                  >
                    <option value="">Seleccionar...</option>
                    {assets.map(asset => (
                      <option key={asset.id} value={asset.symbol}>{asset.name} ({asset.symbol})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Cantidad</label>
                  <input
                    type="number"
                    value={swapAmount}
                    onChange={(e) => setSwapAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#27323a] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSwapModal(false)}
                  className="flex-1 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSwap}
                  disabled={!swapFrom || !swapTo || !swapAmount || isProcessing}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Intercambiando...</span>
                    </>
                  ) : (
                    <span>Intercambiar</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

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
    </div>
  );
};

export default Wallet;