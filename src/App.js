import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Tienda from './components/pages/Tienda/Tienda';

function App() {
  return (
    <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Tienda />} />
      
    </Routes>
  );
}

export default App;
