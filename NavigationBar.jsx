import React from 'react';

const NavigationBar = () => {
  return (
    <nav className="bg-gray-900 px-6 py-4 flex items-center justify-between">
      {/* Left Section - Brand/Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-500 flex items-center justify-center">
          <div className="w-4 h-4 bg-blue-300 transform rotate-45"></div>
        </div>
        <span className="text-white font-bold text-xl">ArquiFI</span>
      </div>

      {/* Middle Section - Navigation Links */}
      <div className="flex items-center space-x-8">
        <NavLink icon="🏠" text="Inicio" />
        <NavLink icon="👥" text="Social" />
        <NavLink icon="💼" text="Billetera" />
        <NavLink icon="🎓" text="Aprender" active={true} />
        
      </div>

      {/* Right Section - User Status/Notifications */}
      <div className="flex items-center space-x-4">
        {/* XP Indicator */}
        <div className="bg-gray-700 rounded-lg px-3 py-2 flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">★</span>
          </div>
          <span className="text-white text-sm font-medium">1000 XP</span>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-600"></div>

        {/* RP Indicator */}
        <div className="bg-gray-700 rounded-lg px-3 py-2 flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <span className="text-white text-sm font-medium">850 RP</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button className="text-white hover:text-blue-400 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>

        {/* User Profile */}
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">U</span>
        </div>
      </div>
    </nav>
  );
};

// Componente para los enlaces de navegación
const NavLink = ({ icon, text, active = false }) => {
  return (
    <a 
      href="#" 
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
        active 
          ? 'text-blue-400 bg-blue-900/20' 
          : 'text-white hover:text-blue-400 hover:bg-gray-800'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{text}</span>
    </a>
  );
};

export default NavigationBar;
