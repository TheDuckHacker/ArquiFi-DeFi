// Configuración de conexión MySQL para ArquiFi
// Para demo local

const mysql = require('mysql2/promise');

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // Cambiar por tu contraseña de MySQL
  database: 'arquifi',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Funciones de base de datos
export const database = {
  // Obtener usuario por wallet
  getUserByWallet: async (walletAddress) => {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE wallet_address = ?',
        [walletAddress]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      throw error;
    }
  },

  // Crear usuario
  createUser: async (userData) => {
    try {
      const [result] = await pool.execute(
        'INSERT INTO users (wallet_address, username, reputation_points, arquipuntos, level, badges) VALUES (?, ?, ?, ?, ?, ?)',
        [
          userData.wallet_address,
          userData.username,
          userData.reputation_points || 0,
          userData.arquipuntos || 0,
          userData.level || 'Novato',
          JSON.stringify(userData.badges || [])
        ]
      );
      return { id: result.insertId, ...userData };
    } catch (error) {
      console.error('Error creando usuario:', error);
      throw error;
    }
  },

  // Actualizar usuario
  updateUser: async (userId, updateData) => {
    try {
      const fields = [];
      const values = [];
      
      Object.keys(updateData).forEach(key => {
        if (updateData[key] !== undefined) {
          fields.push(`${key} = ?`);
          values.push(updateData[key]);
        }
      });
      
      values.push(userId);
      
      await pool.execute(
        `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
        values
      );
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      throw error;
    }
  },

  // Obtener posts
  getPosts: async () => {
    try {
      const [rows] = await pool.execute(`
        SELECT p.*, u.username, u.reputation_points, u.level 
        FROM posts p 
        JOIN users u ON p.user_id = u.id 
        ORDER BY p.created_at DESC
      `);
      return rows;
    } catch (error) {
      console.error('Error obteniendo posts:', error);
      throw error;
    }
  },

  // Crear post
  createPost: async (userId, content) => {
    try {
      const [result] = await pool.execute(
        'INSERT INTO posts (user_id, content, likes_count, comments_count, shares_count) VALUES (?, ?, 0, 0, 0)',
        [userId, content]
      );
      return { id: result.insertId, user_id: userId, content, likes_count: 0, comments_count: 0, shares_count: 0 };
    } catch (error) {
      console.error('Error creando post:', error);
      throw error;
    }
  },

  // Dar like a post
  likePost: async (postId) => {
    try {
      await pool.execute(
        'UPDATE posts SET likes_count = likes_count + 1 WHERE id = ?',
        [postId]
      );
    } catch (error) {
      console.error('Error dando like:', error);
      throw error;
    }
  },

  // Compartir post
  sharePost: async (postId) => {
    try {
      await pool.execute(
        'UPDATE posts SET shares_count = shares_count + 1 WHERE id = ?',
        [postId]
      );
    } catch (error) {
      console.error('Error compartiendo post:', error);
      throw error;
    }
  },

  // Obtener misiones
  getMissions: async () => {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM missions WHERE is_active = TRUE ORDER BY created_at DESC'
      );
      return rows;
    } catch (error) {
      console.error('Error obteniendo misiones:', error);
      throw error;
    }
  },

  // Obtener chats del usuario
  getUserChats: async (userId) => {
    try {
      const [rows] = await pool.execute(`
        SELECT c.*, cp.user_id, u.username, u.reputation_points, u.level
        FROM chats c
        JOIN chat_participants cp ON c.id = cp.chat_id
        JOIN users u ON cp.user_id = u.id
        WHERE c.id IN (
          SELECT chat_id FROM chat_participants WHERE user_id = ?
        ) AND cp.user_id != ?
      `, [userId, userId]);
      return rows;
    } catch (error) {
      console.error('Error obteniendo chats:', error);
      throw error;
    }
  },

  // Obtener mensajes del chat
  getChatMessages: async (chatId) => {
    try {
      const [rows] = await pool.execute(`
        SELECT m.*, u.username, u.reputation_points, u.level
        FROM messages m
        JOIN users u ON m.user_id = u.id
        WHERE m.chat_id = ?
        ORDER BY m.created_at ASC
      `, [chatId]);
      return rows;
    } catch (error) {
      console.error('Error obteniendo mensajes:', error);
      throw error;
    }
  },

  // Enviar mensaje
  sendMessage: async (chatId, userId, content) => {
    try {
      const [result] = await pool.execute(
        'INSERT INTO messages (chat_id, user_id, content, message_type) VALUES (?, ?, ?, "text")',
        [chatId, userId, content]
      );
      return { id: result.insertId, chat_id: chatId, user_id: userId, content };
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      throw error;
    }
  },

  // Obtener propuestas DAO
  getDAOProposals: async () => {
    try {
      const [rows] = await pool.execute(`
        SELECT p.*, u.username, u.level
        FROM dao_proposals p
        JOIN users u ON p.creator_id = u.id
        ORDER BY p.created_at DESC
      `);
      return rows;
    } catch (error) {
      console.error('Error obteniendo propuestas DAO:', error);
      throw error;
    }
  },

  // Votar en propuesta
  voteProposal: async (proposalId, userId, vote, apBurned) => {
    try {
      await pool.execute(
        'INSERT INTO dao_votes (proposal_id, voter_id, vote, ap_burned) VALUES (?, ?, ?, ?)',
        [proposalId, userId, vote, apBurned]
      );
      
      // Actualizar conteo de votos
      await pool.execute(
        `UPDATE dao_proposals SET ${vote}_votes = ${vote}_votes + 1, total_ap_burned = total_ap_burned + ? WHERE id = ?`,
        [apBurned, proposalId]
      );
    } catch (error) {
      console.error('Error votando:', error);
      throw error;
    }
  },

  // Obtener transacciones del usuario
  getUserTransactions: async (userId) => {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
      return rows;
    } catch (error) {
      console.error('Error obteniendo transacciones:', error);
      throw error;
    }
  },

  // Registrar transacción
  recordTransaction: async (userId, type, amount, description) => {
    try {
      const [result] = await pool.execute(
        'INSERT INTO transactions (user_id, transaction_type, amount, description) VALUES (?, ?, ?, ?)',
        [userId, type, amount, description]
      );
      return { id: result.insertId };
    } catch (error) {
      console.error('Error registrando transacción:', error);
      throw error;
    }
  }
};

export default pool;
