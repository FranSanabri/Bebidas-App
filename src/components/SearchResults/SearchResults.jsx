import React, { useState } from "react";
import Modal from "react-modal";
import { MdClose, MdShoppingCart } from "react-icons/md";
import "./SearchResults.css";
import { Link } from "react-router-dom";

const SearchResults = ({ searchResults }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCartMenu, setShowCartMenu] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product, event, quantity) => {
    event.stopPropagation(); // Avoid propagating the click event to the parent container
    const existingItem = cartItems.find((item) => item.product.id === product.id);

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + quantity;
      const updatedItems = cartItems.map((item) => {
        if (item.product.id === product.id) {
          return { ...item, quantity: updatedQuantity > 20 ? 20 : updatedQuantity };
        }
        return item;
      });

      setCartItems(updatedItems);
    } else {
      const newQuantity = quantity > 20 ? 20 : quantity;
      setCartItems([...cartItems, { product, quantity: newQuantity }]);
    }

    setTotalPrice(totalPrice + product.price * quantity);
    setAnimateCart(true); // Start the animation
    setTimeout(() => setAnimateCart(false), 1000); // Stop the animation after 1 second
  };

  const toggleCartMenu = () => {
    setShowCartMenu(!showCartMenu);
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const buyFromCart = (product) => {
    const cartItem = cartItems.find((item) => item.product.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 1;
    return `/Compra?name=${product.name}&amount=${product.price}&quantity=${quantity}`;
  };

  return (
    <div>
      <div className={`cart-icon ${animateCart ? "animate-shake" : ""}`} onClick={toggleCartMenu}>
        <MdShoppingCart size={24} />
        <span className="cart-items-count">{cartItems.length}</span>
      </div>

      {searchResults.length > 0 ? (
        <div className="search-results">
          <div className="product-container">
            {searchResults.map((product) => (
              product.availability ?
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
                  <img className="product-image" src={product.images[0]} alt={product.name} />
                )}
                <p className="product-info">${product.price}</p>
                <div className="quantity-container">
                  <input
                    type="number"
                    min={1}
                    max={20}
                    defaultValue={1}
                    className="product-quantity"
                    onClick={(event) => event.stopPropagation()} // Prevent modal from opening
                  />
                  <button
                    className="add-to-cart-button"
                    onClick={(event) =>
                      addToCart(product, event, parseInt(event.target.previousSibling.value))
                    }
                  >
                    Agregar al carrito
                  </button>
                </div>
                <Link to={buyFromCart(product)}>
                  <button className="buy-button">Comprar</button>
                </Link>
              </div> : null
            ))}
          </div>
        </div>
      ) : (
        <div className="loader"></div>
      )}

      {selectedProduct && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          contentLabel="Detalles del producto"
          className="custom-modal"
          overlayClassName="custom-overlay"
        >
          <div className="modal-content">
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
                <p>Puede aplicar descuento: {selectedProduct.ableDiscount ? "Sí" : "No"}</p>
                <p>Porcentaje de descuento: {selectedProduct.percentageDiscount}%</p>
                <p>Contenedor: {selectedProduct.container}</p>
                <p>Disponibilidad: {selectedProduct.availability ? "Disponible" : "No disponible"}</p>
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

      {showCartMenu && (
        <div className="cart-container">
          <h3>Carrito de compras</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.product.id}>
                <div className="cart-item">
                  <div className="cart-item-details">
                    <p className="cart-item-name">
                      {item.product.name} (x{item.quantity})
                    </p>
                    <p className="cart-item-price">${item.product.price}</p>
                  </div>
                  {item.product.images.length > 0 && (
                    <img
                      className="cart-item-image"
                      src={item.product.images[0]}
                      alt={item.product.name}
                    />
                  )}
                  <Link to={buyFromCart(item.product)}>
                    <button className="buy-button">Comprar</button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: ${totalAmount}</p>
          <button className="close-cart-button" onClick={toggleCartMenu}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
