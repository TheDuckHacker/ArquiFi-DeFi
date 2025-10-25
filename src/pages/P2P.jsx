import React from 'react';

const P2P = () => {
  const offers = [
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
      time: "2h"
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
      time: "4h"
    },
    {
      id: 3,
      user: "blockchain_learner",
      avatar: "BL",
      type: "Venta",
      asset: "ARQ",
      amount: "500",
      price: "$1.20",
      payment: "Zelle",
      reputation: 92,
      time: "6h"
    }
  ];

  const myOffers = [
    {
      id: 1,
      type: "Venta",
      asset: "BTC",
      amount: "0.1",
      price: "$21,800",
      status: "Activa",
      views: 45,
      inquiries: 8
    },
    {
      id: 2,
      type: "Compra",
      asset: "ETH",
      amount: "1.5",
      price: "$2,600",
      status: "Pendiente",
      views: 23,
      inquiries: 3
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-8">
          Intercambio P2P
        </h1>
        
        {/* P2P Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">Ofertas Activas</h3>
            <p className="text-blue-400 text-2xl font-bold">2</p>
            <p className="text-gray-400 text-sm">Tus ofertas</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">Transacciones</h3>
            <p className="text-green-400 text-2xl font-bold">15</p>
            <p className="text-gray-400 text-sm">Completadas</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">Reputación</h3>
            <p className="text-yellow-400 text-2xl font-bold">4.8/5</p>
            <p className="text-gray-400 text-sm">P2P Rating</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">Volumen</h3>
            <p className="text-purple-400 text-2xl font-bold">$2,450</p>
            <p className="text-gray-400 text-sm">Este mes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Market Offers */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-2xl font-bold">Ofertas del Mercado</h2>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                Crear Oferta
              </button>
            </div>
            
            <div className="space-y-4">
              {offers.map((offer) => (
                <div key={offer.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{offer.avatar}</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">@{offer.user}</p>
                        <p className="text-gray-400 text-sm">⭐ {offer.reputation}% reputación</p>
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm">{offer.time}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Tipo</p>
                      <p className={`font-semibold ${
                        offer.type === 'Venta' ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {offer.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Activo</p>
                      <p className="text-white font-semibold">{offer.asset}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Cantidad</p>
                      <p className="text-white font-semibold">{offer.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Precio</p>
                      <p className="text-white font-semibold">{offer.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">💳 {offer.payment}</span>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                      Intercambiar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Offers */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-6">Mis Ofertas</h2>
            
            <div className="space-y-4">
              {myOffers.map((offer) => (
                <div key={offer.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 rounded text-sm ${
                          offer.type === 'Venta' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                        }`}>
                          {offer.type}
                        </span>
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                          {offer.status}
                        </span>
                      </div>
                      
                      <h3 className="text-white text-lg font-semibold mb-2">
                        {offer.amount} {offer.asset} - {offer.price}
                      </h3>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>👁️ {offer.views} vistas</span>
                        <span>💬 {offer.inquiries} consultas</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                      Editar
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
                      Cancelar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default P2P;
