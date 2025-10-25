import React from 'react';

const Governance = () => {
  const proposals = [
    {
      id: 1,
      title: "Aumentar el APY del stacking de BTC al 10%",
      description: "Propuesta para incrementar la tasa de interés del stacking de Bitcoin para atraer más usuarios.",
      status: "Activa",
      votes: { for: 1250, against: 320 },
      deadline: "3 días restantes",
      category: "Económica"
    },
    {
      id: 2,
      title: "Implementar sistema de reputación mejorado",
      description: "Nueva mecánica de reputación que incluye más factores para calcular el RP de los usuarios.",
      status: "Activa",
      votes: { for: 890, against: 150 },
      deadline: "5 días restantes",
      category: "Técnica"
    },
    {
      id: 3,
      title: "Integración con nueva blockchain",
      description: "Propuesta para agregar soporte a Solana y sus tokens nativos.",
      status: "Pendiente",
      votes: { for: 0, against: 0 },
      deadline: "Votación próximamente",
      category: "Técnica"
    }
  ];

  return (
    <div className="p-8 animate-fadeInUp">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-white text-5xl font-bold mb-4 font-space-grotesk">
            Gobernanza DAO
          </h1>
          <p className="text-gray-300 text-xl">Participa en las decisiones de la comunidad</p>
        </div>
        
        {/* DAO Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 animate-fadeInUp">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🗳️</span>
              </div>
              <span className="text-blue-400 text-sm font-semibold">850 votos</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Mi Poder de Voto</h3>
            <p className="text-blue-400 text-3xl font-bold mb-2">850 votos</p>
            <p className="text-gray-400 text-sm">Basado en tu RP</p>
          </div>
          
          <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">📋</span>
              </div>
              <span className="text-green-400 text-sm font-semibold">2 activas</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Propuestas Activas</h3>
            <p className="text-green-400 text-3xl font-bold mb-2">2</p>
            <p className="text-gray-400 text-sm">En votación</p>
          </div>
          
          <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <span className="text-yellow-400 text-sm font-semibold">75%</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Participación</h3>
            <p className="text-yellow-400 text-3xl font-bold mb-2">75%</p>
            <p className="text-gray-400 text-sm">De las votaciones</p>
          </div>
          
          <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🏆</span>
              </div>
              <span className="text-purple-400 text-sm font-semibold">#42</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Ranking</h3>
            <p className="text-purple-400 text-3xl font-bold mb-2">#42</p>
            <p className="text-gray-400 text-sm">En la comunidad</p>
          </div>
        </div>

        {/* Proposals List */}
        <div className="space-y-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">📋</span>
            </div>
            <h2 className="text-white text-3xl font-bold">Propuestas en Votación</h2>
          </div>
          
          {proposals.map((proposal, index) => (
            <div key={proposal.id} className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 animate-fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <h3 className="text-white text-2xl font-bold">{proposal.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      proposal.status === 'Activa' 
                        ? 'gradient-secondary text-white' 
                        : 'gradient-accent text-white'
                    }`}>
                      {proposal.status}
                    </span>
                    <span className="gradient-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {proposal.category}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">{proposal.description}</p>
                  
                  {/* Voting Stats */}
                  <div className="flex items-center space-x-8 mb-6">
                    <div className="flex items-center space-x-3 glass rounded-xl px-4 py-3">
                      <span className="text-green-400 text-xl">✅</span>
                      <span className="text-white font-semibold">{proposal.votes.for} votos a favor</span>
                    </div>
                    <div className="flex items-center space-x-3 glass rounded-xl px-4 py-3">
                      <span className="text-red-400 text-xl">❌</span>
                      <span className="text-white font-semibold">{proposal.votes.against} votos en contra</span>
                    </div>
                    <div className="text-gray-400 font-semibold">{proposal.deadline}</div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full glass rounded-full h-3 mb-6">
                    <div 
                      className="gradient-secondary h-3 rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${(proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="gradient-secondary hover:scale-110 text-white px-8 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg">
                  Votar a Favor
                </button>
                <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:scale-110 text-white px-8 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg">
                  Votar en Contra
                </button>
                <button className="glass hover:scale-110 text-white px-8 py-3 rounded-xl transition-all duration-300 font-semibold">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Governance;
