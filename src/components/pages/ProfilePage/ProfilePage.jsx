import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileForm from '../../ProfilesForm/ProfileForm';

const ProfilePage = () => {
  const { user } = useAuth0();

  return (
    <div>
      <h1>Página de perfil</h1>
      {user && <ProfileForm />}
      {/* Mostrar otros detalles del perfil */}
    </div>
  );
};

export default ProfilePage;