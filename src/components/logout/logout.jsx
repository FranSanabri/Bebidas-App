import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <li className="nav-item">
       <NavLink
                    exact
                    to="/logout"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleLogout}
                  >
                    Cerrar Sesion
                  </NavLink>
    </li>
  );
};

export default Logout;   
