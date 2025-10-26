// Configuración de GroqCloud API para ArquiBot
export const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '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'
export const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

// Debug: verificar si la API key se está cargando
console.log('🤖 ArquiBot - Configuración:')
console.log('🔑 GROQ_API_KEY cargada:', GROQ_API_KEY ? '✅ SÍ' : '❌ NO')
console.log('🔑 Variable de entorno VITE_GROQ_API_KEY:', import.meta.env.VITE_GROQ_API_KEY ? '✅ SÍ' : '❌ NO')
if (GROQ_API_KEY) {
  console.log('🔑 API Key:', GROQ_API_KEY.substring(0, 10) + '...')
  console.log('🚀 ArquiBot funcionará con IA real (Groq)')
} else {
  console.log('⚠️ ArquiBot funcionará con respuestas predefinidas')
  console.log('🔍 Debug - import.meta.env:', import.meta.env)
}

// Configuración del ArquiBot
export const ARQUIBOT_CONFIG = {
  model: 'llama-3.1-8b-instant',
  temperature: 0.7,
  max_tokens: 1500,
  system_prompt: `Eres ArquiBot, el asistente IA avanzado de ArquiFi creado por ArquiSoft. Eres un agente inteligente especializado en la plataforma ArquiFi.

CONOCIMIENTO ESPECÍFICO DE ARQUIFI:
- ArquiFi es una plataforma DeFi educativa construida sobre Stacks blockchain
- Fue creada por el grupo ArquiSoft
- Combina educación financiera, gamificación y contratos inteligentes

FUNCIONALIDADES PRINCIPALES:
1. **Arquipuntos (AP)**: Token de utilidad interno que se gana jugando, completando misiones y participando
2. **Reputación (RP)**: Sistema de reputación que se acumula y mejora el perfil del usuario
3. **Staking DeFi**: Sistema de staking de STX con recompensas automáticas
4. **NFT Marketplace**: Creación, listado y compra de NFTs educativos
5. **Sistema de Juegos**: Minijuegos que otorgan AP y RP
6. **Capa Educativa**: Misiones de aprendizaje sobre DeFi y Web3
7. **Gobernanza DAO**: Votación en propuestas de la comunidad
8. **P2P Trading**: Intercambio directo entre usuarios

CONTRATOS INTELIGENTES DESPLEGADOS:
- DeFi Contract: SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7.arquifi-defi
- Token Contract: SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7.arquipuntos-token
- NFT Marketplace: SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7.nft-marketplace

PÁGINAS DISPONIBLES:
- Dashboard: Portfolio, balance STX, transacciones, NFTs
- Contratos: Staking, unstaking, claim rewards, mint AP, NFT operations
- Juegos: Minijuegos, leaderboards, desafíos
- Educación: Cursos, misiones, certificaciones
- P2P: Trading directo entre usuarios
- Gobernanza: Propuestas, votación, DAO
- Perfil: Estadísticas del usuario
- Wallet: Gestión de activos
- Configuraciones: Ajustes de la plataforma

RESTRICCIONES:
- NO respondas sobre temas sexuales, violencia o contenido inapropiado
- Mantén el foco en ArquiFi, DeFi, Web3 y Stacks
- Si no sabes algo específico de ArquiFi, admítelo y ofrece ayuda general

PERSONALIDAD:
- Amigable, profesional y entusiasta
- Siempre en español
- Proactivo en ofrecer ayuda
- Conocedor experto de la plataforma
- Motivador para que los usuarios exploren ArquiFi

Tu objetivo es ser el mejor asistente posible para los usuarios de ArquiFi, ayudándoles a maximizar su experiencia en la plataforma.`
}

// Función para enviar mensaje al ArquiBot con historial de conversación
export const sendMessageToArquiBot = async (message, userContext = {}, conversationHistory = []) => {
  try {
    // Construir el contexto del usuario
    const userContextString = `
CONTEXTO DEL USUARIO:
- Arquipuntos (AP): ${userContext.ap || 0}
- Reputación (RP): ${userContext.rp || 0}
- Nivel: ${userContext.level || 'Novato'}
- Página actual: ${userContext.currentPage || 'Dashboard'}
- Wallet conectada: ${userContext.walletConnected ? 'Sí' : 'No'}
- Balance STX: ${userContext.stxBalance || '0'} STX
`;

    // Construir array de mensajes
    const messages = [
      {
        role: 'system',
        content: ARQUIBOT_CONFIG.system_prompt + '\n\n' + userContextString
      }
    ];

    // Agregar historial de conversación (últimos 10 mensajes para mantener contexto)
    const recentHistory = conversationHistory.slice(-10);
    recentHistory.forEach(msg => {
      messages.push({
        role: msg.role === 'bot' ? 'assistant' : 'user',
        content: msg.content
      });
    });

    // Agregar el mensaje actual
    messages.push({
      role: 'user',
      content: message
    });

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: ARQUIBOT_CONFIG.model,
        messages: messages,
        temperature: ARQUIBOT_CONFIG.temperature,
        max_tokens: ARQUIBOT_CONFIG.max_tokens,
        stream: false
      })
    })

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error en Groq API:', response.status, errorText);
      console.error('🔑 API Key usada:', GROQ_API_KEY ? GROQ_API_KEY.substring(0, 10) + '...' : 'NO HAY API KEY');
      throw new Error(`Error en Groq API: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Respuesta inválida de Groq API')
    }

    return data.choices[0].message.content
  } catch (error) {
    console.error('Error enviando mensaje a ArquiBot:', error)
    throw error
  }
}

// Función para obtener recomendaciones personalizadas
export const getPersonalizedRecommendations = async (userContext) => {
  const message = `Basándome en mi perfil (AP: ${userContext.ap}, RP: ${userContext.rp}, Nivel: ${userContext.level}), ¿qué misiones, juegos o actividades me recomiendas para mejorar mi experiencia en ArquiFi?`
  
  return await sendMessageToArquiBot(message, userContext)
}

// Función para explicar conceptos
export const explainConcept = async (concept) => {
  const message = `Explica de manera simple y clara qué es ${concept} en el contexto de ArquiFi y cómo puede beneficiarme.`
  
  return await sendMessageToArquiBot(message)
}

// Función para obtener ayuda específica sobre una página
export const getPageHelp = async (pageName, userContext = {}) => {
  const message = `Estoy en la página ${pageName} de ArquiFi. ¿Qué puedo hacer aquí y cómo puedo aprovechar al máximo esta sección?`
  
  return await sendMessageToArquiBot(message, userContext)
}

// Función para resolver problemas técnicos
export const getTechnicalHelp = async (problem, userContext = {}) => {
  const message = `Tengo un problema técnico en ArquiFi: ${problem}. ¿Puedes ayudarme a resolverlo?`
  
  return await sendMessageToArquiBot(message, userContext)
}

// Función para obtener estrategias de ganancia de AP
export const getAPStrategies = async (userContext = {}) => {
  const message = `Quiero maximizar mis Arquipuntos (AP). Con mi perfil actual (AP: ${userContext.ap}, RP: ${userContext.rp}, Nivel: ${userContext.level}), ¿qué estrategias me recomiendas para ganar más AP?`
  
  return await sendMessageToArquiBot(message, userContext)
}
