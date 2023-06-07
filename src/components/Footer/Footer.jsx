import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="footer-item">
            <h2 className="footer-title">About</h2>
            <p className="footer-text">Aquí puedes agregar un resumen corto sobre tu empresa o proyecto.</p>
          </div>
          <div className="footer-item">
            <h2 className="footer-title">Contact</h2>
            <p className="footer-text">Aquí puedes agregar información de contacto, como dirección, correo electrónico y teléfono.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;