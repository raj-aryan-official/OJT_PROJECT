import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './components/Analytics/Dashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/analytics" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App; 