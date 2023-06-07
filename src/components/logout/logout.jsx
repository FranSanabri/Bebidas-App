import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div>
      <li className='nav-item' onClick={handleLogout}>Cerrar sesión</li>
    </div>
  );
};

export default Logout;   
