import React, { useState, useEffect } from 'react';

const Social = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Datos simulados de posts
  const mockPosts = [
    {
      id: 1,
      user: {
        name: "SatoshiN",
        avatar: "S",
        rp: 850,
        level: "Visionario"
      },
      content: "Acabo de completar mi primer stacking en ArquiFi. ¡La experiencia es increíble! 🚀",
      timestamp: "2 minutos",
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false
    },
    {
      id: 2,
      user: {
        name: "SatoshiN",
        avatar: "S",
        rp: 850,
        level: "Visionario"
      },
      content: "Nuevo tutorial sobre yield farming disponible. Link en bio 👋",
      timestamp: "5 minutos",
      likes: 45,
      comments: 12,
      shares: 7,
      isLiked: true
    },
    {
      id: 3,
      user: {
        name: "DeFiMaster",
        avatar: "D",
        rp: 1200,
        level: "Experto"
      },
      content: "¿Alguien más está emocionado por las nuevas funcionalidades de ArquiFi? El futuro de DeFi está aquí! 💎",
      timestamp: "1 hora",
      likes: 67,
      comments: 15,
      shares: 12,
      isLiked: false
    },
    {
      id: 4,
      user: {
        name: "CryptoNewbie",
        avatar: "C",
        rp: 300,
        level: "Novato"
      },
      content: "Primer día en ArquiFi y ya estoy aprendiendo tanto. ¡Gracias por esta comunidad increíble! 🙏",
      timestamp: "3 horas",
      likes: 89,
      comments: 23,
      shares: 5,
      isLiked: true
    }
  ];

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  const showNotificationWithMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const createPost = async () => {
    if (!newPost.trim()) return;

    setIsPosting(true);
    try {
      // Simular tiempo de publicación
      await new Promise(resolve => setTimeout(resolve, 2000));

      const post = {
        id: Date.now(),
        user: {
          name: "Tú",
          avatar: "U",
          rp: 1000,
          level: "Usuario"
        },
        content: newPost,
        timestamp: "ahora",
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false
      };

      setPosts(prev => [post, ...prev]);
      setNewPost('');
      showNotificationWithMessage('¡Publicación creada exitosamente!');
    } catch (error) {
      console.error('Error creando post:', error);
      showNotificationWithMessage('Error al crear la publicación');
    } finally {
      setIsPosting(false);
    }
  };

  const toggleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      createPost();
    }
  };

  return (
    <div className="min-h-screen bg-[#121012] text-white">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Social Feed</h1>
        
        {/* Crear nueva publicación */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a] mb-8">
          <div className="flex space-x-4">
            <div className="w-12 h-12 bg-[#0099ff] rounded-full flex items-center justify-center text-white font-bold">
              U
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="¿Qué está pasando en ArquiFi?"
                className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none text-lg"
                rows={3}
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-4">
                  <button className="text-gray-400 hover:text-[#0099ff] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-[#0099ff] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    </svg>
                  </button>
                </div>
                <button
                  onClick={createPost}
                  disabled={!newPost.trim() || isPosting}
                  className="bg-[#0099ff] text-white px-6 py-2 rounded-lg hover:bg-[#0088ee] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isPosting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Publicando...</span>
                    </>
                  ) : (
                    <span>Publicar</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed de publicaciones */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a] hover:border-[#0099ff]/30 transition-all duration-200">
              {/* Header del post */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#0099ff] rounded-full flex items-center justify-center text-white font-bold">
                  {post.user.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-white">{post.user.name}</h3>
                    <span className="text-xs text-green-400">{post.user.level}</span>
                    <span className="text-xs text-gray-400">{post.user.rp} RP</span>
                  </div>
                  <p className="text-sm text-gray-400">{post.timestamp}</p>
                </div>
              </div>

              {/* Contenido del post */}
              <div className="mb-4">
                <p className="text-white text-lg leading-relaxed">{post.content}</p>
              </div>

              {/* Interacciones */}
              <div className="flex items-center space-x-6 pt-4 border-t border-[#27323a]">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center space-x-2 transition-colors ${
                    post.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <svg className="w-5 h-5" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-400 hover:text-[#0099ff] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-400 hover:text-[#0099ff] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span className="text-sm font-medium">{post.shares}</span>
                </button>
              </div>
            </div>
          ))}
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

export default Social;