import React, { useState, useEffect } from 'react';

const P2P = () => {
  const [offers, setOffers] = useState([]);
  const [activeTab, setActiveTab] = useState('buy');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isTrading, setIsTrading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tradeAmount, setTradeAmount] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Datos simulados de ofertas
  const mockOffers = [
    {
      id: 1,
      user: "crypto_trader",
      avatar: "CT",
      type: "Venta",
      asset: "BTC",
      amount: "0.5",
      price: "$21,500",
      payment: "Transferencia bancaria",
      reputation: 95,
      time: "2h",
      minAmount: "0.01",
      maxAmount: "0.5",
      available: "0.5"
    },
    {
      id: 2,
      user: "defi_master",
      avatar: "DM",
      type: "Compra",
      asset: "ETH",
      amount: "2.0",
      price: "$2,650",
      payment: "PayPal",
      reputation: 88,
      time: "4h",
      minAmount: "0.1",
      maxAmount: "2.0",
      available: "2.0"
    },
    {
      id: 3,
      user: "stacks_holder",
      avatar: "SH",
      type: "Venta",
      asset: "STX",
      amount: "1000",
      price: "$0.85",
      payment: "Zelle",
      reputation: 92,
      time: "1h",
      minAmount: "10",
      maxAmount: "1000",
      available: "1000"
    },
    {
      id: 4,
      user: "bitcoin_bull",
      avatar: "BB",
      type: "Compra",
      asset: "BTC",
      amount: "1.0",
      price: "$21,200",
      payment: "Wise",
      reputation: 90,
      time: "6h",
      minAmount: "0.01",
      maxAmount: "1.0",
      available: "1.0"
    }
  ];

  useEffect(() => {
    setOffers(mockOffers);
  }, []);

  const showNotificationWithMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const startTrade = (offer) => {
    setSelectedOffer(offer);
    setShowModal(true);
    setTradeAmount('');
  };

  const executeTrade = async () => {
    if (!tradeAmount || !selectedOffer) return;

    setIsTrading(true);
    try {
      // Simular tiempo de transacción
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Actualizar oferta
      setOffers(prev => prev.map(offer => {
        if (offer.id === selectedOffer.id) {
          const newAmount = parseFloat(offer.available) - parseFloat(tradeAmount);
          return {
            ...offer,
            available: newAmount.toString(),
            amount: newAmount.toString()
          };
        }
        return offer;
      }));

      showNotificationWithMessage(`¡Intercambio exitoso! ${tradeAmount} ${selectedOffer.asset} por ${selectedOffer.price}`);
      setShowModal(false);
      setSelectedOffer(null);
      setTradeAmount('');
    } catch (error) {
      console.error('Error en intercambio:', error);
      showNotificationWithMessage('Error en el intercambio');
    } finally {
      setIsTrading(false);
    }
  };

  const createOffer = () => {
    showNotificationWithMessage('Función de crear oferta próximamente disponible');
  };

  const filteredOffers = offers.filter(offer => 
    activeTab === 'buy' ? offer.type === 'Venta' : offer.type === 'Compra'
  );

  return (
    <div className="min-h-screen bg-[#121012] text-white">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Intercambio P2P</h1>
        
        {/* Tabs de navegación */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('buy')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'buy'
                ? 'bg-[#0099ff] text-white'
                : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#27323a]'
            }`}
          >
            Comprar
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'sell'
                ? 'bg-[#0099ff] text-white'
                : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#27323a]'
            }`}
          >
            Vender
          </button>
          <button
            onClick={createOffer}
            className="px-6 py-3 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Crear Oferta
          </button>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#27323a]">
            <h3 className="text-gray-400 text-sm mb-2">Ofertas Activas</h3>
            <p className="text-2xl font-bold text-white">{offers.length}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#27323a]">
            <h3 className="text-gray-400 text-sm mb-2">Volumen 24h</h3>
            <p className="text-2xl font-bold text-white">$45,230</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#27323a]">
            <h3 className="text-gray-400 text-sm mb-2">Usuarios Online</h3>
            <p className="text-2xl font-bold text-white">127</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#27323a]">
            <h3 className="text-gray-400 text-sm mb-2">Tasa de Éxito</h3>
            <p className="text-2xl font-bold text-green-400">98.5%</p>
          </div>
        </div>

        {/* Lista de ofertas */}
        <div className="space-y-4">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a] hover:border-[#0099ff]/30 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#0099ff] rounded-full flex items-center justify-center text-white font-bold">
                    {offer.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{offer.user}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">Reputación: {offer.reputation}%</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-400">Online</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{offer.price}</p>
                      <p className="text-sm text-gray-400">por {offer.asset}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-white">{offer.amount} {offer.asset}</p>
                      <p className="text-sm text-gray-400">Disponible</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">{offer.payment}</p>
                      <p className="text-sm text-gray-400">{offer.time}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => startTrade(offer)}
                  className="bg-[#0099ff] text-white px-6 py-3 rounded-lg hover:bg-[#0088ee] transition-colors font-semibold"
                >
                  {activeTab === 'buy' ? 'Comprar' : 'Vender'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de intercambio */}
        {showModal && selectedOffer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-8 max-w-md w-full mx-4 animate-bounce-in border border-[#27323a]">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {activeTab === 'buy' ? 'Comprar' : 'Vender'} {selectedOffer.asset}
                </h3>
                <p className="text-gray-400">Con {selectedOffer.user}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-[#27323a] rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Precio por {selectedOffer.asset}</span>
                    <span className="text-white font-semibold">{selectedOffer.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Método de pago</span>
                    <span className="text-white">{selectedOffer.payment}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Reputación</span>
                    <span className="text-green-400">{selectedOffer.reputation}%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Cantidad de {selectedOffer.asset}
                  </label>
                  <input
                    type="number"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    placeholder={`Mín: ${selectedOffer.minAmount}, Máx: ${selectedOffer.maxAmount}`}
                    className="w-full bg-[#27323a] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                  />
                </div>

                {tradeAmount && (
                  <div className="bg-[#27323a] rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total a pagar</span>
                      <span className="text-white font-semibold">
                        ${(parseFloat(tradeAmount) * parseFloat(selectedOffer.price.replace('$', '').replace(',', ''))).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={executeTrade}
                  disabled={!tradeAmount || isTrading}
                  className="flex-1 bg-[#0099ff] text-white px-4 py-3 rounded-lg hover:bg-[#0088ee] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isTrading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <span>Confirmar Intercambio</span>
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

export default P2P;