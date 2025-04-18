import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewAnalysis from './pages/NewAnalysis';
import AnalysisDetail from './pages/AnalysisDetail';
import FundamentalAnalysis from './pages/FundamentalAnalysis'; // Adicione esta importação
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={5000} />
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/analysis/new" 
              element={
                <PrivateRoute>
                  <NewAnalysis />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/analysis/:id" 
              element={
                <PrivateRoute>
                  <AnalysisDetail />
                </PrivateRoute>
              } 
            />
            {/* Adicione a nova rota para análise fundamentalista */}
            <Route 
              path="/analise/:ticker" 
              element={
                <PrivateRoute>
                  <FundamentalAnalysis />
                </PrivateRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
