import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../Navbar/Navbar';
import SearchBar from '../../SearchBar/SearchBar';
import './Tienda.css';
import Toolbar from '../../ToolBar/ToolBar';
import SearchResults from '../../SearchResults/SearchResults';
import Footer from '../../Footer/Footer';

function Tienda() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.post(
          "https://servidor-vinos.onrender.com/product/filtrado",
          {
            paginas: currentPage,
            cantidad: 10,
            tipos: activeFilter
          }
        );

        setSearchResults(data);
      } catch (error) {
        console.error('Error al buscar productos:', error);
      }
    };

    fetchProducts();
  }, [currentPage, activeFilter]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleFilterChange = (selectedFilter) => {
    setActiveFilter(selectedFilter);
    setCurrentPage(1);
  };

  return (
    <div>
      <NavBar />
      <Toolbar activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      <div className="product-list">
        <SearchResults searchResults={searchResults} />
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
        <button onClick={handleNextPage}>Siguiente</button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Tienda;
