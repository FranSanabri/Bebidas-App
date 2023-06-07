import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import './SearchBar.css';

const SearchBar = ({ setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Aquí puedes implementar la lógica de búsqueda de productos
    // Por ejemplo, puedes llamar a una API o buscar en una lista de productos local

    // Aquí se simula la búsqueda de productos con un array de productos de ejemplo
    const products = [
      { id: 1, name: 'Tequila', liters: '500ml', type: 'PATRON', details: 'Detalles de la Bebida 1', image: 'https://i.ibb.co/2SypNwY/1.png' },
      { id: 2, name: 'Vino', liters: '1L', type: 'Malbec', details: 'Detalles de la Bebida 2', image: 'https://i.ibb.co/VmMZ00f/2.png' },
      { id: 3, name: 'Bebida 3', liters: '750ml', type: 'Agua', details: 'Detalles de la Bebida 3', image: 'https://i.ibb.co/HX9K9q9/3.png' },
    ];

    const filteredResults = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <div className="search-bar-input">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Busca tus bebidas"
          />
          <div className="search-bar-button" onClick={handleSearch}>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
