import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import './SearchBar.css';
import SearchResults from '../SearchResults/SearchResults';

const SearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Filtrar los resultados localmente por nombre
    const filteredResults = searchResults.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
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
