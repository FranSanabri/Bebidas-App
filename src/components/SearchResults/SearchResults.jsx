import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { MdClose, MdShoppingCart } from "react-icons/md";
import "./SearchResults.css";
import { FormCompra } from "../formularioCompra/formCompra";

const SearchResults = ({ searchResults }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  let [cartItems, setCartItems] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  const [showCartMenu, setShowCartMenu] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const [review, setReview] = useState(null);
  const [img, setImg] = useState(0);

  useEffect(() => {
    const storedTotalPrice = localStorage.getItem("totalPrice");
    if (storedTotalPrice) {
      totalPrice = JSON.parse(storedTotalPrice);
      setTotalPrice(JSON.parse(storedTotalPrice));
    }
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      cartItems = JSON.parse(storedCartItems);
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }, [cartItems, totalPrice]);

  const handlerClick = (id) => {
    const updateCart = cartItems.filter((item) => {
      if (item.product.id === id) {
        const price = item.product.price * item.quantity;
        const newTotal = totalPrice - price;
        setTotalPrice(newTotal);
        return false;
      } else {
        return true;
      }
    });
    setCartItems(updateCart);
  };

  const handleImgUp = () => {
    const newImg = img + 1;
    if (newImg <= selectedProduct.images.length - 1) {
      setImg(newImg);
    }
  };
  const handleImgDown = () => {
    const newImg = img - 1;
    if (newImg >= 0) {
      setImg(newImg);
    }
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
          <div className="product-container-1">
            {searchResults.map((product) =>
              product.availability ? (
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
              ) : null
            )}
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
          className="custom-modal-1"
          overlayClassName="custom-overlay-1"
        >
          <div className="modal-content-1">
            <button className="close-button-1" onClick={closeModal}>
              <MdClose />
            </button>
            {selectedProduct && (
              <div className="product-details">
                <h4 className="product-name">{selectedProduct.name}</h4>
                <p className="product-type">Tipo: {selectedProduct.type}</p>
                <p className="product-alcohol">
                  Contenido de alcohol: {selectedProduct.alcoholContent}%
                </p>
                <p className="product-variety">
                  Variedad: {selectedProduct.Variety}
                </p>
                <p className="product-brand">Marca: {selectedProduct.brand}</p>
                <p className="product-amount">
                  Cantidad: {selectedProduct.amount} ml
                </p>
                <p className="product-price">
                  Precio: ${selectedProduct.price}
                </p>
                <p className="product-stock">Stock: {selectedProduct.stock}</p>
                <p className="product-discount">
                  Puede aplicar descuento:{" "}
                  {selectedProduct.ableDiscount ? "Sí" : "No"}
                </p>
                <p className="product-discount-percentage">
                  Porcentaje de descuento: {selectedProduct.percentageDiscount}%
                </p>
                <p className="product-container">
                  Contenedor: {selectedProduct.container}
                </p>
                <p className="product-availability">
                  Disponibilidad:{" "}
                  {selectedProduct.availability
                    ? "Disponible"
                    : "No disponible"}
                </p>
                <p className="product-sells">
                  Veces vendido: {selectedProduct.sells}
                </p>
                {selectedProduct.images.length > 0 && (
                  <div>
                    <button onClick={handleImgDown}>{"<"}</button>
                    <img
                      className="selected-product-image"
                      src={selectedProduct.images[img]}
                      alt={selectedProduct.name}
                    />
                    <button onClick={handleImgUp}>{">"}</button>
                  </div>
                )}
                <div>
                  {review ? (
                    <div>
                      <div
                        style={{
                          borderBottom: "1px solid #ccc",
                          marginTop: "10px",
                        }}
                      ></div>
                      {selectedProduct.reviews.length ? (
                        selectedProduct.reviews.map((review) => {
                          return (
                            <div
                              key={review.id}
                              style={{
                                borderBottom: "1px solid #ccc",
                                alignItems: "center",
                                marginBottom: "10px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  style={{
                                    maxWidth: "50px",
                                    maxHeight: "60px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                  src={review.users[0].image}
                                  alt=""
                                />
                                <h3>{review.users[0].userName}</h3>
                              </div>
                              <p style={{ marginLeft: "10px" }}>
                                Calificación:
                                {[...Array(review.score)].map((_, index) => (
                                  <span key={index} style={{ color: "gold" }}>
                                    &#9733;
                                  </span>
                                ))}
                                {[...Array(5 - review.score)].map(
                                  (_, index) => (
                                    <span
                                      key={index}
                                      style={{ color: "lightgray" }}
                                    >
                                      &#9734;
                                    </span>
                                  )
                                )}
                              </p>
                              <p style={{ marginLeft: "10px" }}>
                                Comentario:{review.content}
                              </p>
                            </div>
                          );
                        })
                      ) : (
                        <div>
                          <p>Este producto no tiene reseñas</p>
                        </div>
                      )}
                      <button onClick={() => setReview(false)}>
                        Ocultar reseñas
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setReview(true)}>Reseñas</button>
                  )}
                </div>
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
          <p className="cart-total">: ${totalAmount.toFixed(2)}</p>
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
