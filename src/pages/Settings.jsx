import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    language: 'es',
    theme: 'dark',
    notifications: true,
    emailNotifications: true,
    pushNotifications: false,
    soundEnabled: true,
    autoStaking: false,
    riskLevel: 'medium',
    twoFactorAuth: false,
    privacyMode: false,
    dataSharing: true,
    marketingEmails: false
  });

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    // Cargar configuraciones guardadas
    const savedSettings = localStorage.getItem('arquiFi_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const showNotificationWithMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      // Simular tiempo de guardado
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.setItem('arquiFi_settings', JSON.stringify(settings));
      showNotificationWithMessage('Configuraciones guardadas exitosamente');
    } catch (error) {
      console.error('Error guardando configuraciones:', error);
      showNotificationWithMessage('Error al guardar configuraciones');
    } finally {
      setIsSaving(false);
    }
  };

  const resetSettings = () => {
    const defaultSettings = {
      language: 'es',
      theme: 'dark',
      notifications: true,
      emailNotifications: true,
      pushNotifications: false,
      soundEnabled: true,
      autoStaking: false,
      riskLevel: 'medium',
      twoFactorAuth: false,
      privacyMode: false,
      dataSharing: true,
      marketingEmails: false
    };
    setSettings(defaultSettings);
    showNotificationWithMessage('Configuraciones restablecidas');
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'arquiFi_settings.json';
    link.click();
    showNotificationWithMessage('Configuraciones exportadas');
  };

  const importSettings = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result);
          setSettings(importedSettings);
          showNotificationWithMessage('Configuraciones importadas');
        } catch (error) {
          showNotificationWithMessage('Error al importar configuraciones');
        }
      };
      reader.readAsText(file);
    }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'notifications', name: 'Notificaciones', icon: '🔔' },
    { id: 'security', name: 'Seguridad', icon: '🔒' },
    { id: 'privacy', name: 'Privacidad', icon: '🛡️' },
    { id: 'advanced', name: 'Avanzado', icon: '🔧' }
  ];

  return (
    <div className="min-h-screen bg-[#121012] text-white pt-20">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Configuraciones</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navegación lateral */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#27323a]">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#0099ff] text-white'
                        : 'text-gray-400 hover:text-white hover:bg-[#27323a]'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#27323a]">
              {/* General */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Configuración General</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Idioma
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) => handleSettingChange('language', e.target.value)}
                        className="w-full bg-[#27323a] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                        <option value="pt">Português</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Tema
                      </label>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleSettingChange('theme', 'light')}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            settings.theme === 'light'
                              ? 'bg-[#0099ff] text-white'
                              : 'bg-[#27323a] text-gray-400 hover:text-white'
                          }`}
                        >
                          Claro
                        </button>
                        <button
                          onClick={() => handleSettingChange('theme', 'dark')}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            settings.theme === 'dark'
                              ? 'bg-[#0099ff] text-white'
                              : 'bg-[#27323a] text-gray-400 hover:text-white'
                          }`}
                        >
                          Oscuro
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Nivel de Riesgo
                      </label>
                      <div className="flex space-x-4">
                        {['low', 'medium', 'high'].map((level) => (
                          <button
                            key={level}
                            onClick={() => handleSettingChange('riskLevel', level)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              settings.riskLevel === level
                                ? 'bg-[#0099ff] text-white'
                                : 'bg-[#27323a] text-gray-400 hover:text-white'
                            }`}
                          >
                            {level === 'low' ? 'Bajo' : level === 'medium' ? 'Medio' : 'Alto'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notificaciones */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Notificaciones</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#27323a] rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">Notificaciones Generales</h3>
                        <p className="text-sm text-gray-400">Recibir notificaciones de la plataforma</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications}
                          onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0099ff]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0099ff]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#27323a] rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">Notificaciones por Email</h3>
                        <p className="text-sm text-gray-400">Recibir notificaciones por correo electrónico</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0099ff]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0099ff]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#27323a] rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">Notificaciones Push</h3>
                        <p className="text-sm text-gray-400">Recibir notificaciones en el navegador</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.pushNotifications}
                          onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0099ff]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0099ff]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#27323a] rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">Sonidos</h3>
                        <p className="text-sm text-gray-400">Reproducir sonidos para notificaciones</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.soundEnabled}
                          onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0099ff]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0099ff]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Seguridad */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Seguridad</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#27323a] rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">Autenticación de Dos Factores</h3>
                        <p className="text-sm text-gray-400">Agregar una capa extra de seguridad</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.twoFactorAuth}
                          onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0099ff]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0099ff]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#27323a] rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">Auto-Staking</h3>
                        <p className="text-sm text-gray-400">Automáticamente hacer staking de recompensas</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.autoStaking}
                          onChange={(e) => handleSettingChange('autoStaking', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0099ff]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0099ff]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacidad */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Privacidad</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#27323a] rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">Modo Privacidad</h3>
                        <p className="text-sm text-gray-400">Ocultar información personal en el perfil</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.privacyMode}
                          onChange={(e) => handleSettingChange('privacyMode', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0099ff]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0099ff]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#27323a] rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">Compartir Datos</h3>
                        <p className="text-sm text-gray-400">Permitir el uso de datos para mejorar la experiencia</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.dataSharing}
                          onChange={(e) => handleSettingChange('dataSharing', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0099ff]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0099ff]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#27323a] rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">Emails de Marketing</h3>
                        <p className="text-sm text-gray-400">Recibir emails promocionales y actualizaciones</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.marketingEmails}
                          onChange={(e) => handleSettingChange('marketingEmails', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0099ff]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0099ff]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Avanzado */}
              {activeTab === 'advanced' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Configuración Avanzada</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-[#27323a] rounded-lg">
                      <h3 className="font-semibold text-white mb-2">Exportar Configuraciones</h3>
                      <p className="text-sm text-gray-400 mb-3">Descargar tus configuraciones como archivo JSON</p>
                      <button
                        onClick={exportSettings}
                        className="bg-[#0099ff] text-white px-4 py-2 rounded-lg hover:bg-[#0088ee] transition-colors"
                      >
                        Exportar
                      </button>
                    </div>

                    <div className="p-4 bg-[#27323a] rounded-lg">
                      <h3 className="font-semibold text-white mb-2">Importar Configuraciones</h3>
                      <p className="text-sm text-gray-400 mb-3">Cargar configuraciones desde un archivo JSON</p>
                      <input
                        type="file"
                        accept=".json"
                        onChange={importSettings}
                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0099ff] file:text-white hover:file:bg-[#0088ee]"
                      />
                    </div>

                    <div className="p-4 bg-[#27323a] rounded-lg">
                      <h3 className="font-semibold text-white mb-2">Restablecer Configuraciones</h3>
                      <p className="text-sm text-gray-400 mb-3">Volver a la configuración predeterminada</p>
                      <button
                        onClick={resetSettings}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Restablecer
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex space-x-3">
                <button
                  onClick={saveSettings}
                  disabled={isSaving}
                  className="bg-[#0099ff] text-white px-6 py-3 rounded-lg hover:bg-[#0088ee] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <span>Guardar Cambios</span>
                  )}
                </button>
              </div>
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

export default Settings;