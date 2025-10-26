import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { sendMessageToArquiBot } from '../config/groq';

const ArquiBotFloating = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: '¡Hola! Soy ArquiBot, tu asistente IA de ArquiFi creado por ArquiSoft. Te ayudo con las páginas, juegos, transferencias y todo lo relacionado con ArquiFi. ¿En qué puedo ayudarte hoy?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const location = useLocation();

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
      currentPage: location.pathname
    };

    // Simular escritura del bot
    setIsTyping(true);
    
    // Por ahora usar solo respuestas predefinidas para evitar problemas con la API
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Simular tiempo de respuesta variable
    
    // TODO: Re-activar API de Groq cuando esté funcionando
    // try {
    //   const botResponse = await sendMessageToArquiBot(inputMessage, userContext);
    //   setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    // } catch (error) {
    //   console.error('Error con ArquiBot:', error);
    //   const fallbackResponse = getBotResponse(inputMessage);
    //   setMessages(prev => [...prev, { role: 'bot', content: fallbackResponse }]);
    // }

    setInputMessage('');
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'bot',
        content: '¡Chat borrado! Soy ArquiBot, tu asistente IA de ArquiFi creado por ArquiSoft. ¿En qué puedo ayudarte ahora?'
      }
    ]);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('hi')) {
      return '¡Hola! Soy ArquiBot, tu asistente IA de ArquiFi creado por ArquiSoft. Te ayudo con las páginas, juegos, transferencias y todo lo relacionado con ArquiFi. ¿En qué puedo ayudarte?';
    }
    
    if (lowerMessage.includes('como estas') || lowerMessage.includes('cómo estás')) {
      return '¡Muy bien, gracias! Estoy aquí para ayudarte con todo lo relacionado con ArquiFi. ¿Hay algo específico en lo que pueda asistirte?';
    }
    
    if (lowerMessage.includes('quien te creo') || lowerMessage.includes('quien te creó')) {
      return 'Fui creado por ArquiSoft, el grupo desarrollador de ArquiFi. ArquiSoft es responsable de toda la plataforma ArquiFi.';
    }
    
    if (lowerMessage.includes('arquifi') && (lowerMessage.includes('creado') || lowerMessage.includes('creó'))) {
      return 'ArquiFi fue creado por el grupo ArquiSoft. Es una plataforma DeFi completa con Arquipuntos, juegos, educación y más.';
    }
    
    if (lowerMessage.includes('arquipuntos') || lowerMessage.includes('ap')) {
      return 'Los Arquipuntos (AP) son la moneda interna de ArquiFi. Se ganan jugando, completando misiones y participando. Se queman al usarse para votaciones o acceder a contenido premium.';
    }
    
    if (lowerMessage.includes('stacking') || lowerMessage.includes('stx')) {
      return 'El stacking es el proceso de bloquear STX para ganar recompensas. En ArquiFi puedes hacer stacking directamente desde la billetera. ¡Es una excelente forma de ganar AP!';
    }
    
    if (lowerMessage.includes('dao') || lowerMessage.includes('votar')) {
      return 'El DAO de ArquiFi permite votar en propuestas importantes. Cada voto quema AP, validando tu compromiso. Las propuestas pueden cambiar el futuro de la plataforma.';
    }
    
    if (lowerMessage.includes('misiones') || lowerMessage.includes('mision')) {
      return 'Las misiones son actividades que te permiten ganar AP y RP. Hay misiones gratuitas, de pago y premium. ¡Completa misiones para subir de nivel!';
    }
    
    if (lowerMessage.includes('transferencia') || lowerMessage.includes('transferir')) {
      return 'Para hacer transferencias en ArquiFi:\n1. Ve a la sección Wallet\n2. Selecciona el activo que quieres enviar\n3. Ingresa la dirección de destino\n4. Confirma la transacción\nSi tienes problemas, verifica que tengas suficiente balance y que la dirección sea correcta.';
    }
    
    if (lowerMessage.includes('juegos')) {
      return 'En la sección Juegos puedes:\n• Jugar minijuegos para ganar AP\n• Competir en leaderboards\n• Completar desafíos\n• Ganar reputación\n¡Los juegos son una forma divertida de ganar Arquipuntos!';
    }
    
    if (lowerMessage.includes('educacion') || lowerMessage.includes('educación')) {
      return 'La Educación Layer de ArquiFi incluye:\n• Misiones de aprendizaje que otorgan AP\n• Tutoriales sobre DeFi y Web3\n• Cursos interactivos\n• Certificaciones\n¡Puedes participar y ganar reputación sin invertir un solo dólar!';
    }
    
    if (lowerMessage.includes('ayuda') || lowerMessage.includes('help')) {
      return 'Puedo ayudarte con:\n• Explicar las páginas de ArquiFi\n• Guiarte en juegos y misiones\n• Ayudar con transferencias\n• Información sobre Arquipuntos\n• Conceptos de DeFi y Web3\n• Resolver problemas técnicos\n\n¿Sobre qué tema específico necesitas ayuda?';
    }
    
    if (lowerMessage.includes('que haces') || lowerMessage.includes('qué haces')) {
      return 'Soy ArquiBot, tu asistente IA en ArquiFi. Mi función es ayudarte a:\n• Navegar por la plataforma\n• Entender los juegos y misiones\n• Realizar transferencias\n• Aprender sobre DeFi y Web3\n• Resolver dudas sobre ArquiFi\n\n¿En qué puedo ayudarte específicamente?';
    }
    
    if (lowerMessage.includes('gracias') || lowerMessage.includes('thanks')) {
      return '¡De nada! Es un placer ayudarte. Si tienes más preguntas sobre ArquiFi, no dudes en preguntarme.';
    }
    
    return 'Interesante pregunta. En ArquiFi, puedes ganar AP completando misiones, participar en el DAO para votar propuestas, y hacer stacking de STX. ¿Hay algo específico sobre las páginas, juegos o transferencias que te gustaría saber?';
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#0099ff] rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center z-40"
        title="ArquiBot - Asistente IA"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      </button>

      {/* Ventana de chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-96 bg-[#1a1a1a] rounded-lg shadow-xl border border-[#27323a] z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#27323a]">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#0099ff] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <h3 className="text-white font-semibold">ArquiBot</h3>
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
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                    <span className="text-sm text-gray-400">ArquiBot está escribiendo...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[#27323a]">
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
