import React from 'react';

const Education = () => {
  const courses = [
    {
      id: 1,
      title: "Introducción a DeFi",
      description: "Aprende los conceptos básicos de las finanzas descentralizadas",
      duration: "2 horas",
      level: "Principiante",
      progress: 75,
      reward: "100 KP"
    },
    {
      id: 2,
      title: "Stacking Avanzado",
      description: "Domina las estrategias de stacking y yield farming",
      duration: "3 horas",
      level: "Intermedio",
      progress: 45,
      reward: "150 KP"
    },
    {
      id: 3,
      title: "Gobernanza DAO",
      description: "Participa efectivamente en la gobernanza descentralizada",
      duration: "1.5 horas",
      level: "Intermedio",
      progress: 0,
      reward: "75 KP"
    }
  ];

  const missions = [
    {
      id: 1,
      title: "Primer Stacking",
      description: "Realiza tu primer stacking de BTC",
      reward: "50 KP + 0.001 BTC",
      status: "Completada",
      completed: true
    },
    {
      id: 2,
      title: "Conectar Wallet",
      description: "Conecta tu billetera a la plataforma",
      reward: "25 KP",
      status: "Completada",
      completed: true
    },
    {
      id: 3,
      title: "Votar en DAO",
      description: "Participa en tu primera votación DAO",
      reward: "100 KP",
      status: "En Progreso",
      completed: false
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-8">
          Centro de Aprendizaje
        </h1>
        
        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">Cursos Completados</h3>
            <p className="text-green-400 text-2xl font-bold">2</p>
            <p className="text-gray-400 text-sm">De 5 disponibles</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">Misiones Completadas</h3>
            <p className="text-blue-400 text-2xl font-bold">2</p>
            <p className="text-gray-400 text-sm">De 3 activas</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">KP Ganados</h3>
            <p className="text-yellow-400 text-2xl font-bold">325</p>
            <p className="text-gray-400 text-sm">Esta semana</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">Nivel de Conocimiento</h3>
            <p className="text-purple-400 text-2xl font-bold">Intermedio</p>
            <p className="text-gray-400 text-sm">Progreso: 60%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Courses */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-6">Cursos Disponibles</h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-2">{course.title}</h3>
                      <p className="text-gray-300 mb-4">{course.description}</p>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-gray-400">⏱️ {course.duration}</span>
                        <span className="text-blue-400">📊 {course.level}</span>
                        <span className="text-yellow-400">🏆 {course.reward}</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Progreso</span>
                          <span className="text-white">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className={`px-6 py-2 rounded-lg transition-colors ${
                    course.progress > 0 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}>
                    {course.progress > 0 ? 'Continuar' : 'Comenzar'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Missions */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-6">Misiones Educativas</h2>
            <div className="space-y-4">
              {missions.map((mission) => (
                <div key={mission.id} className={`rounded-lg p-6 ${
                  mission.completed ? 'bg-green-900/30 border border-green-500' : 'bg-gray-800'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-2">{mission.title}</h3>
                      <p className="text-gray-300 mb-4">{mission.description}</p>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-yellow-400">🏆 {mission.reward}</span>
                        <span className={`px-2 py-1 rounded text-sm ${
                          mission.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-yellow-500 text-white'
                        }`}>
                          {mission.status}
                        </span>
                      </div>
                    </div>
                    {mission.completed && (
                      <div className="text-green-400 text-2xl">✅</div>
                    )}
                  </div>
                  
                  {!mission.completed && (
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                      Completar Misión
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
