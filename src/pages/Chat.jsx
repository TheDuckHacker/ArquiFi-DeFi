import React, { useState, useEffect } from 'react';
import { database } from '../config/database';
import { userState } from '../utils/userState';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    if (activeChat) {
      loadMessages(activeChat.id);
    }
  }, [activeChat]);

  const loadChats = async () => {
    try {
      const user = userState.getState();
      if (!user.wallet) return;

      const chats = database.getUserChats(user.user.id);
      setChats(chats);
    } catch (error) {
      console.error('Error cargando chats:', error);
    }
  };

  const loadMessages = async (chatId) => {
    try {
      setIsLoading(true);
      const messages = database.getChatMessages(chatId);
      setMessages(messages);
    } catch (error) {
      console.error('Error cargando mensajes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeChat) return;

    try {
      const user = userState.getState();
      if (!user.wallet) {
        alert('Debes conectar tu wallet primero');
        return;
      }

      database.sendMessage(activeChat.id, user.user.id, newMessage);
      setNewMessage('');
      loadMessages(activeChat.id);
    } catch (error) {
      console.error('Error enviando mensaje:', error);
    }
  };

  const startNewChat = async (userId) => {
    try {
      const user = userState.getState();
      if (!user.wallet) {
        alert('Debes conectar tu wallet primero');
        return;
      }

      // Para demo, usar chat existente
      const existingChat = database.getUserChats(user.user.id)[0];
      if (existingChat) {
        setActiveChat(existingChat);
      }
    } catch (error) {
      console.error('Error iniciando chat:', error);
    }
  };

  return (
    <div className="p-6 bg-background-dark min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-2xl font-bold mb-6">Chats</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de chats */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-white text-lg font-semibold mb-4">Conversaciones</h2>
            <div className="space-y-2">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeChat?.id === chat.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {chat.participants?.[0]?.users?.username?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">
                        {chat.participants?.[0]?.users?.username || 'Usuario'}
                      </p>
                      <p className="text-sm opacity-75">
                        {chat.participants?.[0]?.users?.level || 'Novato'}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Área de mensajes */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg flex flex-col">
            {activeChat ? (
              <>
                {/* Header del chat */}
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {activeChat.participants?.[0]?.users?.username?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">
                        {activeChat.participants?.[0]?.users?.username || 'Usuario'}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {activeChat.participants?.[0]?.users?.reputation_points || 0} RP
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mensajes */}
                <div className="flex-1 p-4 overflow-y-auto max-h-96">
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.user_id === userState.getState().user?.id
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.user_id === userState.getState().user?.id
                                ? 'bg-primary text-white'
                                : 'bg-gray-700 text-white'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-75 mt-1">
                              {new Date(message.created_at).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input de mensaje */}
                <div className="p-4 border-t border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Escribe un mensaje..."
                      className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">send</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-400">Selecciona una conversación para comenzar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
