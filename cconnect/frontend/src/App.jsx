import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import CustomerList from './pages/CustomerList';
import CustomerDetail from './pages/CustomerDetail';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<Analytics />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App; 