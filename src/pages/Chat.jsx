import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Datos simulados de contactos
  const mockContacts = [
    {
      id: 1,
      name: "SatoshiN",
      avatar: "S",
      status: "online",
      lastMessage: "Acabo de completar mi primer stacking en ArquiFi. ¡La experiencia es increíble! 🚀",
      timestamp: "2 min",
      unread: 2,
      rp: 850,
      level: "Visionario"
    },
    {
      id: 2,
      name: "DeFiMaster",
      avatar: "D",
      status: "online",
      lastMessage: "Nuevo tutorial sobre yield farming disponible. Link en bio 👋",
      timestamp: "5 min",
      unread: 0,
      rp: 1200,
      level: "Experto"
    },
    {
      id: 3,
      name: "CryptoNewbie",
      avatar: "C",
      status: "away",
      lastMessage: "¿Alguien puede explicarme qué es el stacking?",
      timestamp: "1 hora",
      unread: 1,
      rp: 300,
      level: "Novato"
    },
    {
      id: 4,
      name: "ArquiFi_Support",
      avatar: "A",
      status: "online",
      lastMessage: "¡Bienvenido a ArquiFi! ¿En qué puedo ayudarte?",
      timestamp: "3 horas",
      unread: 0,
      rp: 2000,
      level: "Soporte"
    }
  ];

  useEffect(() => {
    setContacts(mockContacts);
  }, []);

  const showNotificationWithMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const selectContact = (contact) => {
    setActiveContact(contact);
    setMessages([
      {
        id: 1,
        text: `¡Hola! Soy ${contact.name}. ¿En qué puedo ayudarte?`,
        sender: contact.id,
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        isRead: true
      },
      {
        id: 2,
        text: "¡Hola! Me alegra verte aquí en ArquiFi. ¿Cómo va tu experiencia con la plataforma?",
        sender: 'me',
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        isRead: true
      },
      {
        id: 3,
        text: contact.lastMessage,
        sender: contact.id,
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
        isRead: false
      }
    ]);
    
    // Marcar como leído
    setContacts(prev => prev.map(c => 
      c.id === contact.id ? { ...c, unread: 0 } : c
    ));
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeContact) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date(),
      isRead: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    showNotificationWithMessage('Mensaje enviado');

    // Simular respuesta automática
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "¡Interesante! ¿Podrías contarme más?",
        "Entiendo perfectamente. ¿Has probado el stacking?",
        "Excelente pregunta. En ArquiFi puedes ganar AP de varias formas.",
        "¡Genial! Me alegra que estés disfrutando la plataforma.",
        "¿Te gustaría que te explique algo específico sobre DeFi?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: randomResponse,
        sender: activeContact.id,
        timestamp: new Date(),
        isRead: true
      }]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#121012] text-white">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Chat</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Lista de contactos */}
          <div className="bg-[#1a1a1a] rounded-xl border border-[#27323a] overflow-hidden">
            <div className="p-4 border-b border-[#27323a]">
              <h2 className="text-lg font-semibold">Contactos</h2>
            </div>
            <div className="overflow-y-auto h-full">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => selectContact(contact)}
                  className={`p-4 border-b border-[#27323a] cursor-pointer hover:bg-[#27323a] transition-colors ${
                    activeContact?.id === contact.id ? 'bg-[#27323a]' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-[#0099ff] rounded-full flex items-center justify-center text-white font-bold">
                        {contact.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#1a1a1a] ${
                        contact.status === 'online' ? 'bg-green-500' : 
                        contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white truncate">{contact.name}</h3>
                        <span className="text-xs text-gray-400">{contact.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-green-400">{contact.level}</span>
                        <span className="text-xs text-gray-400">{contact.rp} RP</span>
                      </div>
                      <p className="text-sm text-gray-300 truncate mt-1">{contact.lastMessage}</p>
                      {contact.unread > 0 && (
                        <div className="flex justify-end mt-1">
                          <span className="bg-[#0099ff] text-white text-xs px-2 py-1 rounded-full">
                            {contact.unread}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Área de chat */}
          <div className="lg:col-span-2 bg-[#1a1a1a] rounded-xl border border-[#27323a] flex flex-col">
            {activeContact ? (
              <>
                {/* Header del chat */}
                <div className="p-4 border-b border-[#27323a] flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#0099ff] rounded-full flex items-center justify-center text-white font-bold">
                    {activeContact.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{activeContact.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-green-400">{activeContact.level}</span>
                      <span className="text-xs text-gray-400">{activeContact.rp} RP</span>
                      <div className={`w-2 h-2 rounded-full ${
                        activeContact.status === 'online' ? 'bg-green-500' : 
                        activeContact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                  </div>
                </div>

                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.sender === 'me'
                            ? 'bg-[#0099ff] text-white'
                            : 'bg-[#27323a] text-gray-100'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Indicador de "escribiendo" */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-[#27323a] text-gray-100 px-4 py-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="text-sm text-gray-400">{activeContact.name} está escribiendo...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input de mensaje */}
                <div className="p-4 border-t border-[#27323a]">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Escribe un mensaje..."
                      className="flex-1 bg-[#27323a] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-[#0099ff] text-white px-6 py-2 rounded-lg hover:bg-[#0088ee] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#27323a] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Selecciona un contacto</h3>
                  <p className="text-gray-400">Elige un contacto de la lista para comenzar a chatear</p>
                </div>
              </div>
            )}
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
    </div>
  );
};

export default Chat;