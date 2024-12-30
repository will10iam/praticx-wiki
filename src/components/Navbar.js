import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../assets/logo.svg'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={Logo} alt='Logo da Empresa' />
                </Link>

            </div>
            <div className="navbar-links">
                <Link to='/'>Home</Link>
                <Link to='/manuais'>Manuais</Link>
                <Link to='/upload'>Upload</Link>
                <Link to='/login'>Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;
