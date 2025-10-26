import { useState, useEffect } from 'react';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState({
    friendRequests: 4, // Solicitudes de amistad pendientes
    systemUpdates: 2,  // Actualizaciones del sistema
    socialActivity: 1  // Actividad social (likes, comentarios, etc.)
  });

  const [totalNotifications, setTotalNotifications] = useState(0);

  useEffect(() => {
    // Calcular el total de notificaciones
    const total = Object.values(notifications).reduce((sum, count) => sum + count, 0);
    setTotalNotifications(total);
  }, [notifications]);

  const updateFriendRequests = (count) => {
    setNotifications(prev => ({
      ...prev,
      friendRequests: count
    }));
  };

  const updateSystemUpdates = (count) => {
    setNotifications(prev => ({
      ...prev,
      systemUpdates: count
    }));
  };

  const updateSocialActivity = (count) => {
    setNotifications(prev => ({
      ...prev,
      socialActivity: count
    }));
  };

  const clearAllNotifications = () => {
    setNotifications({
      friendRequests: 0,
      systemUpdates: 0,
      socialActivity: 0
    });
  };

  return {
    notifications,
    totalNotifications,
    updateFriendRequests,
    updateSystemUpdates,
    updateSocialActivity,
    clearAllNotifications
  };
};
