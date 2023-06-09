import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
import './SearchBar.css';
import SearchResults from '../SearchResults/SearchResults';

const SearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://servidor-vinos.onrender.com/product/all`, {
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

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        onSearchInputChange={handleSearchInputChange}
        onSearch={handleSearch}
      />
      {searchResults.length > 0 && <SearchResults searchResults={searchResults} />}
    </div>
  );
};

const SearchBar = ({ searchQuery, onSearchInputChange, onSearch }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <div className="search-bar-input">
          <input
            type="text"
            value={searchQuery}
            onChange={onSearchInputChange}
            placeholder="Busca tus bebidas"
          />
          <div className="search-bar-button" onClick={onSearch}>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
