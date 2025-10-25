import React from 'react';

const Wallet = () => {
  const assets = [
    { name: "Bitcoin", symbol: "BTC", amount: "0.15", value: "$6,487.50", change: "+5.2%" },
    { name: "Ethereum", symbol: "ETH", amount: "2.5", value: "$6,625.00", change: "+3.8%" },
    { name: "ArquiFi Token", symbol: "ARQ", amount: "1,250", value: "$1,250.00", change: "+12.4%" },
    { name: "USDC", symbol: "USDC", amount: "500", value: "$500.00", change: "0.0%" }
  ];

  return (
    <div className="p-8 animate-fadeInUp">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-white text-5xl font-bold mb-4 font-space-grotesk">
            Billetera Digital
          </h1>
          <p className="text-gray-300 text-xl">Gestiona tu portfolio DeFi</p>
        </div>
        
        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 animate-fadeInUp">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">💰</span>
              </div>
              <span className="text-green-400 text-sm font-semibold">+8.2%</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Valor Total</h3>
            <p className="text-green-400 text-3xl font-bold mb-2">$14,862.50</p>
            <p className="text-gray-400 text-sm">Últimas 24 horas</p>
          </div>
          
          <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">⚡</span>
              </div>
              <span className="text-yellow-400 text-sm font-semibold">8.5% APY</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Stacking Activo</h3>
            <p className="text-yellow-400 text-3xl font-bold mb-2">0.15 BTC</p>
            <p className="text-gray-400 text-sm">Generando recompensas</p>
          </div>
          
          <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">📈</span>
              </div>
              <span className="text-blue-400 text-sm font-semibold">Este mes</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Ganancias</h3>
            <p className="text-blue-400 text-3xl font-bold mb-2">$1,125.30</p>
            <p className="text-gray-400 text-sm">Rendimiento total</p>
          </div>
        </div>

        {/* Assets Table */}
        <div className="glass-card rounded-2xl p-8 mb-8 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">💎</span>
            </div>
            <h2 className="text-white text-2xl font-bold">Mis Activos</h2>
          </div>
          <div className="space-y-4">
            {assets.map((asset, index) => (
              <div key={index} className="glass rounded-xl p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg font-bold">{asset.symbol[0]}</span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">{asset.name}</p>
                      <p className="text-gray-400">{asset.symbol}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-white font-semibold text-lg">{asset.amount}</p>
                      <p className="text-gray-400 text-sm">Cantidad</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold text-lg">{asset.value}</p>
                      <p className="text-gray-400 text-sm">Valor</p>
                    </div>
                    <div className="text-center">
                      <p className="text-green-400 font-semibold text-lg">{asset.change}</p>
                      <p className="text-gray-400 text-sm">24h</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="gradient-primary hover:scale-110 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold">
                        Enviar
                      </button>
                      <button className="gradient-secondary hover:scale-110 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold">
                        Recibir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DeFi Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="text-white text-2xl font-bold">Stacking</h3>
            </div>
            <p className="text-gray-300 mb-6 text-lg">Stake tus BTC y gana recompensas automáticamente</p>
            <button className="gradient-accent hover:scale-110 text-white px-8 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg">
              Iniciar Stacking
            </button>
          </div>
          
          <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 animate-fadeInUp" style={{animationDelay: '0.5s'}}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">💎</span>
              </div>
              <h3 className="text-white text-2xl font-bold">Lending</h3>
            </div>
            <p className="text-gray-300 mb-6 text-lg">Presta tus activos y genera ingresos pasivos</p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-110 text-white px-8 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg">
              Prestar Activos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
