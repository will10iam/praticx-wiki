import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Manuais from './pages/Manuais/Manuais';
import ManualView from './pages/ManualView/ManualView';
import Upload from './pages/Upload/Upload';
import Login from './pages/Login/Login';
import Perfil from './pages/Perfil/Perfil';
import CategoryManagement from './pages/CategoryManagement/CategoryManagement';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manuais"
            element={
              <ProtectedRoute>
                <Manuais />
              </ProtectedRoute>} />
          <Route path="/manual/:id"
            element={
              <ProtectedRoute>
                <ManualView />
              </ProtectedRoute>} />
          <Route path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>} />
          <Route path="/gerenciar-categorias"
            element={
              <ProtectedRoute>
                <CategoryManagement />
              </ProtectedRoute>
            } />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;

