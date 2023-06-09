import React, { useState } from 'react';
import SearchResults from '../SearchResults/SearchResults';

const Toolbar = () => {
  const [activeFilter, setActiveFilter] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setActiveFilter(selectedFilter);

    // Filtrar los productos según el filtro seleccionado
    const filteredProducts = products.filter((product) => product.type.toLowerCase() === selectedFilter.toLowerCase());

    // Establecer los resultados filtrados
    setFilteredResults(filteredProducts);
    setSelectedProduct(null);
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Lista de productos (puedes reemplazarla con tus propios datos)
  const products = [
    { id: 1, name: 'Tequila', liters: '500ml', type: 'PATRON', details: 'Detalles de la Bebida 1', image: 'https://i.ibb.co/2SypNwY/1.png' },
    { id: 2, name: 'Vino', liters: '1L', type: 'Malbec', details: 'Detalles de la Bebida 2', image: 'https://i.ibb.co/VmMZ00f/2.png' },
    { id: 3, name: 'Bebida 3', liters: '750ml', type: 'Agua', details: 'Detalles de la Bebida 3', image: 'https://i.ibb.co/HX9K9q9/3.png' },
  ];

  return (
    <div>

      <div className="toolbar-menu">
        <select value={activeFilter} onChange={handleFilterChange}>
          <option value="">Todos</option>
          <option value="vinos">Vinos</option>
          <option value="licores">Licores</option>
          <option value="tequilas">Tequilas</option>
          <option value="cervezas">Cervezas</option>
          <option value="coctelerias">Bebidas</option>
        </select>
      </div>
      <SearchResults searchResults={filteredResults} handleProductClick={handleProductClick} />
      {selectedProduct && (
        <div className="product-details">
          <h3>Detalles del producto:</h3>
          <h4>{selectedProduct.name}</h4>
          <p>Litros: {selectedProduct.liters}</p>
          <p>Tipo: {selectedProduct.type}</p>
          <p>Detalles: {selectedProduct.details}</p>
          <img src={selectedProduct.image} alt={selectedProduct.name} />
        </div>
      )}
    </div>
  );
};

export default Toolbar;
