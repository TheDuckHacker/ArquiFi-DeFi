import React, { useState } from 'react';

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [earnedAP, setEarnedAP] = useState(0);
  const [userAP, setUserAP] = useState(1000);

  const startGame = async (game) => {
    setSelectedGame(game);
    setIsPlaying(true);
    setGameScore(0);
    
    // Simular juego
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Calcular puntaje y recompensa
    const score = Math.floor(Math.random() * 100) + 50;
    const apEarned = Math.floor(score / 10);
    
    setGameScore(score);
    setEarnedAP(apEarned);
    setUserAP(prev => prev + apEarned);
    setIsPlaying(false);
    setShowReward(true);
    
    setTimeout(() => setShowReward(false), 5000);
  };

  const games = [
    {
      id: 1,
      name: "Trivia DeFi",
      description: "Pon a prueba tus conocimientos sobre finanzas descentralizadas",
      players: 1250,
      reward: "50 AP",
      difficulty: "Intermedio",
      status: "Disponible"
    },
    {
      id: 2,
      name: "Predicción de Precios",
      description: "Predice el precio de BTC en las próximas 24 horas",
      players: 890,
      reward: "100 AP",
      difficulty: "Avanzado",
      status: "Disponible"
    },
    {
      id: 3,
      name: "Misión Semanal",
      description: "Completa tareas específicas para ganar recompensas",
      players: 2100,
      reward: "200 AP + 0.001 BTC",
      difficulty: "Fácil",
      status: "Disponible"
    }
  ];

  const leaderboard = [
    { rank: 1, user: "crypto_master", points: 15420, level: "Leyenda" },
    { rank: 2, user: "defi_king", points: 12850, level: "Maestro" },
    { rank: 3, user: "blockchain_guru", points: 11200, level: "Experto" },
    { rank: 4, user: "you", points: 8500, level: "Avanzado" },
    { rank: 5, user: "trading_pro", points: 7800, level: "Avanzado" }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-8">
          Centro de Gamificación
        </h1>
        
        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">Koquipuntos</h3>
            <p className="text-blue-400 text-2xl font-bold">2,450 AP</p>
            <p className="text-gray-400 text-sm">Nivel: Visionario</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">Ranking</h3>
            <p className="text-yellow-400 text-2xl font-bold">#42</p>
            <p className="text-gray-400 text-sm">Global</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">Juegos Completados</h3>
            <p className="text-green-400 text-2xl font-bold">15</p>
            <p className="text-gray-400 text-sm">Esta semana</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">Recompensas</h3>
            <p className="text-purple-400 text-2xl font-bold">0.05 BTC</p>
            <p className="text-gray-400 text-sm">Ganadas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Games List */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-6">Juegos Disponibles</h2>
            <div className="space-y-4">
              {games.map((game) => (
                <div key={game.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-2">{game.name}</h3>
                      <p className="text-gray-300 mb-4">{game.description}</p>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-gray-400">👥 {game.players} jugadores</span>
                        <span className="text-yellow-400">🏆 {game.reward}</span>
                        <span className="text-blue-400">📊 {game.difficulty}</span>
                      </div>
                    </div>
                    <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                      {game.status}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => startGame(game)}
                    disabled={isPlaying}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isPlaying && selectedGame?.id === game.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Jugando...</span>
                      </>
                    ) : (
                      <span>Jugar Ahora</span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-6">Ranking Global</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="space-y-4">
                {leaderboard.map((player, index) => (
                  <div key={index} className={`flex items-center space-x-4 p-3 rounded-lg ${
                    player.user === 'you' ? 'bg-blue-900/30' : 'bg-gray-700'
                  }`}>
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">#{player.rank}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">@{player.user}</p>
                      <p className="text-gray-400 text-sm">{player.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-400 font-bold">{player.points.toLocaleString()} AP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notificación de recompensa */}
      {showReward && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="font-medium">¡Ganaste {earnedAP} AP! Puntaje: {gameScore}</span>
          </div>
        </div>
      )}

      {/* Modal de juego en progreso */}
      {isPlaying && selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-lg p-8 max-w-md w-full mx-4 animate-bounce-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0099ff] rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Jugando {selectedGame.name}</h3>
              <p className="text-gray-400 mb-4">Calculando tu puntaje...</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-[#0099ff] h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;
