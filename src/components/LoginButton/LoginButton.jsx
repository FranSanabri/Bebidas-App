import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  const handleClick = () => {
    loginWithRedirect();
  };

  return (
    <li className="nav-item">
      <NavLink
        className="nav-links"
        to="/login"
        onClick={handleClick}
      >
        Ingresar
      </NavLink>
    </li>
  );
};

export default Login;
