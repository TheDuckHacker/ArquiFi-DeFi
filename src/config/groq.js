// Configuración de GroqCloud API para ArquiBot
export const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || 'demo-key'
export const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

// Configuración del ArquiBot
export const ARQUIBOT_CONFIG = {
  model: 'llama3-8b-8192',
  temperature: 0.7,
  max_tokens: 1000,
  system_prompt: `Eres ArquiBot, el asistente IA de ArquiFi. Tu función es:

1. Ayudar a los usuarios a navegar la plataforma
2. Explicar conceptos de DeFi, Web3 y Stacks
3. Recomendar misiones y juegos según el perfil del usuario
4. Guiar en el uso de Arquipuntos (AP) y Reputación (RP)
5. Responder preguntas sobre la plataforma

Características de ArquiFi:
- Arquipuntos (AP): Se ganan jugando, completando misiones, participando
- Reputación (RP): Se acumula, no se quema, mejora el perfil
- Sistema modular: Social, Gamificación, Governance, DeFi, Educación
- Wallet Stacks para autenticación
- Smart contracts en Clarity

Sé amigable, útil y siempre en español.`
}

// Función para enviar mensaje al ArquiBot
export const sendMessageToArquiBot = async (message, userContext = {}) => {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: ARQUIBOT_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: ARQUIBOT_CONFIG.system_prompt
          },
          {
            role: 'user',
            content: `Contexto del usuario: AP: ${userContext.ap || 0}, RP: ${userContext.rp || 0}, Nivel: ${userContext.level || 'Novato'}\n\nMensaje: ${message}`
          }
        ],
        temperature: ARQUIBOT_CONFIG.temperature,
        max_tokens: ARQUIBOT_CONFIG.max_tokens
      })
    })

    if (!response.ok) {
      throw new Error(`Error en Groq API: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error('Error enviando mensaje a ArquiBot:', error)
    throw error // Lanzar el error para que el componente lo maneje
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
