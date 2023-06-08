import React, { useState } from 'react';
import NavBar from '../../Navbar/Navbar';
import SearchBar from '../../SearchBar/SearchBar';
import './Tienda.css'
import Toolbar from '../../ToolBar/ToolBar';

function Tienda() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <NavBar/>
      <Toolbar />
     <div className="Tienda-Search" > <SearchBar setSearchResults={setSearchResults} /></div>
      <div className="product-list">
        {searchResults.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tienda;
