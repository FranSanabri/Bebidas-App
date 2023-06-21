import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { MdClose, MdShoppingCart } from "react-icons/md";
import "./SearchResults.css";
import { Link } from "react-router-dom";
import { FormCompra } from "../formularioCompra/formCompra";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const SearchResults = ({ searchResults }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  let [cartItems, setCartItems] = useState([]);
  const [cartBack, setCartBack] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCartMenu, setShowCartMenu] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  // const { user } = useAuth0();

  const user = { name: "juanpabloaste00@gmail.com" };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      cartItems = JSON.parse(storedCartItems);
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  console.log(cartItems);

  const handlerClick = (id) => {
    const updateCart = cartItems.filter((item) => {
      if (item.product.id === id) {
        const price = item.product.price * item.quantity;
        const newTotal = totalPrice - price;
        setTotalPrice(newTotal);
      } else {
        return item;
      }
    });
    setCartItems(updateCart);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product, event, quantity) => {
    event.stopPropagation(); // Evitar propagar el evento de clic al contenedor principal

    if (product.stock > 0 && quantity <= product.stock) {
      const existingItem = cartItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        const updatedQuantity = existingItem.quantity + quantity;
        const updatedItems = cartItems.map((item) => {
          if (
            item.product.id === product.id &&
            updatedQuantity <= item.product.stock
          ) {
            return {
              ...item,
              quantity: updatedQuantity > 20 ? 20 : updatedQuantity,
            };
          }
          return item;
        });
        setCartItems(updatedItems);
      } else {
        const newQuantity = quantity > 20 ? 20 : quantity;
        setCartItems([...cartItems, { product, quantity: newQuantity }]);
      }

      setTotalPrice(totalPrice + product.price * quantity);
      setAnimateCart(true); // Iniciar la animación
      setTimeout(() => setAnimateCart(false), 1000); // Detener la animación después de 1 segundo
    } else {
      alert("El producto se ha quedado sin stock");
    }
  };

  const toggleCartMenu = () => {
    setShowCartMenu(!showCartMenu);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <div
        className={`cart-icon ${animateCart ? "animate-shake" : ""}`}
        onClick={toggleCartMenu}
      >
        <MdShoppingCart size={24} />
        <span className="cart-items-count">{cartItems.length}</span>
      </div>

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
                {product.images.length > 0 && (
                  <img
                    className="product-image"
                    src={product.images[0]}
                    alt={product.name}
                  />
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
                      addToCart(
                        product,
                        event,
                        parseInt(event.target.previousSibling.value)
                      )
                    }
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
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
                  {selectedProduct.availability
                    ? "Disponible"
                    : "No disponible"}
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
                      <button onClick={() => handlerClick(item.product.id)}>
                        X
                      </button>
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
                </div>
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: ${totalAmount.toFixed(2)}</p>
          <FormCompra
            cartItems={cartItems}
            setCartItems={setCartItems}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
          <button className="close-cart-button" onClick={toggleCartMenu}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
