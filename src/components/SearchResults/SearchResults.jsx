import React, { useState } from 'react';
import Modal from 'react-modal';
import './SearchResults.css';

const SearchResults = ({
  searchResults,
  handleProductClick,
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      {searchResults.length > 0 && (
        <div className="search-results">
          <div className="product-container">
            {searchResults.map((product) => (
              <div className="product-card" key={product.id}>
                <h4>{product.name}</h4>
                <p>Marca: {product.brand}</p>
                <p>Precio: ${product.price}</p>
                <p>Puede aplicar descuento: {product.ableDiscount ? 'Sí' : 'No'}</p>
                <p>Porcentaje de descuento: {product.percentageDiscount}%</p>
                <p>Disponibilidad: {product.availability ? 'Disponible' : 'No disponible'}</p>
                {product.images.length > 0 && (
                  <img src={product.images[0]} alt={product.name} />
                )}
                <button onClick={() => openModal(product)}>Ver detalles</button>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Siguiente
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={selectedProduct !== null}
        onRequestClose={closeModal}
        contentLabel="Detalles del producto"
      >
        {selectedProduct && (
          <div>
            <h4>{selectedProduct.name}</h4>
            <p>Tipo: {selectedProduct.type}</p>
            <p>Contenido de alcohol: {selectedProduct.alcoholContent}%</p>
            <p>Variedad: {selectedProduct.Variety}</p>
            <p>Marca: {selectedProduct.brand}</p>
            <p>Cantidad: {selectedProduct.amount} ml</p>
            <p>Precio: ${selectedProduct.price}</p>
            <p>Stock: {selectedProduct.stock}</p>
            <p>Puede aplicar descuento: {selectedProduct.ableDiscount ? 'Sí' : 'No'}</p>
            <p>Porcentaje de descuento: {selectedProduct.percentageDiscount}%</p>
            <p>Contenedor: {selectedProduct.container}</p>
            <p>Disponibilidad: {selectedProduct.availability ? 'Disponible' : 'No disponible'}</p>
            <p>Veces vendido: {selectedProduct.sells}</p>
            {selectedProduct.images.length > 0 && (
              <img src={selectedProduct.images[0]} alt={selectedProduct.name} />
            )}
            <button onClick={closeModal}>Cerrar</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SearchResults;
