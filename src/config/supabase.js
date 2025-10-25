// Configuración de Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tablas de la base de datos
export const TABLES = {
  USERS: 'users',
  POSTS: 'posts',
  REACTIONS: 'reactions',
  COMMENTS: 'comments',
  MISSIONS: 'missions',
  GAMES: 'games',
  VOTES: 'votes',
  TRANSACTIONS: 'transactions',
  LOANS: 'loans',
  EDUCATIONAL_CONTENT: 'educational_content'
}

// Esquema de la base de datos
export const DATABASE_SCHEMA = {
  users: {
    id: 'uuid',
    wallet_address: 'text',
    username: 'text',
    reputation_points: 'integer', // RP
    arquipuntos: 'integer', // AP
    level: 'text',
    badges: 'json',
    created_at: 'timestamp',
    updated_at: 'timestamp'
  },
  posts: {
    id: 'uuid',
    user_id: 'uuid',
    content: 'text',
    image_url: 'text',
    likes_count: 'integer',
    comments_count: 'integer',
    shares_count: 'integer',
    created_at: 'timestamp'
  },
  missions: {
    id: 'uuid',
    title: 'text',
    description: 'text',
    reward_ap: 'integer',
    reward_rp: 'integer',
    type: 'text', // 'free', 'paid', 'premium'
    required_level: 'integer',
    created_at: 'timestamp'
  },
  votes: {
    id: 'uuid',
    user_id: 'uuid',
    proposal_id: 'uuid',
    ap_burned: 'integer',
    created_at: 'timestamp'
  }
}
