import React, { useState, useEffect } from 'react';

const Governance = () => {
  const [proposals, setProposals] = useState([]);
  const [userAP, setUserAP] = useState(1000);
  const [userVotes, setUserVotes] = useState({});
  const [isVoting, setIsVoting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [voteChoice, setVoteChoice] = useState('');
  const [voteAmount, setVoteAmount] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Datos simulados de propuestas
  const mockProposals = [
    {
      id: 1,
      title: "Aumentar el APY del stacking de BTC al 10%",
      description: "Propuesta para incrementar la tasa de interés del stacking de Bitcoin para atraer más usuarios y mejorar la rentabilidad del ecosistema.",
      status: "Activa",
      votes: { for: 1250, against: 320 },
      deadline: "3 días restantes",
      category: "Económica",
      author: "DeFiCouncil",
      created: "5 días",
      totalVotes: 1570
    },
    {
      id: 2,
      title: "Implementar sistema de reputación mejorado",
      description: "Nueva mecánica de reputación que incluye más factores para calcular el RP de los usuarios, incluyendo participación en DAO y contribuciones comunitarias.",
      status: "Activa",
      votes: { for: 890, against: 150 },
      deadline: "5 días restantes",
      category: "Técnica",
      author: "TechCommittee",
      created: "7 días",
      totalVotes: 1040
    },
    {
      id: 3,
      title: "Integración con nueva blockchain",
      description: "Propuesta para agregar soporte a Solana y sus tokens nativos, expandiendo las opciones de DeFi disponibles en ArquiFi.",
      status: "Pendiente",
      votes: { for: 0, against: 0 },
      deadline: "Votación próximamente",
      category: "Técnica",
      author: "BlockchainTeam",
      created: "2 días",
      totalVotes: 0
    },
    {
      id: 4,
      title: "Reducir comisiones de transacción",
      description: "Propuesta para reducir las comisiones de transacción del 2% al 1.5% para hacer la plataforma más accesible.",
      status: "Aprobada",
      votes: { for: 2100, against: 400 },
      deadline: "Finalizada",
      category: "Económica",
      author: "FeeCommittee",
      created: "10 días",
      totalVotes: 2500
    }
  ];

  useEffect(() => {
    setProposals(mockProposals);
  }, []);

  const showNotificationWithMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const openVoteModal = (proposal) => {
    if (proposal.status !== 'Activa') {
      showNotificationWithMessage('Esta propuesta no está disponible para votar');
      return;
    }
    setSelectedProposal(proposal);
    setShowModal(true);
    setVoteChoice('');
    setVoteAmount('');
  };

  const executeVote = async () => {
    if (!voteChoice || !voteAmount || !selectedProposal) return;

    const apAmount = parseInt(voteAmount);
    if (apAmount > userAP) {
      showNotificationWithMessage('No tienes suficientes AP para esta votación');
      return;
    }

    setIsVoting(true);
    try {
      // Simular tiempo de votación
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Actualizar votos
      setProposals(prev => prev.map(proposal => {
        if (proposal.id === selectedProposal.id) {
          const newVotes = { ...proposal.votes };
          if (voteChoice === 'for') {
            newVotes.for += apAmount;
          } else {
            newVotes.against += apAmount;
          }
          return {
            ...proposal,
            votes: newVotes,
            totalVotes: proposal.totalVotes + apAmount
          };
        }
        return proposal;
      }));

      // Actualizar AP del usuario
      setUserAP(prev => prev - apAmount);
      
      // Registrar voto
      setUserVotes(prev => ({
        ...prev,
        [selectedProposal.id]: { choice: voteChoice, amount: apAmount }
      }));

      showNotificationWithMessage(`¡Voto registrado! Quemaste ${apAmount} AP`);
      setShowModal(false);
      setSelectedProposal(null);
      setVoteChoice('');
      setVoteAmount('');
    } catch (error) {
      console.error('Error votando:', error);
      showNotificationWithMessage('Error al registrar el voto');
    } finally {
      setIsVoting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activa': return 'text-green-400 bg-green-400/20';
      case 'Pendiente': return 'text-yellow-400 bg-yellow-400/20';
      case 'Aprobada': return 'text-blue-400 bg-blue-400/20';
      case 'Rechazada': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Económica': return 'text-green-400';
      case 'Técnica': return 'text-blue-400';
      case 'Social': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#121012] text-white pt-20">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Gobernanza DAO</h1>
        
        {/* Estadísticas del usuario */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a]">
            <h3 className="text-gray-400 text-sm mb-2">Tus AP Disponibles</h3>
            <p className="text-3xl font-bold text-white">{userAP.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Para votar en propuestas</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a]">
            <h3 className="text-gray-400 text-sm mb-2">Votos Realizados</h3>
            <p className="text-3xl font-bold text-white">{Object.keys(userVotes).length}</p>
            <p className="text-sm text-gray-400">Propuestas votadas</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a]">
            <h3 className="text-gray-400 text-sm mb-2">Poder de Voto</h3>
            <p className="text-3xl font-bold text-white">{userAP}</p>
            <p className="text-sm text-gray-400">AP quemados al votar</p>
          </div>
        </div>

        {/* Lista de propuestas */}
        <div className="space-y-6">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a] hover:border-[#0099ff]/30 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{proposal.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                    <span className={`text-sm font-medium ${getCategoryColor(proposal.category)}`}>
                      {proposal.category}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{proposal.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Por: {proposal.author}</span>
                    <span>•</span>
                    <span>Creada: {proposal.created}</span>
                    <span>•</span>
                    <span>{proposal.deadline}</span>
                  </div>
                </div>
              </div>

              {/* Barra de votos */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Resultados de votación</span>
                  <span className="text-sm text-white font-semibold">{proposal.totalVotes} votos totales</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="flex h-full rounded-full overflow-hidden">
                    <div 
                      className="bg-green-500 h-full transition-all duration-500"
                      style={{ width: `${(proposal.votes.for / proposal.totalVotes) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-red-500 h-full transition-all duration-500"
                      style={{ width: `${(proposal.votes.against / proposal.totalVotes) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-400">{proposal.votes.for} a favor</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-red-400">{proposal.votes.against} en contra</span>
                  </div>
                </div>
              </div>

              {/* Botón de votar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {userVotes[proposal.id] && (
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span className="text-sm text-green-400">
                        Ya votaste ({userVotes[proposal.id].choice === 'for' ? 'A favor' : 'En contra'}) - {userVotes[proposal.id].amount} AP
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => openVoteModal(proposal)}
                  disabled={proposal.status !== 'Activa' || userVotes[proposal.id]}
                  className="bg-[#0099ff] text-white px-6 py-3 rounded-lg hover:bg-[#0088ee] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {userVotes[proposal.id] ? 'Ya Votaste' : 'Votar'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de votación */}
        {showModal && selectedProposal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-8 max-w-md w-full mx-4 animate-bounce-in border border-[#27323a]">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Votar en Propuesta</h3>
                <p className="text-gray-400">{selectedProposal.title}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Tu voto
                  </label>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setVoteChoice('for')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                        voteChoice === 'for'
                          ? 'border-green-500 bg-green-500/20 text-green-400'
                          : 'border-gray-600 text-gray-400 hover:border-green-500'
                      }`}
                    >
                      A Favor
                    </button>
                    <button
                      onClick={() => setVoteChoice('against')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                        voteChoice === 'against'
                          ? 'border-red-500 bg-red-500/20 text-red-400'
                          : 'border-gray-600 text-gray-400 hover:border-red-500'
                      }`}
                    >
                      En Contra
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Cantidad de AP a quemar (mín: 1, máx: {userAP})
                  </label>
                  <input
                    type="number"
                    value={voteAmount}
                    onChange={(e) => setVoteAmount(e.target.value)}
                    min="1"
                    max={userAP}
                    className="w-full bg-[#27323a] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                  />
                </div>

                {voteAmount && (
                  <div className="bg-[#27323a] rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">AP a quemar</span>
                      <span className="text-white font-semibold">{voteAmount} AP</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-400">AP restantes</span>
                      <span className="text-white font-semibold">{userAP - parseInt(voteAmount || 0)} AP</span>
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
                  onClick={executeVote}
                  disabled={!voteChoice || !voteAmount || isVoting}
                  className="flex-1 bg-[#0099ff] text-white px-4 py-3 rounded-lg hover:bg-[#0088ee] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isVoting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Votando...</span>
                    </>
                  ) : (
                    <span>Confirmar Voto</span>
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

export default Governance;