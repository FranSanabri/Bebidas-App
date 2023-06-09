import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../Navbar/Navbar';
import SearchBar from '../../SearchBar/SearchBar';
import './Tienda.css';
import Toolbar from '../../ToolBar/ToolBar';
import SearchResults from '../../SearchResults/SearchResults';
import Footer from '../../Footer/Footer'

function Tienda() {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://servidor-vinos.onrender.com/product/all', {
          params: {
            paginas: 1
          }
        });

        // Verificar si la respuesta fue exitosa y actualizar los resultados de búsqueda
        if (response.status === 200) {
          setSearchResults(response.data);
        } else {
          console.error('Error al buscar productos:', response.data.error);
        }
      } catch (error) {
        console.error('Error al buscar productos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <NavBar />
      <Toolbar />
      <div className="Tienda-Search">
        <SearchBar setSearchResults={setSearchResults} />
      </div>
      <div className="product-list">
        <SearchResults searchResults={searchResults} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Tienda;
