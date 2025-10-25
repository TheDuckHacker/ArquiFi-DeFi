import React, { useState, useEffect } from 'react';
import { userState } from '../utils/userState';

const ArquiBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mensaje de bienvenida
    setMessages([
      {
        role: 'bot',
        content: '¡Hola! Soy ArquiBot, tu asistente IA en ArquiFi. ¿En qué puedo ayudarte hoy?'
      }
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      // Simular respuesta del bot
      const response = getBotResponse(userMessage);
      
      // Agregar respuesta del bot
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'Lo siento, hubo un error. Inténtalo de nuevo.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getRecommendations = async () => {
    setIsLoading(true);
    try {
      const userContext = userState.getState();
      const recommendations = getPersonalizedRecommendations(userContext);
      
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: recommendations 
      }]);
    } catch (error) {
      console.error('Error obteniendo recomendaciones:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-primary rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center z-40"
        >
          <span className="material-symbols-outlined text-white text-2xl">smart_toy</span>
        </button>
      )}

      {/* Chat popup */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-96 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">smart_toy</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">ArquiBot</h3>
                <p className="text-gray-400 text-xs">Tu asistente IA</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
            
            {/* Botón de recomendaciones */}
            <button
              onClick={getRecommendations}
              className="mt-2 w-full bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
              disabled={isLoading}
            >
              <span className="material-symbols-outlined text-sm mr-2">lightbulb</span>
              Obtener recomendaciones
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Funciones de respuesta del bot (simuladas)
const getBotResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hola') || lowerMessage.includes('hi')) {
    return '¡Hola! Soy ArquiBot, tu asistente en ArquiFi. ¿En qué puedo ayudarte?';
  }
  
  if (lowerMessage.includes('arquipuntos') || lowerMessage.includes('ap')) {
    return 'Los Arquipuntos (AP) son la moneda interna de ArquiFi. Se ganan jugando, completando misiones y participando. Se queman al usarse para votaciones o acceder a contenido premium.';
  }
  
  if (lowerMessage.includes('reputación') || lowerMessage.includes('rp')) {
    return 'La Reputación (RP) se acumula con el tiempo y no se quema. Mejora tu perfil y desbloquea acceso a misiones premium. Se gana por actividad constante en la plataforma.';
  }
  
  if (lowerMessage.includes('stacking') || lowerMessage.includes('stx')) {
    return 'El stacking es el proceso de bloquear STX para ganar recompensas. En ArquiFi puedes hacer stacking directamente desde la billetera. ¡Es una excelente forma de ganar AP!';
  }
  
  if (lowerMessage.includes('dao') || lowerMessage.includes('votación')) {
    return 'El DAO de ArquiFi permite votar en propuestas importantes. Cada voto quema AP, validando tu compromiso. Las propuestas pueden cambiar el futuro de la plataforma.';
  }
  
  if (lowerMessage.includes('misiones') || lowerMessage.includes('juegos')) {
    return 'Las misiones son actividades que te permiten ganar AP y RP. Hay misiones gratuitas, de pago y premium. ¡Completa misiones para subir de nivel!';
  }
  
  if (lowerMessage.includes('ayuda') || lowerMessage.includes('help')) {
    return 'Puedo ayudarte con:\n• Explicar Arquipuntos y Reputación\n• Guiarte en stacking\n• Información sobre DAO y votaciones\n• Recomendaciones de misiones\n• Conceptos de DeFi y Web3';
  }
  
  return 'Interesante pregunta. En ArquiFi, puedes ganar AP completando misiones, participar en el DAO para votar propuestas, y hacer stacking de STX. ¿Hay algo específico que te gustaría saber?';
};

const getPersonalizedRecommendations = (userContext) => {
  const { ap, rp, level } = userContext;
  
  if (level === 'Novato') {
    return `Como ${level}, te recomiendo:\n• Completar la misión "Primer Stacking" (+100 AP)\n• Explorar el feed social para conectar\n• Leer tutoriales en la sección Educación\n• Participar en votaciones DAO para quemar AP`;
  }
  
  if (level === 'Explorador') {
    return `Como ${level}, puedes:\n• Acceder a misiones de pago\n• Participar en juegos premium\n• Crear propuestas DAO\n• Conectar con otros usuarios avanzados`;
  }
  
  if (level === 'Arquitecto') {
    return `Como ${level}, tienes acceso a:\n• Misiones exclusivas de alto nivel\n• Funciones avanzadas de gobernanza\n• Crear contenido educativo\n• Mentoría de usuarios nuevos`;
  }
  
  if (level === 'Visionario') {
    return `¡Felicidades ${level}! Eres un líder en ArquiFi:\n• Acceso completo a todas las funciones\n• Crear misiones para la comunidad\n• Influir en decisiones importantes\n• Representar a ArquiFi en eventos`;
  }
  
  return 'Basándome en tu perfil, te recomiendo explorar las diferentes secciones de ArquiFi para maximizar tu experiencia.';
};

export default ArquiBot;
