import { useState } from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';

function Footer() {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

  return (
    <footer className="footer-container">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="footer-item">
            <h2 className="footer-title">Sobre la empresa</h2>
            <p className="footer-text">Desde vinos y licores artesanales hasta destilados exclusivos, estamos comprometidos a ofrecerte una experiencia única. Únete a nosotros y descubre un mundo de sabores auténticos y placeres refinados. Salud y ¡a disfrutar responsablemente!</p>
          </div>
          <div className="footer-item-1">
            <h2 className="footer-title">Contactos</h2>
            <NavLink
              exact
              to="/contactus"
              activeClassName="active"
              className="footer-text-1"
              onClick={handleClick}
            >
              Comunicate con nosotros
            </NavLink>
            <div>
              <p className="footer-text-3">¿Quienes somos?</p>
              <p className="footer-text-2">Lenguajes utilizados</p>
            </div>
          </div>
          <div>
          <h2 className="footer-title">Formas de pago</h2>
            <img className='logo' src='https://www.jose-aguilar.com/blog/wp-content/uploads/2017/10/formas-de-pago.png' />
            <img className="img-footer" src="https://i.ibb.co/fN28Z9h/LOGO-2-DRINK-UP-Nav-Bar-1.png" alt="Logo" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
