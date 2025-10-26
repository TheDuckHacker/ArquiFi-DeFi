import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendMessageToArquiBot, getPageHelp, getAPStrategies, explainConcept } from '../config/groq';

const ArquiBotFloating = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: '¡Hola! Soy ArquiBot 🤖 ¿En qué puedo ayudarte?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const location = useLocation();
  const messagesEndRef = useRef(null);

  // Auto-scroll al final cuando hay nuevos mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // No mostrar en la página de configuraciones
  if (location.pathname === '/settings') {
    return null;
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Agregar mensaje del usuario
    const userMessage = {
      role: 'user',
      content: inputMessage
    };
    setMessages(prev => [...prev, userMessage]);

    // Obtener contexto del usuario
    const userContext = {
      ap: 1000,
      rp: 850,
      level: 'Intermedio',
      currentPage: location.pathname,
      walletConnected: true,
      stxBalance: '1.5'
    };

    // Simular escritura del bot
    setIsTyping(true);
    
    try {
      console.log('🤖 Intentando usar API de Groq...');
      console.log('📝 Mensaje:', inputMessage);
      console.log('👤 Contexto:', userContext);
      const botResponse = await sendMessageToArquiBot(inputMessage, userContext, messages);
      console.log('✅ Respuesta de Groq recibida:', botResponse);
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error('❌ Error con ArquiBot:', error);
      console.error('❌ Error completo:', error.message);
      console.log('🔄 Usando fallback...');
      const fallbackResponse = getBotResponse(inputMessage);
      setMessages(prev => [...prev, { role: 'bot', content: fallbackResponse }]);
    } finally {
      setIsTyping(false);
    }

    setInputMessage('');
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'bot',
        content: '¡Chat borrado! 🤖 ¿En qué más puedo ayudarte?'
      }
    ]);
  };

  const handleQuickAction = async (message) => {
    setInputMessage(message);
    const fakeEvent = { preventDefault: () => {} };
    await handleSendMessage(fakeEvent);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('hi')) {
      return '¡Hola! Soy ArquiBot 🤖 Puedo ayudarte con ArquiFi, juegos, transferencias y más. ¿Qué necesitas?';
    }
    
    if (lowerMessage.includes('arquipuntos') || lowerMessage.includes('ap')) {
      return 'Los AP son la moneda de ArquiFi. Los ganas jugando, completando misiones y participando. Se queman al votar en el DAO.';
    }
    
    if (lowerMessage.includes('stacking') || lowerMessage.includes('stx')) {
      return 'El staking te permite bloquear STX para ganar recompensas. Hazlo desde la billetera y gana AP. 🎁';
    }
    
    if (lowerMessage.includes('dao') || lowerMessage.includes('votar')) {
      return 'El DAO permite votar en propuestas importantes. Cada voto quema AP. ¡Tu voz cuenta! 🗳️';
    }
    
    if (lowerMessage.includes('juegos')) {
      return 'En Juegos puedes: jugar minijuegos, competir en rankings y ganar AP. ¡Diviértete ganando! 🎮';
    }
    
    if (lowerMessage.includes('educacion') || lowerMessage.includes('educación')) {
      return 'La Educación Layer tiene misiones de aprendizaje, tutoriales y cursos. ¡Aprende y gana AP sin invertir! 📚';
    }
    
    if (lowerMessage.includes('ayuda') || lowerMessage.includes('help')) {
      return 'Puedo ayudarte con: páginas, juegos, transferencias, AP, DeFi y Web3. ¿Qué tema te interesa?';
    }
    
    if (lowerMessage.includes('transferencia') || lowerMessage.includes('transferir')) {
      return 'Ve a Wallet → Selecciona activo → Ingresa dirección → Confirma. Verifica tu balance antes de enviar. 💸';
    }
    
    if (lowerMessage.includes('quien te creo') || lowerMessage.includes('quien te creó')) {
      return 'Fui creado por ArquiSoft, el equipo detrás de ArquiFi. 🚀';
    }
    
    if (lowerMessage.includes('gracias') || lowerMessage.includes('thanks')) {
      return '¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?';
    }
    
    return 'Puedes ganar AP con misiones, votar en el DAO y hacer staking. ¿Necesitas ayuda con algo específico?';
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#0099ff] rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center z-40"
        title="ArquiBot - Asistente IA"
      >
        {/* Icono del robot */}
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.9,1 3,1.9 3,3V21C3,22.1 3.9,23 5,23H19C20.1,23 21,22.1 21,21V9M19,9H14V4H5V21H19V9Z"/>
        </svg>
      </button>

      {/* Ventana de chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-[#1a1a1a] rounded-lg shadow-xl border border-[#27323a] z-50 flex flex-col" style={{height: '500px', maxHeight: '500px'}}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#27323a] flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#0099ff] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.9,1 3,1.9 3,3V21C3,22.1 3.9,23 5,23H19C20.1,23 21,22.1 21,21V9M19,9H14V4H5V21H19V9Z"/>
                </svg>
              </div>
              <h3 className="text-white font-semibold">ArquiBot</h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">IA Activa</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Botón de borrar chat */}
              <button
                onClick={clearChat}
                className="text-gray-400 hover:text-red-400 transition-colors"
                title="Borrar chat"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
              
              {/* Botón de cerrar */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                title="Cerrar chat"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Mensajes */}
          <div className="overflow-y-auto p-4 space-y-4 arquibot-chat" style={{height: 'calc(500px - 200px)', minHeight: '300px'}}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-[#0099ff] text-white'
                      : 'bg-[#27323a] text-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
                    <span className="text-sm text-gray-400">Escribiendo...</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Referencia para auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Botones de acción rápida */}
          <div className="px-4 py-2 border-t border-[#27323a] flex-shrink-0">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickAction('¿Qué puedo hacer aquí?')}
                className="text-xs bg-[#27323a] text-gray-300 px-2 py-1 rounded hover:bg-[#0099ff] hover:text-white transition-colors"
              >
                Ayuda
              </button>
              <button
                onClick={() => handleQuickAction('¿Cómo ganar más AP?')}
                className="text-xs bg-[#27323a] text-gray-300 px-2 py-1 rounded hover:bg-[#0099ff] hover:text-white transition-colors"
              >
                Ganar AP
              </button>
              <button
                onClick={() => handleQuickAction('¿Qué es el staking?')}
                className="text-xs bg-[#27323a] text-gray-300 px-2 py-1 rounded hover:bg-[#0099ff] hover:text-white transition-colors"
              >
                Staking
              </button>
              <button
                onClick={() => handleQuickAction('¿Cómo funciona el DAO?')}
                className="text-xs bg-[#27323a] text-gray-300 px-2 py-1 rounded hover:bg-[#0099ff] hover:text-white transition-colors"
              >
                DAO
              </button>
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[#27323a] flex-shrink-0">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-[#27323a] text-white px-3 py-2 rounded-lg border border-[#27323a] focus:border-[#0099ff] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#0099ff] text-white px-4 py-2 rounded-lg hover:bg-[#0088ee] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ArquiBotFloating;
