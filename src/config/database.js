// Configuración de MySQL para ArquiFi
// Para demo local - datos simulados

// Simulación de base de datos local
export const mockDatabase = {
  users: [
    {
      id: 1,
      wallet_address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      username: 'SatoshiN',
      reputation_points: 850,
      arquipuntos: 2450,
      level: 'Visionario',
      badges: ['Pioneer', 'Trader', 'Community'],
      created_at: '2024-01-15T10:30:00Z'
    }
  ],
  posts: [
    {
      id: 1,
      user_id: 1,
      content: 'Acabo de completar mi primer stacking en ArquiFi. ¡La experiencia es increíble! 🚀',
      likes_count: 24,
      comments_count: 8,
      shares_count: 3,
      created_at: '2024-01-20T14:30:00Z'
    },
    {
      id: 2,
      user_id: 1,
      content: 'Nuevo tutorial sobre yield farming disponible. Link en bio 👆',
      likes_count: 45,
      comments_count: 12,
      shares_count: 7,
      created_at: '2024-01-20T12:15:00Z'
    }
  ],
  missions: [
    {
      id: 1,
      title: 'Primer Stacking',
      description: 'Completa tu primer stacking de STX',
      reward_ap: 100,
      reward_rp: 50,
      type: 'free',
      required_level: 0,
      is_active: true
    },
    {
      id: 2,
      title: 'Explorador DeFi',
      description: 'Participa en 5 transacciones DeFi',
      reward_ap: 250,
      reward_rp: 100,
      type: 'free',
      required_level: 1,
      is_active: true
    }
  ],
  chats: [
    {
      id: 1,
      chat_type: 'direct',
      created_by: 1,
      participants: [
        { user_id: 1, username: 'SatoshiN', level: 'Visionario' },
        { user_id: 2, username: 'crypto_trader', level: 'Arquitecto' }
      ]
    }
  ],
  messages: [
    {
      id: 1,
      chat_id: 1,
      user_id: 1,
      content: 'Hola! ¿Cómo va tu experiencia en ArquiFi?',
      created_at: '2024-01-20T15:30:00Z'
    },
    {
      id: 2,
      chat_id: 1,
      user_id: 2,
      content: '¡Excelente! Acabo de ganar mi primer badge Pioneer 🚀',
      created_at: '2024-01-20T15:32:00Z'
    }
  ]
}

// Funciones simuladas de base de datos
export const database = {
  // Obtener usuario por wallet
  getUserByWallet: (walletAddress) => {
    return mockDatabase.users.find(user => user.wallet_address === walletAddress) || null
  },

  // Obtener posts
  getPosts: () => {
    return mockDatabase.posts.map(post => ({
      ...post,
      users: mockDatabase.users.find(user => user.id === post.user_id)
    }))
  },

  // Crear post
  createPost: (userId, content) => {
    const newPost = {
      id: mockDatabase.posts.length + 1,
      user_id: userId,
      content,
      likes_count: 0,
      comments_count: 0,
      shares_count: 0,
      created_at: new Date().toISOString()
    }
    mockDatabase.posts.unshift(newPost)
    return newPost
  },

  // Dar like a post
  likePost: (postId) => {
    const post = mockDatabase.posts.find(p => p.id === postId)
    if (post) {
      post.likes_count += 1
      return post
    }
    return null
  },

  // Compartir post
  sharePost: (postId) => {
    const post = mockDatabase.posts.find(p => p.id === postId)
    if (post) {
      post.shares_count += 1
      return post
    }
    return null
  },

  // Obtener misiones
  getMissions: () => {
    return mockDatabase.missions.filter(mission => mission.is_active)
  },

  // Obtener chats del usuario
  getUserChats: (userId) => {
    return mockDatabase.chats.filter(chat => 
      chat.participants.some(p => p.user_id === userId)
    )
  },

  // Obtener mensajes del chat
  getChatMessages: (chatId) => {
    return mockDatabase.messages
      .filter(msg => msg.chat_id === chatId)
      .map(msg => ({
        ...msg,
        users: mockDatabase.users.find(u => u.id === msg.user_id)
      }))
  },

  // Enviar mensaje
  sendMessage: (chatId, userId, content) => {
    const newMessage = {
      id: mockDatabase.messages.length + 1,
      chat_id: chatId,
      user_id: userId,
      content,
      created_at: new Date().toISOString()
    }
    mockDatabase.messages.push(newMessage)
    return newMessage
  }
}
