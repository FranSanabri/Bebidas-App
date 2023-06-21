import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./formCompra.css";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const FormCompra = ({
  cartItems,
  setCartItems,
  totalPrice,
  setTotalPrice,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [alcohol, setAlcohol] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth0();
  const total = totalPrice * 100;
  const amount = ~~total;
  let products = "";
  let historial = usuario.record ? usuario.record : [];
  for (const product of cartItems) {
    products = products + product.product.name + ", ";
    historial.push(product.product.id);
    if (product.product.alcoholContent >= 1 && !alcohol) {
      setAlcohol(true);
    }
  }

  const handleCompra = () => {
    for (const product of cartItems) {
      axios.put("https://servidor-vinos.onrender.com/product/putProduct", {
        productId: product.product.id,
        changes: [
          { name: "stock", data: product.product.stock - product.quantity },
          { name: "sells", data: product.product.sells + product.quantity },
        ],
      });
    }
  };

  useEffect(() => {
    if (email) {
      axios(`https://servidor-vinos.onrender.com/users?email=${email}`)
        .then(({ data }) => {
          setUsuario(data);
        })
        .catch((error) => console.log("parece que hubo un error:", error));
    } else {
      alert("Inicia sesion para poder comprar");
      navigate("/login");
    }
  }, []);

  // const email = user.name
  const email = "juanpabloaste00@gmail.com";
  const navigate = useNavigate();

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        fontWeight: "normal",
        fontFamily: "'Poppins', sans-serif",
        color: "#32325d",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
    },
  };

  const putUser = {
    userEmail: email,
    changes: [{ name: "record", data: historial }],
  };

  const handlerUser = async () => {
    if (email) {
      await axios.put("https://servidor-vinos.onrender.com/users/put", putUser);
    } else {
      alert("Inicia sesion para poder comprar");
      navigate("/login");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      if (usuario && usuario.ban) {
        alert("No puedes comrar estas baneado");
      } else if (usuario && !usuario.age) {
        alert("no has completado tu informacion de usuario");
        navigate("/profilepage");
      } else if (usuario && !alcohol) {
        const { id } = paymentMethod;
        try {
          const { data } = await axios.post("http://localhost:3001/buy", {
            products,
            id,
            email,
            amount,
          });
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            navigate("/Tienda");
          }, 3000);
          handlerUser();
          handleCompra();
          setCartItems([]);
          setTotalPrice(0);
        } catch (error) {
          setShowErrorMessage(true);
          console.log(error);
          setTimeout(() => {
            setShowErrorMessage(false);
            navigate("/Tienda");
          }, 3000);
        }
      } else if (usuario && alcohol && usuario.age < 18) {
        alert("No puedes comprar alcohol siendo menor");
      } else if (usuario && alcohol && usuario.age >= 18) {
        const { id } = paymentMethod;
        try {
          const { data } = await axios.post("http://localhost:3001/buy", {
            products,
            id,
            email,
            amount,
          });
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            navigate("/Tienda");
          }, 3000);
          handleCompra();
          handlerUser();
          setCartItems([]);
          setTotalPrice(0);
        } catch (error) {
          setShowErrorMessage(true);
          console.log(error);
          setTimeout(() => {
            setShowErrorMessage(false);
            navigate("/Tienda");
          }, 3000);
        }
      }
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleConfirmExit = () => {
    setConfirmExit(true);
    setShowModal(false);
    window.history.back();
  };

  const handleCancelExit = () => {
    setShowModal(false);
  };

  const handleGoBack = () => {
    if (confirmExit) {
      window.history.back();
    } else {
      handleShowModal();
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="card-form">
        <div className="form-row">
          <label htmlFor="card-element" className="form-label">
            Llena la siguiente información de la tarjeta:
          </label>
          <CardElement className="card-element" options={cardElementOptions} />
        </div>
        <button className="submit-button">Comprar</button>
        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Confirm Exit Modal"
          className="custom-modal"
          overlayClassName="custom-modal-overlay"
        >
          <h2 className="modal-title">
            ¿Deseas salir sin guardar los cambios?
          </h2>
          <div className="modal-buttons">
            <button className="modal-button" onClick={handleConfirmExit}>
              Sí
            </button>
            <button className="modal-button" onClick={handleCancelExit}>
              No
            </button>
          </div>
        </Modal>
      </form>
      {showSuccessMessage && (
        <div className="message success-message">
          ¡Compra realizada con éxito!
        </div>
      )}
      {showErrorMessage && (
        <div className="message error-message">
          Hubo un problema al realizar el pago. Inténtalo nuevamente más tarde.
        </div>
      )}
    </div>
  );
};
