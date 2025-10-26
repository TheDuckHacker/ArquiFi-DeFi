import React, { useState, useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'accepted', 'declined'
  const [processingAction, setProcessingAction] = useState(null); // 'accept' o 'decline' + requestId
  const [removingRequest, setRemovingRequest] = useState(null); // ID de solicitud que se está removiendo
  const { updateFriendRequests } = useNotifications();

  // Datos simulados de solicitudes de amistad
  const mockRequests = [
    {
      id: 1,
      user: {
        name: "CryptoTrader",
        avatar: "C",
        rp: 1800,
        level: "Experto",
        mutualFriends: 5
      },
      message: "¡Hola! Me gustaría conectar contigo en ArquiFi",
      timestamp: "2 horas",
      status: "pending"
    },
    {
      id: 2,
      user: {
        name: "DeFiExplorer",
        avatar: "D",
        rp: 2200,
        level: "Maestro",
        mutualFriends: 12
      },
      message: "Veo que también te interesa el DeFi. ¡Conectemos!",
      timestamp: "5 horas",
      status: "pending"
    },
    {
      id: 3,
      user: {
        name: "BlockchainDev",
        avatar: "B",
        rp: 1500,
        level: "Experto",
        mutualFriends: 3
      },
      message: "¿Te interesa colaborar en proyectos blockchain?",
      timestamp: "1 día",
      status: "pending"
    },
    {
      id: 4,
      user: {
        name: "NFTCollector",
        avatar: "N",
        rp: 900,
        level: "Intermedio",
        mutualFriends: 8
      },
      message: "¡Tu colección de NFTs es increíble!",
      timestamp: "2 días",
      status: "pending"
    }
  ];

  useEffect(() => {
    setFriendRequests(mockRequests);
    // Inicializar contador con el número de solicitudes pendientes
    const pendingCount = mockRequests.filter(req => req.status === "pending").length;
    updateFriendRequests(pendingCount);
  }, [updateFriendRequests]);

  const showNotificationWithMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const acceptRequest = async (requestId) => {
    // Mostrar loading solo para este botón específico
    setProcessingAction(`accept-${requestId}`);
    
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const requestName = friendRequests.find(r => r.id === requestId)?.user.name;
    
    setFriendRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        showNotificationWithMessage(`✅ Solicitud aceptada de ${request.user.name}`);
        // Actualizar contador de notificaciones
        const pendingCount = prev.filter(r => r.status === "pending" && r.id !== requestId).length;
        updateFriendRequests(pendingCount);
        return { ...request, status: "accepted" };
      }
      return request;
    }));
    
    // Quitar loading y remover de la vista
    setProcessingAction(null);
    setRemovingRequest(requestId);
    
    // Efecto visual adicional
    setTimeout(() => {
      showNotificationWithMessage(`🎉 ¡Ahora eres amigo de ${requestName}!`);
      setRemovingRequest(null);
    }, 1000);
  };

  const declineRequest = async (requestId) => {
    // Mostrar loading solo para este botón específico
    setProcessingAction(`decline-${requestId}`);
    
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const requestName = friendRequests.find(r => r.id === requestId)?.user.name;
    
    setFriendRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        showNotificationWithMessage(`❌ Solicitud rechazada de ${request.user.name}`);
        // Actualizar contador de notificaciones
        const pendingCount = prev.filter(r => r.status === "pending" && r.id !== requestId).length;
        updateFriendRequests(pendingCount);
        return { ...request, status: "declined" };
      }
      return request;
    }));
    
    // Quitar loading y remover de la vista
    setProcessingAction(null);
    setRemovingRequest(requestId);
    
    // Efecto visual adicional
    setTimeout(() => {
      showNotificationWithMessage(`👋 Solicitud de ${requestName} rechazada`);
      setRemovingRequest(null);
    }, 1000);
  };

  const pendingRequests = friendRequests.filter(req => req.status === "pending" && req.id !== removingRequest);
  const acceptedRequests = friendRequests.filter(req => req.status === "accepted");
  const declinedRequests = friendRequests.filter(req => req.status === "declined");

  return (
    <div className="min-h-screen bg-[#121012] text-white pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Solicitudes de Amistad</h1>
        
        {/* Pestañas */}
        <div className="flex space-x-4 mb-8">
          <button 
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === 'pending' 
                ? 'bg-[#0099ff] text-white shadow-lg shadow-[#0099ff]/25' 
                : 'bg-[#27323a] text-gray-300 hover:bg-[#3a3a3a]'
            }`}
          >
            Pendientes ({pendingRequests.length})
          </button>
          <button 
            onClick={() => setActiveTab('accepted')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === 'accepted' 
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/25' 
                : 'bg-[#27323a] text-gray-300 hover:bg-[#3a3a3a]'
            }`}
          >
            Aceptadas ({acceptedRequests.length})
          </button>
          <button 
            onClick={() => setActiveTab('declined')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === 'declined' 
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/25' 
                : 'bg-[#27323a] text-gray-300 hover:bg-[#3a3a3a]'
            }`}
          >
            Rechazadas ({declinedRequests.length})
          </button>
        </div>

        {/* Lista de solicitudes según pestaña activa */}
        <div className="space-y-6">
          {(() => {
            const currentRequests = activeTab === 'pending' ? pendingRequests : 
                                  activeTab === 'accepted' ? acceptedRequests : declinedRequests;
            
            if (currentRequests.length === 0) {
              return (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-[#27323a] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">
                    {activeTab === 'pending' && 'No hay solicitudes pendientes'}
                    {activeTab === 'accepted' && 'No hay solicitudes aceptadas'}
                    {activeTab === 'declined' && 'No hay solicitudes rechazadas'}
                  </h3>
                  <p className="text-gray-400">
                    {activeTab === 'pending' && 'Las nuevas solicitudes de amistad aparecerán aquí'}
                    {activeTab === 'accepted' && 'Las solicitudes que aceptes aparecerán aquí'}
                    {activeTab === 'declined' && 'Las solicitudes que rechaces aparecerán aquí'}
                  </p>
                </div>
              );
            }

            return currentRequests.map((request) => (
              <div 
                key={request.id} 
                className={`bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a] hover:border-[#0099ff]/30 transition-all duration-200 ${
                  removingRequest === request.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                    request.user.avatar === 'C' ? 'bg-gradient-to-br from-[#0099ff] to-[#00ff88]' :
                    request.user.avatar === 'D' ? 'bg-gradient-to-br from-[#ff6b6b] to-[#ffa500]' :
                    request.user.avatar === 'B' ? 'bg-gradient-to-br from-[#ff9800] to-[#ffc107]' :
                    request.user.avatar === 'N' ? 'bg-gradient-to-br from-[#4caf50] to-[#8bc34a]' :
                    'bg-gradient-to-br from-[#0099ff] to-[#00ff88]'
                  }`}>
                    {request.user.avatar}
                  </div>
                  
                  {/* Información del usuario */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{request.user.name}</h3>
                      <span className="text-sm text-green-400">{request.user.level}</span>
                      <span className="text-sm text-gray-400">{request.user.rp} RP</span>
                    </div>
                    
                    <p className="text-gray-300 mb-3">{request.message}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>📅 {request.timestamp}</span>
                      <span>👥 {request.user.mutualFriends} amigos en común</span>
                    </div>
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="flex space-x-3">
                    {activeTab === 'pending' ? (
                      <>
                        <button
                          onClick={() => acceptRequest(request.id)}
                          disabled={processingAction !== null}
                          className={`px-6 py-3 rounded-xl transition-all duration-200 shadow-lg flex items-center space-x-2 ${
                            processingAction === `accept-${request.id}`
                              ? 'bg-gray-500 cursor-not-allowed'
                              : processingAction !== null
                              ? 'bg-gray-400 cursor-not-allowed opacity-50'
                              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-green-500/25'
                          }`}
                        >
                          {processingAction === `accept-${request.id}` ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Procesando...</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                              <span>Aceptar</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => declineRequest(request.id)}
                          disabled={processingAction !== null}
                          className={`px-6 py-3 rounded-xl transition-all duration-200 shadow-lg flex items-center space-x-2 ${
                            processingAction === `decline-${request.id}`
                              ? 'bg-gray-500 cursor-not-allowed'
                              : processingAction !== null
                              ? 'bg-gray-400 cursor-not-allowed opacity-50'
                              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-red-500/25'
                          }`}
                        >
                          {processingAction === `decline-${request.id}` ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Procesando...</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                              </svg>
                              <span>Rechazar</span>
                            </>
                          )}
                        </button>
                      </>
                    ) : activeTab === 'accepted' ? (
                      <div className="flex items-center space-x-2 text-green-400">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        <span className="font-semibold">Amigos</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-red-400">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                        <span className="font-semibold">Rechazado</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          })()}
        </div>

        {/* Botón para generar nuevas solicitudes de prueba */}
        {activeTab === 'pending' && pendingRequests.length === 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                const newRequest = {
                  id: Date.now(),
                  user: {
                    name: `Usuario${Math.floor(Math.random() * 1000)}`,
                    avatar: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
                    rp: Math.floor(Math.random() * 2000) + 500,
                    level: ["Novato", "Intermedio", "Experto", "Maestro"][Math.floor(Math.random() * 4)],
                    mutualFriends: Math.floor(Math.random() * 10)
                  },
                  message: "¡Hola! Me gustaría conectar contigo en ArquiFi",
                  timestamp: "ahora",
                  status: "pending"
                };
                setFriendRequests(prev => [newRequest, ...prev]);
                updateFriendRequests(prev => prev + 1);
                showNotificationWithMessage(`🔔 Nueva solicitud de ${newRequest.user.name}`);
              }}
              className="bg-gradient-to-r from-[#0099ff] to-[#00ff88] text-white px-6 py-3 rounded-xl hover:from-[#0088ee] hover:to-[#00ee77] transition-all duration-200 shadow-lg hover:shadow-[#0099ff]/25 flex items-center space-x-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              <span>Generar Solicitud de Prueba</span>
            </button>
          </div>
        )}

        {/* Notificación flotante */}
        {showNotification && (
          <div className="fixed top-4 right-4 bg-[#0099ff] text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-slide-in border border-[#0099ff]/30">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <div>
                <span className="font-semibold text-sm">{notificationMessage}</span>
                <div className="text-xs text-white/80">ArquiFi</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendRequests;
