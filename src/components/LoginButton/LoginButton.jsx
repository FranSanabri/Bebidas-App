import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI || `${window.location.origin}/authorize`;

  const handleClick = () => {
    loginWithRedirect({
      redirectUri: redirectUri,
    });
  };

  return (
    <li className="nav-item">
      <NavLink className="nav-links" onClick={handleClick}>
        Ingresar
      </NavLink>
    </li>
  );
};

export default Login;
