import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Tienda from './components/pages/Tienda/Tienda';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import EditProducto from './components/EditProducto/EditProducto';
import ContactUs from './components/pages/ContactUs/ContactUs';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tienda" element={<Tienda />} />
      <Route path="/profilepage" element={<ProfilePage />} />
      <Route path="/editar/:id" element={<EditProducto />} />
      <Route path="/contactus" element={<ContactUs />} />
    </Routes>
  );
}

export default App;
