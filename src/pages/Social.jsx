import React, { useState, useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';

const Social = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [expandedComments, setExpandedComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [friendRequests, setFriendRequests] = useState([]);
  const { updateFriendRequests } = useNotifications();

  // Datos simulados de posts con avatares únicos y sistema de amistad
  const mockPosts = [
    {
      id: 1,
      user: {
        name: "SatoshiN",
        avatar: "S",
        rp: 850,
        level: "Visionario",
        isFollowing: false,
        friendshipStatus: "none" // none, requested, accepted, mutual
      },
      content: "Acabo de completar mi primer stacking en ArquiFi. ¡La experiencia es increíble! 🚀",
        image: "https://picsum.photos/600/400?random=1",
      timestamp: "2 minutos",
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false,
      commentsList: [
        { id: 1, user: "DeFiMaster", content: "¡Felicitaciones! 🎉", timestamp: "1 minuto" },
        { id: 2, user: "CryptoQueen", content: "¿Cuánto APY obtuviste?", timestamp: "30 segundos" }
      ]
    },
    {
      id: 2,
      user: {
        name: "DeFiMaster",
        avatar: "D",
        rp: 1200,
        level: "Experto",
        isFollowing: true,
        friendshipStatus: "accepted"
      },
      content: "Nuevo tutorial sobre yield farming disponible. Link en bio 👋",
        image: "https://picsum.photos/600/400?random=2",
      timestamp: "5 minutos",
      likes: 45,
      comments: 12,
      shares: 7,
      isLiked: true,
      commentsList: [
        { id: 1, user: "SatoshiN", content: "¡Excelente tutorial! 👏", timestamp: "4 minutos" },
        { id: 2, user: "CryptoNewbie", content: "¿Para principiantes también?", timestamp: "3 minutos" }
      ]
    },
    {
      id: 3,
      user: {
        name: "CryptoQueen",
        avatar: "C",
        rp: 950,
        level: "Experto",
        isFollowing: false,
        friendshipStatus: "requested"
      },
      content: "¿Alguien más está emocionado por las nuevas funcionalidades de ArquiFi? El futuro de DeFi está aquí! 💎",
        image: "https://picsum.photos/600/400?random=3",
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
        avatar: "N",
        rp: 300,
        level: "Novato",
        isFollowing: false,
        friendshipStatus: "none"
      },
      content: "Primer día en ArquiFi y ya estoy aprendiendo tanto. ¡Gracias por esta comunidad increíble! 🙏",
        image: "https://picsum.photos/600/400?random=4",
      timestamp: "3 horas",
      likes: 89,
      comments: 23,
      shares: 5,
      isLiked: true
    },
    {
      id: 5,
      user: {
        name: "BlockchainDev",
        avatar: "B",
        rp: 1500,
        level: "Maestro",
        isFollowing: true,
        friendshipStatus: "mutual"
      },
      content: "Desarrollando nuevas funcionalidades para ArquiFi. ¡Pronto tendremos sorpresas increíbles! 🔥",
        image: "https://picsum.photos/600/400?random=5",
      timestamp: "6 horas",
      likes: 156,
      comments: 34,
      shares: 28,
      isLiked: false
    }
  ];

  useEffect(() => {
    setPosts(mockPosts);
    
    // Publicaciones automáticas cada 30 segundos
    const autoPostInterval = setInterval(() => {
      const autoPosts = [
        {
          id: Date.now(),
          user: {
            name: "ArquiFiBot",
            avatar: "🤖",
            rp: 9999,
            level: "Bot",
            isFollowing: false,
            friendshipStatus: "none"
          },
          content: "¡Nueva actualización disponible! Mejoras en el sistema de staking 🚀",
          image: "https://picsum.photos/600/400?random=6",
          timestamp: "ahora",
          likes: 0,
          comments: 0,
          shares: 0,
          isLiked: false,
          commentsList: []
        },
        {
          id: Date.now() + 1,
          user: {
            name: "CryptoNews",
            avatar: "📰",
            rp: 2500,
            level: "Noticias",
            isFollowing: false,
            friendshipStatus: "none"
          },
          content: "Bitcoin alcanza nuevo máximo histórico. ¿Qué opinan? 📈",
          image: "https://picsum.photos/600/400?random=7",
          timestamp: "ahora",
          likes: 0,
          comments: 0,
          shares: 0,
          isLiked: false,
          commentsList: []
        }
      ];
      
      const randomPost = autoPosts[Math.floor(Math.random() * autoPosts.length)];
      setPosts(prev => [randomPost, ...prev]);
      showNotificationWithMessage(`📢 Nueva publicación de ${randomPost.user.name}`);
    }, 30000);

    return () => clearInterval(autoPostInterval);
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

          // Imágenes aleatorias para posts nuevos
            const randomImages = [
              "https://picsum.photos/600/400?random=8",
              "https://picsum.photos/600/400?random=9",
              "https://picsum.photos/600/400?random=10",
              "https://picsum.photos/600/400?random=11",
              "https://picsum.photos/600/400?random=12",
              "https://picsum.photos/600/400?random=13",
              "https://picsum.photos/600/400?random=14"
            ];

      const post = {
        id: Date.now(),
        user: {
          name: "Tú",
          avatar: "T",
          rp: 1000,
          level: "Usuario"
        },
        content: newPost,
        image: randomImages[Math.floor(Math.random() * randomImages.length)],
        timestamp: "ahora",
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false
      };

      setPosts(prev => [post, ...prev]);
      setNewPost('');
      showNotificationWithMessage('¡Publicación creada exitosamente! 🎉');
    } catch (error) {
      console.error('Error creando post:', error);
      showNotificationWithMessage('❌ Error al crear la publicación');
    } finally {
      setIsPosting(false);
    }
  };

  const toggleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const wasLiked = post.isLiked;
        const newPost = {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
        
        // Mostrar notificación
        if (!wasLiked) {
          showNotificationWithMessage('❤️ ¡Post liked!');
        } else {
          showNotificationWithMessage('💔 Post unliked');
        }
        
        return newPost;
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

  const handleComment = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const addComment = (postId) => {
    const commentText = newComments[postId];
    if (!commentText?.trim()) return;

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          user: "Tú",
          content: commentText,
          timestamp: "ahora"
        };
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [newComment, ...post.commentsList]
        };
      }
      return post;
    }));

    setNewComments(prev => ({
      ...prev,
      [postId]: ""
    }));
    showNotificationWithMessage('💬 Comentario agregado');
  };

  const handleCommentChange = (postId, value) => {
    setNewComments(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  const handleShare = (postId) => {
    showNotificationWithMessage('📤 Post compartido exitosamente');
  };

  const handleFollow = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newPost = { ...post };
        if (post.user.friendshipStatus === "none") {
          newPost.user.friendshipStatus = "requested";
          newPost.user.isFollowing = true;
          showNotificationWithMessage(`📤 Solicitud enviada a ${post.user.name}`);
          // Incrementar contador de notificaciones
          updateFriendRequests(prev => prev + 1);
        } else if (post.user.friendshipStatus === "requested") {
          newPost.user.friendshipStatus = "none";
          newPost.user.isFollowing = false;
          showNotificationWithMessage(`❌ Solicitud cancelada a ${post.user.name}`);
          // Decrementar contador de notificaciones
          updateFriendRequests(prev => Math.max(0, prev - 1));
        } else if (post.user.friendshipStatus === "accepted") {
          newPost.user.friendshipStatus = "mutual";
          showNotificationWithMessage(`✅ Ahora son amigos mutuos con ${post.user.name}`);
        }
        return newPost;
      }
      return post;
    }));
  };

  const handleUnfollow = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newPost = { ...post };
        newPost.user.friendshipStatus = "none";
        newPost.user.isFollowing = false;
        showNotificationWithMessage(`👋 Dejaste de seguir a ${post.user.name}`);
        return newPost;
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-[#121012] text-white pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Social Feed</h1>
        
        {/* Crear nueva publicación */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a] mb-8">
          <div className="flex space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0099ff] to-[#00ff88] rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-[#0099ff]">
              T
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
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 ${
                  post.user.avatar === 'S' ? 'bg-gradient-to-br from-[#0099ff] to-[#00ff88] border-[#0099ff]' :
                  post.user.avatar === 'D' ? 'bg-gradient-to-br from-[#ff6b6b] to-[#ffa500] border-[#ff6b6b]' :
                  post.user.avatar === 'C' ? 'bg-gradient-to-br from-[#9c27b0] to-[#e91e63] border-[#9c27b0]' :
                  post.user.avatar === 'N' ? 'bg-gradient-to-br from-[#4caf50] to-[#8bc34a] border-[#4caf50]' :
                  post.user.avatar === 'B' ? 'bg-gradient-to-br from-[#ff9800] to-[#ffc107] border-[#ff9800]' :
                  'bg-gradient-to-br from-[#0099ff] to-[#00ff88] border-[#0099ff]'
                }`}>
                  {post.user.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-white">{post.user.name}</h3>
                        <span className="text-xs text-green-400">{post.user.level}</span>
                        <span className="text-xs text-gray-400">{post.user.rp} RP</span>
                        {post.user.friendshipStatus === "mutual" && (
                          <span className="text-xs text-blue-400">👥 Amigos</span>
                        )}
                        {post.user.friendshipStatus === "requested" && (
                          <span className="text-xs text-yellow-400">⏳ Pendiente</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{post.timestamp}</p>
                    </div>
                    <div className="flex space-x-2">
                      {post.user.name !== "Tú" && (
                        <>
                          {post.user.friendshipStatus === "none" && (
                            <button
                              onClick={() => handleFollow(post.id)}
                              className="bg-gradient-to-r from-[#0099ff] to-[#00ff88] text-white px-4 py-1 rounded-full text-sm hover:from-[#0088ee] hover:to-[#00ee77] transition-all duration-200"
                            >
                              + Seguir
                            </button>
                          )}
                          {post.user.friendshipStatus === "requested" && (
                            <button
                              onClick={() => handleUnfollow(post.id)}
                              className="bg-gray-600 text-white px-4 py-1 rounded-full text-sm hover:bg-gray-700 transition-all duration-200"
                            >
                              Cancelar
                            </button>
                          )}
                          {post.user.friendshipStatus === "accepted" && (
                            <button
                              onClick={() => handleFollow(post.id)}
                              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-full text-sm hover:from-green-600 hover:to-green-700 transition-all duration-200"
                            >
                              ✅ Amigos
                            </button>
                          )}
                          {post.user.friendshipStatus === "mutual" && (
                            <button
                              onClick={() => handleUnfollow(post.id)}
                              className="bg-red-600 text-white px-4 py-1 rounded-full text-sm hover:bg-red-700 transition-all duration-200"
                            >
                              👋 Dejar de seguir
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido del post */}
              <div className="mb-4">
                <p className="text-white text-lg leading-relaxed mb-4">{post.content}</p>
                
                    {/* Imagen del post */}
                    {post.image && (
                      <div className="relative rounded-lg overflow-hidden">
                        <img 
                          src={post.image}
                          alt="Post content"
                          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onClick={() => window.open(post.image, '_blank')}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div 
                          className="w-full h-64 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] flex items-center justify-center text-gray-400 hidden"
                          style={{display: 'none'}}
                        >
                          <div className="text-center">
                            <svg className="w-12 h-12 mx-auto mb-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                            </svg>
                            <p className="text-sm">Imagen no disponible</p>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
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
                
                <button 
                  onClick={() => handleComment(post.id)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-[#0099ff] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                
                <button 
                  onClick={() => handleShare(post.id)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-[#0099ff] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span className="text-sm font-medium">{post.shares}</span>
                </button>
              </div>

              {/* Sección de Comentarios */}
              {expandedComments[post.id] && (
                <div className="mt-4 pt-4 border-t border-[#27323a]">
                  {/* Lista de comentarios existentes */}
                  <div className="space-y-3 mb-4">
                    {post.commentsList?.map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          comment.user === "Tú" ? 'bg-gradient-to-br from-[#0099ff] to-[#00ff88]' :
                          comment.user === "DeFiMaster" ? 'bg-gradient-to-br from-[#ff6b6b] to-[#ffa500]' :
                          comment.user === "CryptoQueen" ? 'bg-gradient-to-br from-[#9c27b0] to-[#e91e63]' :
                          comment.user === "SatoshiN" ? 'bg-gradient-to-br from-[#0099ff] to-[#00ff88]' :
                          comment.user === "CryptoNewbie" ? 'bg-gradient-to-br from-[#4caf50] to-[#8bc34a]' :
                          'bg-gradient-to-br from-[#0099ff] to-[#00ff88]'
                        }`}>
                          {comment.user === "Tú" ? "T" : comment.user.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-white text-sm">{comment.user}</span>
                            <span className="text-xs text-gray-400">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-300 text-sm mt-1">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Formulario para nuevo comentario */}
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#0099ff] to-[#00ff88] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      T
                    </div>
                    <div className="flex-1 flex space-x-2">
                      <input
                        type="text"
                        value={newComments[post.id] || ""}
                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                        placeholder="Escribe un comentario..."
                        className="flex-1 bg-[#27323a] text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff] border border-[#27323a] hover:border-[#0099ff]/50 transition-colors"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addComment(post.id);
                          }
                        }}
                      />
                      <button
                        onClick={() => addComment(post.id)}
                        disabled={!newComments[post.id]?.trim()}
                        className="bg-[#0099ff] text-white px-4 py-2 rounded-lg hover:bg-[#0088ee] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Comentar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Notificación flotante mejorada */}
        {showNotification && (
          <div className="fixed top-4 right-4 bg-[#0099ff] text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-slide-in border border-[#0099ff]/30">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <div>
                <span className="font-semibold text-sm">{notificationMessage}</span>
                <div className="text-xs text-white/80">ArquiFi</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Social;