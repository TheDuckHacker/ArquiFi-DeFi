import React from 'react';

const Games = () => {
  const games = [
    {
      id: 1,
      name: "Trivia DeFi",
      description: "Pon a prueba tus conocimientos sobre finanzas descentralizadas",
      players: 1250,
      reward: "50 KP",
      difficulty: "Intermedio",
      status: "Disponible"
    },
    {
      id: 2,
      name: "Predicción de Precios",
      description: "Predice el precio de BTC en las próximas 24 horas",
      players: 890,
      reward: "100 KP",
      difficulty: "Avanzado",
      status: "Disponible"
    },
    {
      id: 3,
      name: "Misión Semanal",
      description: "Completa tareas específicas para ganar recompensas",
      players: 2100,
      reward: "200 KP + 0.001 BTC",
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
            <p className="text-blue-400 text-2xl font-bold">2,450 KP</p>
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
                  
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                    Jugar Ahora
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
                      <p className="text-blue-400 font-bold">{player.points.toLocaleString()} KP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
