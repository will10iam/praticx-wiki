import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} - Praticx Sistemas. Todos os direitos reservados.</p>
            <p>
                Desenvolvido por William Berbet.
            </p>

        </footer>
    )
}

export default Footer;