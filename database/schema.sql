-- Esquema de base de datos MySQL para ArquiFi
-- Para demo local

CREATE DATABASE IF NOT EXISTS arquifi;
USE arquifi;

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    wallet_address VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    reputation_points INT DEFAULT 0,
    arquipuntos INT DEFAULT 0,
    level ENUM('Novato', 'Explorador', 'Arquitecto', 'Visionario') DEFAULT 'Novato',
    badges JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de publicaciones
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(500),
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de reacciones
CREATE TABLE reactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    reaction_type ENUM('like', 'love', 'laugh', 'angry') DEFAULT 'like',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_reaction (post_id, user_id, reaction_type)
);

-- Tabla de comentarios
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de misiones
CREATE TABLE missions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    reward_ap INT NOT NULL,
    reward_rp INT NOT NULL,
    type ENUM('free', 'paid', 'premium') DEFAULT 'free',
    required_level INT DEFAULT 0,
    required_ap INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de progreso de misiones
CREATE TABLE mission_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    mission_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    ap_earned INT DEFAULT 0,
    rp_earned INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_mission_progress (user_id, mission_id)
);

-- Tabla de propuestas DAO
CREATE TABLE dao_proposals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    creator_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    voting_end TIMESTAMP NOT NULL,
    status ENUM('active', 'passed', 'rejected', 'executed') DEFAULT 'active',
    yes_votes INT DEFAULT 0,
    no_votes INT DEFAULT 0,
    abstain_votes INT DEFAULT 0,
    total_ap_burned INT DEFAULT 0,
    executed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de votos DAO
CREATE TABLE dao_votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proposal_id INT NOT NULL,
    voter_id INT NOT NULL,
    vote ENUM('yes', 'no', 'abstain') NOT NULL,
    ap_burned INT NOT NULL,
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proposal_id) REFERENCES dao_proposals(id) ON DELETE CASCADE,
    FOREIGN KEY (voter_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_vote (proposal_id, voter_id)
);

-- Tabla de chats
CREATE TABLE chats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_type ENUM('direct', 'group') DEFAULT 'direct',
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de participantes de chat
CREATE TABLE chat_participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT NOT NULL,
    user_id INT NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_participant (chat_id, user_id)
);

-- Tabla de mensajes
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    message_type ENUM('text', 'image', 'file') DEFAULT 'text',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de transacciones
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    transaction_type ENUM('earn_ap', 'burn_ap', 'earn_rp', 'stacking', 'unstaking') NOT NULL,
    amount INT NOT NULL,
    description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de préstamos
CREATE TABLE loans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    borrower_id INT NOT NULL,
    lender_id INT NOT NULL,
    amount DECIMAL(18, 8) NOT NULL,
    collateral_amount DECIMAL(18, 8) NOT NULL,
    collateral_type ENUM('STX', 'sBTC') DEFAULT 'STX',
    interest_rate DECIMAL(5, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP NOT NULL,
    status ENUM('active', 'repaid', 'liquidated') DEFAULT 'active',
    repaid_amount DECIMAL(18, 8) DEFAULT 0,
    FOREIGN KEY (borrower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lender_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de historial crediticio
CREATE TABLE credit_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_borrowed DECIMAL(18, 8) DEFAULT 0,
    total_repaid DECIMAL(18, 8) DEFAULT 0,
    active_loans INT DEFAULT 0,
    defaulted_loans INT DEFAULT 0,
    credit_score INT DEFAULT 500,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_credit_history (user_id)
);

-- Tabla de contenido educativo
CREATE TABLE educational_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    content_type ENUM('tutorial', 'guide', 'glossary', 'mission') NOT NULL,
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    ap_reward INT DEFAULT 0,
    rp_reward INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO users (wallet_address, username, reputation_points, arquipuntos, level, badges) VALUES
('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', 'SatoshiN', 850, 2450, 'Visionario', '["Pioneer", "Trader", "Community"]');

INSERT INTO posts (user_id, content, likes_count, comments_count, shares_count) VALUES
(1, 'Acabo de completar mi primer stacking en ArquiFi. ¡La experiencia es increíble! 🚀', 24, 8, 3),
(1, 'Nuevo tutorial sobre yield farming disponible. Link en bio 👆', 45, 12, 7);

INSERT INTO missions (title, description, reward_ap, reward_rp, type, required_level) VALUES
('Primer Stacking', 'Completa tu primer stacking de STX', 100, 50, 'free', 0),
('Explorador DeFi', 'Participa en 5 transacciones DeFi', 250, 100, 'free', 1),
('Visionario DAO', 'Vota en 3 propuestas DAO', 500, 200, 'premium', 3);

INSERT INTO dao_proposals (title, description, creator_id, voting_end, status) VALUES
('Integración con sBTC', 'Propuesta para integrar soporte completo de sBTC en la plataforma', 1, DATE_ADD(NOW(), INTERVAL 7 DAY), 'active'),
('Nuevo sistema de badges', 'Implementar sistema de badges más granular y recompensas', 1, DATE_ADD(NOW(), INTERVAL 5 DAY), 'active');

INSERT INTO chats (chat_type, created_by) VALUES
('direct', 1);

INSERT INTO chat_participants (chat_id, user_id) VALUES
(1, 1);

INSERT INTO messages (chat_id, user_id, content) VALUES
(1, 1, 'Hola! ¿Cómo va tu experiencia en ArquiFi?'),
(1, 1, '¡Excelente! Acabo de ganar mi primer badge Pioneer 🚀');

INSERT INTO educational_content (title, content, content_type, difficulty_level, ap_reward, rp_reward) VALUES
('¿Qué es DeFi?', 'Guía completa sobre finanzas descentralizadas', 'tutorial', 'beginner', 50, 25),
('Stacking de STX', 'Cómo hacer stacking de STX paso a paso', 'guide', 'intermediate', 100, 50),
('Gobernanza DAO', 'Entendiendo la gobernanza descentralizada', 'tutorial', 'advanced', 200, 100);
