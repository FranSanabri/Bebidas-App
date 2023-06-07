import React, { useState } from 'react';
import NavBar from '../../Navbar/Navbar';
import Carousel from '../../Carousel/Carousel';
import SearchResults from '../../SearchResults/SearchResults';
import Footer from '../../Footer/Footer';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    // Implementa la lógica para mostrar los detalles del producto en una ventana emergente
    // Puedes usar un estado adicional para controlar la visualización de la ventana emergente
  };

  return (
    <div>
      <NavBar setSearchResults={setSearchResults} />
      {searchResults.length === 0 && <Carousel />}
      <SearchResults searchResults={searchResults} handleProductClick={handleProductClick} />
      <Footer />
    </div>
  );
};

export default Home;
