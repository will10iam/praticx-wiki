import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Manuais from './pages/Manuais/Manuais';
import ManualView from './pages/ManualView/ManualView';
import Upload from './pages/Upload/Upload';
import Login from './pages/Login/Login';
import Perfil from './pages/Perfil/Perfil';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manuais" element={<Manuais />} />
        <Route path="/manual/:id" element={<ManualView />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

