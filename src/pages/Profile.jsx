import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "Tu Nombre",
    username: "@tu_usuario",
    reputation: 1250,
    level: "Usuario",
    status: "Online",
    ap: 1500,
    rp: 1250,
    joinDate: "Diciembre 2024",
    bio: "¡Bienvenido a ArquiFi! Completa tu perfil para personalizar tu experiencia.",
    location: "Tu ubicación",
    website: "https://tu-sitio.com"
  });
  
  const [stats, setStats] = useState({
    totalPosts: 47,
    totalLikes: 1234,
    totalComments: 89,
    followers: 1250,
    following: 340
  });

  const [achievements, setAchievements] = useState([
    { id: 1, name: "Primer Stacking", description: "Completaste tu primer stacking", icon: "🏆", unlocked: true },
    { id: 2, name: "DeFi Master", description: "Dominaste los conceptos de DeFi", icon: "💎", unlocked: true },
    { id: 3, name: "DAO Participant", description: "Participaste en 10 votaciones", icon: "🗳️", unlocked: true },
    { id: 4, name: "Social Butterfly", description: "Obtuviste 1000 likes", icon: "🦋", unlocked: false },
    { id: 5, name: "Crypto Guru", description: "Ayudaste a 50 usuarios", icon: "🧙‍♂️", unlocked: false }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: "Completó curso de DeFi", timestamp: "2 horas", ap: 50 },
    { id: 2, action: "Votó en propuesta DAO", timestamp: "1 día", ap: -25 },
    { id: 3, action: "Ganó en juego Trivia", timestamp: "2 días", ap: 30 },
    { id: 4, action: "Publicó en Social Feed", timestamp: "3 días", ap: 5 },
    { id: 5, action: "Completó misión diaria", timestamp: "4 días", ap: 20 }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    setEditData(userData);
  }, [userData]);

  const showNotificationWithMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
    showNotificationWithMessage('Perfil actualizado exitosamente');
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const claimAchievement = (achievementId) => {
    setAchievements(prev => prev.map(achievement => 
      achievement.id === achievementId 
        ? { ...achievement, unlocked: true }
        : achievement
    ));
    showNotificationWithMessage('¡Logro desbloqueado!');
  };

  return (
    <div className="min-h-screen bg-[#121012] text-white pt-20">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
        
        {/* Header del perfil - Nuevo diseño */}
        <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-8 border border-[#27323a] mb-8 overflow-hidden">
          {/* Fondo decorativo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0099ff]/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#00ff88]/20 to-transparent rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Avatar personalizado */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-[#0099ff] to-[#00ff88] rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-2xl border-4 border-white/20">
                  {userData.name.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-[#1a1a1a] flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Tu nombre completo"
                        className="bg-[#27323a] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0099ff] border border-[#27323a] hover:border-[#0099ff]/50 transition-colors"
                      />
                      <input
                        type="text"
                        value={editData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        placeholder="@tu_usuario"
                        className="bg-[#27323a] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0099ff] border border-[#27323a] hover:border-[#0099ff]/50 transition-colors"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{userData.name}</h2>
                    <p className="text-[#0099ff] text-lg mb-4">{userData.username}</p>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="bg-gradient-to-r from-[#0099ff] to-[#00ff88] text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {userData.level}
                      </span>
                      <span className="bg-[#27323a] text-gray-300 px-4 py-2 rounded-full text-sm">
                        {userData.reputation} RP
                      </span>
                      <div className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">{userData.status}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Bio y información adicional */}
            <div className="mt-8">
              {isEditing ? (
                <div className="space-y-4">
                  <textarea
                    value={editData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Cuéntanos sobre ti..."
                    className="w-full bg-[#27323a] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0099ff] resize-none border border-[#27323a] hover:border-[#0099ff]/50 transition-colors"
                    rows={3}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="📍 Tu ubicación"
                      className="bg-[#27323a] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0099ff] border border-[#27323a] hover:border-[#0099ff]/50 transition-colors"
                    />
                    <input
                      type="url"
                      value={editData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="🌐 Tu sitio web"
                      className="bg-[#27323a] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0099ff] border border-[#27323a] hover:border-[#0099ff]/50 transition-colors"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">{userData.bio}</p>
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <span className="text-[#0099ff]">📍</span>
                      <span>{userData.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <span className="text-[#0099ff]">🌐</span>
                      <a href={userData.website} target="_blank" rel="noopener noreferrer" className="hover:text-[#0099ff] transition-colors">
                        {userData.website}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <span className="text-[#0099ff]">📅</span>
                      <span>Se unió en {userData.joinDate}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Botones de acción */}
            <div className="mt-8 flex flex-wrap gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-green-500/25 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span>Guardar Cambios</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-[#27323a] text-gray-300 px-6 py-3 rounded-xl hover:bg-[#3a3a3a] transition-all duration-200 border border-[#27323a] hover:border-gray-500"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-gradient-to-r from-[#0099ff] to-[#00ff88] text-white px-6 py-3 rounded-xl hover:from-[#0088ee] hover:to-[#00ee77] transition-all duration-200 shadow-lg hover:shadow-[#0099ff]/25 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                  <span>Editar Perfil</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Estadísticas - Nuevo diseño */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-6 border border-[#27323a] text-center hover:border-[#0099ff]/30 transition-all duration-200 group">
            <div className="text-3xl font-bold text-white group-hover:text-[#0099ff] transition-colors">{stats.totalPosts}</div>
            <div className="text-sm text-gray-400 mt-1">Publicaciones</div>
            <div className="w-full bg-[#27323a] rounded-full h-1 mt-3">
              <div className="bg-gradient-to-r from-[#0099ff] to-[#00ff88] h-1 rounded-full" style={{width: '75%'}}></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-6 border border-[#27323a] text-center hover:border-[#0099ff]/30 transition-all duration-200 group">
            <div className="text-3xl font-bold text-white group-hover:text-[#0099ff] transition-colors">{stats.followers}</div>
            <div className="text-sm text-gray-400 mt-1">Seguidores</div>
            <div className="w-full bg-[#27323a] rounded-full h-1 mt-3">
              <div className="bg-gradient-to-r from-[#0099ff] to-[#00ff88] h-1 rounded-full" style={{width: '90%'}}></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-6 border border-[#27323a] text-center hover:border-[#0099ff]/30 transition-all duration-200 group">
            <div className="text-3xl font-bold text-white group-hover:text-[#0099ff] transition-colors">{stats.following}</div>
            <div className="text-sm text-gray-400 mt-1">Siguiendo</div>
            <div className="w-full bg-[#27323a] rounded-full h-1 mt-3">
              <div className="bg-gradient-to-r from-[#0099ff] to-[#00ff88] h-1 rounded-full" style={{width: '60%'}}></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-6 border border-[#27323a] text-center hover:border-[#0099ff]/30 transition-all duration-200 group">
            <div className="text-3xl font-bold text-[#0099ff] group-hover:text-[#00ff88] transition-colors">{userData.ap}</div>
            <div className="text-sm text-gray-400 mt-1">ArquiPuntos</div>
            <div className="w-full bg-[#27323a] rounded-full h-1 mt-3">
              <div className="bg-gradient-to-r from-[#0099ff] to-[#00ff88] h-1 rounded-full" style={{width: '85%'}}></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-6 border border-[#27323a] text-center hover:border-[#0099ff]/30 transition-all duration-200 group">
            <div className="text-3xl font-bold text-green-400 group-hover:text-[#00ff88] transition-colors">{userData.rp}</div>
            <div className="text-sm text-gray-400 mt-1">Reputación</div>
            <div className="w-full bg-[#27323a] rounded-full h-1 mt-3">
              <div className="bg-gradient-to-r from-green-400 to-[#00ff88] h-1 rounded-full" style={{width: '95%'}}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Logros */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-6 border border-[#27323a]">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#0099ff] to-[#00ff88] rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🏆</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Logros</h3>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 shadow-lg shadow-green-500/10' 
                      : 'bg-[#27323a] border border-[#27323a] hover:border-[#0099ff]/30'
                  }`}
                >
                  <div className={`text-3xl ${achievement.unlocked ? 'animate-bounce' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold text-lg ${
                      achievement.unlocked ? 'text-white' : 'text-gray-400'
                    }`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${
                      achievement.unlocked ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                  {!achievement.unlocked && (
                    <button
                      onClick={() => claimAchievement(achievement.id)}
                      className="bg-gradient-to-r from-[#0099ff] to-[#00ff88] text-white px-4 py-2 rounded-lg text-sm hover:from-[#0088ee] hover:to-[#00ee77] transition-all duration-200 shadow-lg hover:shadow-[#0099ff]/25"
                    >
                      Reclamar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actividad Reciente */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-6 border border-[#27323a]">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#0099ff] to-[#00ff88] rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Actividad Reciente</h3>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-[#27323a] rounded-xl hover:bg-[#3a3a3a] transition-all duration-200 group">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.ap > 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <p className="text-white font-medium group-hover:text-[#0099ff] transition-colors">{activity.action}</p>
                      <p className="text-sm text-gray-400">{activity.timestamp}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-bold px-3 py-1 rounded-full ${
                    activity.ap > 0 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {activity.ap > 0 ? '+' : ''}{activity.ap} AP
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notificación flotante mejorada */}
        {showNotification && (
          <div className="fixed top-4 right-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-slide-in border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <div>
                <span className="font-semibold text-lg">{notificationMessage}</span>
                <div className="text-xs text-white/80 mt-1">ArquiFi Perfil</div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-xl animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;