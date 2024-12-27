import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Manuals from './pages/Manuals';
import ManualView from './pages/ManualView';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manuals" element={<Manuals />} />
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

