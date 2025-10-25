import React, { useState, useEffect } from 'react';
import { database } from '../config/database';
import { userState } from '../utils/userState';

const Social = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const posts = database.getPosts();
      setPosts(posts);
    } catch (error) {
      console.error('Error cargando posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPost = async () => {
    if (!newPost.trim()) return;

    try {
      const user = userState.getState();
      if (!user.wallet) {
        alert('Debes conectar tu wallet primero');
        return;
      }

      const newPostData = database.createPost(user.user.id, newPost);
      setNewPost('');
      loadPosts();
      userState.showNotification('¡Publicación creada!', 'success');
    } catch (error) {
      console.error('Error creando post:', error);
      userState.showNotification('Error creando publicación', 'error');
    }
  };

  const likePost = async (postId, currentLikes) => {
    try {
      database.likePost(postId);
      loadPosts();
    } catch (error) {
      console.error('Error dando like:', error);
    }
  };

  const sharePost = async (postId, currentShares) => {
    try {
      database.sharePost(postId);
      loadPosts();
    } catch (error) {
      console.error('Error compartiendo:', error);
    }
  };

  return (
    <div className="p-6 bg-background-dark min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-2xl font-bold">Social Feed</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'feed' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Feed
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'trending' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Trending
            </button>
          </div>
        </div>

        {/* Crear publicación */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">U</span>
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="¿Qué está pasando en ArquiFi?"
                className="w-full bg-gray-700 text-white p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
              <div className="flex justify-between items-center mt-3">
                <div className="flex space-x-4">
                  <button className="text-gray-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">image</span>
                  </button>
                  <button className="text-gray-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">gif</span>
                  </button>
                </div>
                <button
                  onClick={createPost}
                  disabled={!newPost.trim()}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed de publicaciones */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {post.users?.username?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-white font-semibold">
                        {post.users?.username || 'Usuario'}
                      </h3>
                      <span className="text-gray-400 text-sm">
                        {post.users?.level || 'Novato'}
                      </span>
                      <span className="text-primary text-sm">
                        {post.users?.reputation_points || 0} RP
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">{post.content}</p>
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => likePost(post.id, post.likes_count)}
                        className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">favorite</span>
                        <span>{post.likes_count}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">comment</span>
                        <span>{post.comments_count}</span>
                      </button>
                      <button
                        onClick={() => sharePost(post.id, post.shares_count)}
                        className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">share</span>
                        <span>{post.shares_count}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Social;