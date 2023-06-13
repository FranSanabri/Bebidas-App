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
            <p className="footer-text">Disfruta de momentos inolvidables con nuestras exquisitas bebidas alcohólicas. En DrinkUp, tenemos dedicación a la excelencia se refleja en cada botella, donde fusionamos la tradición con la innovación. Desde vinos y licores artesanales hasta destilados exclusivos, estamos comprometidos a ofrecerte una experiencia única. Únete a nosotros y descubre un mundo de sabores auténticos y placeres refinados. Salud y ¡a disfrutar responsablemente!</p>
          </div>
          <div className="footer-item">
            <h2 className="footer-title">Contactos</h2>
            <NavLink
              exact
              to="/contactus"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Comunicate con nosotros
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
