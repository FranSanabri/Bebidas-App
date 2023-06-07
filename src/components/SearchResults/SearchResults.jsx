import React from 'react';

const SearchResults = ({ searchResults, handleProductClick }) => {
  return (
    <div>
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Resultados de búsqueda:</h3>
          <ul>
            {searchResults.map((product) => (
              <li key={product.id}>
                <h4>{product.name}</h4>
                <p>Litros: {product.liters}</p>
                <p>Tipo: {product.type}</p>
                {/* Agrega más detalles del producto aquí */}
                <img src={product.image} alt={product.name} />
                <button onClick={() => handleProductClick(product)}>Ver detalles</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
