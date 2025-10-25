import React from 'react';
import NavigationBar from './NavigationBar';
import './NavigationBar.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <NavigationBar />
      
      {/* Contenido principal de la aplicación */}
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-3xl font-bold mb-8">
            Bienvenido a ArquiFi
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-white text-xl font-bold mb-4">Dashboard</h2>
              <p className="text-gray-300">
                Gestiona tu portfolio y monitorea tus inversiones en DeFi.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-white text-xl font-bold mb-4">Social</h2>
              <p className="text-gray-300">
                Conecta con otros usuarios y comparte conocimiento.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-white text-xl font-bold mb-4">Aprender</h2>
              <p className="text-gray-300">
                Tutoriales y cursos sobre finanzas descentralizadas.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
