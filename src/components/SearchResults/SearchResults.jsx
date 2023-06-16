import React, { useState } from "react";
import Modal from "react-modal";
import { Transition } from "react-transition-group";
import { MdClose } from "react-icons/md";
import "./SearchResults.css";
import { Link } from "react-router-dom";

const SearchResults = ({ searchResults }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const duration = 300; // Duración de la animación en milisegundos

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <div>
      {searchResults.length > 0 ? (
        <div className="search-results">
          <div className="product-container">
            {searchResults.map((product) => (
              <div
                className="product-card clickable"
                key={product.id}
                onClick={() => openModal(product)}
              >
                <h4 className="product-name">{product.name}</h4>
                <p className="product-info"> {product.brand}</p>
                <p className="product-disponibilidad">
                  {product.availability ? "Disponible" : "No disponible"}
                </p>
                {product.images.length > 0 && (
                  <img
                    className="product-image"
                    src={product.images[0]}
                    alt={product.name}
                  />
                )}
                <p className="product-info">${product.price}</p>
                <Link to={`/Compra?name=${product.name}&amount=${product.price}`} >
                <button className="buy-button"  >Comprar ya!</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div class="loader"></div>
      )}

      <Transition in={selectedProduct !== null} timeout={duration}>
        {(state) => (
          <Modal
            isOpen={state === "entered" || state === "entering"}
            onRequestClose={closeModal}
            contentLabel="Detalles del producto"
            className="custom-modal"
            overlayClassName="custom-overlay"
            closeTimeoutMS={duration}
          >
            <div
              className="modal-content"
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              <button className="close-button" onClick={closeModal}>
                <MdClose />
              </button>
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
                </div>
              )}
            </div>
          </Modal>
        )}
      </Transition>
    </div>
  );
};

export default SearchResults;
