import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ProfileForm = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    // Verificar si los datos del perfil ya existen
    if (user) {
      // Actualizar los campos del formulario con los datos del perfil
      if (user.name) setName(user.name);
      if (user.email) setEmail(user.email);
      if (user.age) setAge(user.age);
      if (user.image) setImage(user.image);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch('/api/submit_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId: user.sub,
          name,
          email,
          age,
        }),
      });

      if (response.ok) {
        // Perfil actualizado con éxito
        // Redirigir a otra página o mostrar un mensaje de éxito

        // Actualizar los datos del perfil en el estado local
        const updatedUserData = await response.json();
        setName(updatedUserData.name);
        setEmail(updatedUserData.email);
        setAge(updatedUserData.age);
        setImage(updatedUserData.image);
      } else {
        // Manejar el error de actualización del perfil
      }
    } catch (error) {
      console.error(error);
      // Manejar el error de autenticación o de red
    }
  };

  return (
    <div>
      <h1>Completa tu perfil</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="age">Edad:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <input type="submit" value="Guardar perfil" />
      </form>
    </div>
  );
};

export default ProfileForm;