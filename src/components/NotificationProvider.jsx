import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';

const NotificationContext = createContext();

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const { notifications, updateFriendRequests } = useNotifications();
  const [showGlobalNotification, setShowGlobalNotification] = useState(false);
  const [globalNotificationMessage, setGlobalNotificationMessage] = useState('');

  const showNotification = (message, duration = 3000) => {
    setGlobalNotificationMessage(message);
    setShowGlobalNotification(true);
    setTimeout(() => {
      setShowGlobalNotification(false);
    }, duration);
  };

  // Simular nuevas notificaciones cada cierto tiempo
  useEffect(() => {
    const interval = setInterval(() => {
      // Simular nuevas solicitudes de amistad ocasionalmente
      if (Math.random() < 0.1) { // 10% de probabilidad cada 30 segundos
        const newCount = notifications.friendRequests + 1;
        updateFriendRequests(newCount);
        showNotification(`🔔 Nueva solicitud de amistad recibida!`);
      }
    }, 30000); // Cada 30 segundos

    return () => clearInterval(interval);
  }, [notifications.friendRequests, updateFriendRequests]);

  const value = {
    notifications,
    updateFriendRequests,
    showNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      {/* Notificación global flotante */}
      {showGlobalNotification && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-slide-in border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
            </div>
            <div>
              <span className="font-semibold text-lg">{globalNotificationMessage}</span>
              <div className="text-xs text-white/80 mt-1">ArquiFi Notificaciones</div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-xl animate-pulse"></div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};
