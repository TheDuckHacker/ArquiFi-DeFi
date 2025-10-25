import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Dashboard from './pages/Dashboard';
import Social from './pages/Social';
import Chat from './pages/Chat';
import Wallet from './pages/Wallet';
import Governance from './pages/Governance';
import Games from './pages/Games';
import Education from './pages/Education';
import P2P from './pages/P2P';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/social" element={<Social />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/games" element={<Games />} />
          <Route path="/education" element={<Education />} />
          <Route path="/p2p" element={<P2P />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;