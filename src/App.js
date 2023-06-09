import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Tienda from './components/pages/Tienda/Tienda';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import PageFilt from './components/pageFilt/pageFilt';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tienda" element={<Tienda />} />
      <Route path="/profilepage" element={<ProfilePage />} />
      <Route path="/tienda/:product/:page" element={<PageFilt />} />
    </Routes>
  );
}

export default App;
