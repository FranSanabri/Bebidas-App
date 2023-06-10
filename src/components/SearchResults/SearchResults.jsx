import React, { useState } from "react";
import Modal from "react-modal";
import "./SearchResults.css";

const SearchResults = ({ searchResults, handleProductClick }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      {searchResults.length > 0 ? (
        <div className="search-results">
          <div className="product-container">
            {searchResults.map((product) => (
              <div className="product-card" key={product.id}>
                <h4 className="product-name">{product.name}</h4>
                <p className="product-info">Marca: {product.brand}</p>
                <p className="product-info">Precio: ${product.price}</p>
                <p className="product-info">
                  Puede aplicar descuento: {product.ableDiscount ? "Sí" : "No"}
                </p>
                <p className="product-info">
                  Porcentaje de descuento: {product.percentageDiscount}%
                </p>
                <p className="product-info">
                  Disponibilidad:{" "}
                  {product.availability ? "Disponible" : "No disponible"}
                </p>
                {product.images.length > 0 && (
                  <img
                    className="product-image"
                    src={product.images[0]}
                    alt={product.name}
                  />
                )}
                <button
                  className="product-button"
                  onClick={() => openModal(product)}
                >
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>cargando</h1>
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
            <p>
              Puede aplicar descuento:{" "}
              {selectedProduct.ableDiscount ? "Sí" : "No"}
            </p>
            <p>
              Porcentaje de descuento: {selectedProduct.percentageDiscount}%
            </p>
            <p>Contenedor: {selectedProduct.container}</p>
            <p>
              Disponibilidad:{" "}
              {selectedProduct.availability ? "Disponible" : "No disponible"}
            </p>
            <p>Veces vendido: {selectedProduct.sells}</p>
            {selectedProduct.images.length > 0 && (
              <img
                className="selected-product-image"
                src={selectedProduct.images[0]}
                alt={selectedProduct.name}
              />
            )}
            <button onClick={closeModal}>Cerrar</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SearchResults;
