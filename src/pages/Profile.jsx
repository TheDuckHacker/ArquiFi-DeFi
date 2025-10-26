import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "SatoshiN",
    username: "@satoshi",
    avatar: "S",
    reputation: 850,
    level: "Visionario",
    status: "Online",
    ap: 1000,
    rp: 850,
    joinDate: "Enero 2024",
    bio: "Entusiasta de DeFi y blockchain. Construyendo el futuro de las finanzas descentralizadas.",
    location: "México",
    website: "https://satoshi.dev"
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
    <div className="min-h-screen bg-[#121012] text-white">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
        
        {/* Header del perfil */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a] mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-[#0099ff] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {userData.avatar}
              </div>
              <div>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-[#27323a] text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                    />
                    <input
                      type="text"
                      value={editData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="bg-[#27323a] text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                    <p className="text-gray-400">{userData.username}</p>
                  </div>
                )}
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-green-400 text-sm font-medium">{userData.level}</span>
                  <span className="text-gray-400 text-sm">{userData.reputation} RP</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-400 text-sm">{userData.status}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <textarea
                    value={editData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Cuéntanos sobre ti..."
                    className="w-full bg-[#27323a] text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff] resize-none"
                    rows={3}
                  />
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Ubicación"
                    className="w-full bg-[#27323a] text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                  />
                  <input
                    type="url"
                    value={editData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="Sitio web"
                    className="w-full bg-[#27323a] text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                  />
                </div>
              ) : (
                <div>
                  <p className="text-gray-300 mb-2">{userData.bio}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>📍 {userData.location}</span>
                    <span>🌐 {userData.website}</span>
                    <span>📅 Se unió en {userData.joinDate}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-[#0099ff] text-white px-4 py-2 rounded-lg hover:bg-[#0088ee] transition-colors"
                >
                  Editar Perfil
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#27323a] text-center">
            <p className="text-2xl font-bold text-white">{stats.totalPosts}</p>
            <p className="text-sm text-gray-400">Publicaciones</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#27323a] text-center">
            <p className="text-2xl font-bold text-white">{stats.followers}</p>
            <p className="text-sm text-gray-400">Seguidores</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#27323a] text-center">
            <p className="text-2xl font-bold text-white">{stats.following}</p>
            <p className="text-sm text-gray-400">Siguiendo</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#27323a] text-center">
            <p className="text-2xl font-bold text-[#0099ff]">{userData.ap}</p>
            <p className="text-sm text-gray-400">AP</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#27323a] text-center">
            <p className="text-2xl font-bold text-green-400">{userData.rp}</p>
            <p className="text-sm text-gray-400">RP</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Logros */}
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a]">
            <h3 className="text-xl font-bold text-white mb-4">Logros</h3>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    achievement.unlocked 
                      ? 'bg-green-500/20 border border-green-500/30' 
                      : 'bg-gray-700/50 border border-gray-600'
                  }`}
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
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
                      className="bg-[#0099ff] text-white px-3 py-1 rounded text-sm hover:bg-[#0088ee] transition-colors"
                    >
                      Reclamar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actividad Reciente */}
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a]">
            <h3 className="text-xl font-bold text-white mb-4">Actividad Reciente</h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-[#27323a] rounded-lg">
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-400">{activity.timestamp}</p>
                  </div>
                  <div className={`text-sm font-semibold ${
                    activity.ap > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {activity.ap > 0 ? '+' : ''}{activity.ap} AP
                  </div>
                </div>
              ))}
            </div>
          </div>
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

export default Profile;