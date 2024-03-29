import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./formCompra.css";
import { useAuth0 } from "@auth0/auth0-react";

export const FormCompra = ({
  cartItems,
  setCartItems,
  totalPrice,
  setTotalPrice,
}) => {
  // const user = { email: "finalproyecto06@gmail.com" };
  const [showModal, setShowModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [usuario, setUsuario] = useState({});
  let alcohol;
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth0();
  const total = totalPrice * 100;
  const amount = ~~total;
  const navigate = useNavigate();
  for (const product of cartItems) {
    if (product.product.alcoholContent >= 1 && !alcohol) {
      alcohol = true;
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
    if (user) {
      axios(`https://servidor-vinos.onrender.com/users?email=${user.email}`)
        .then(({ data }) => {
          setUsuario(data);
        })
        .catch((error) => console.log("parece que hubo un error:", error));
    } else {
      const storedUser = localStorage.getItem("user");
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser.email) {
        axios(
          `https://servidor-vinos.onrender.com/users?email=${parsedUser.email}`
        ).then(({ data }) => {
          setUsuario(data);
        });
      }
    }
  }, [user]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      if (usuario && !usuario.email) {
        alert("No has iniciado sesion, no puedes comprar productos");
      }
      if (usuario && usuario.ban) {
        alert("No puedes comprar estas baneado");
      } else if (usuario && usuario.email && !usuario.age) {
        alert("no has completado tu informacion de usuario");
        navigate("/profilepage");
      } else if (usuario && usuario.email && !alcohol) {
        const { id } = paymentMethod;
        try {
          const { data } = await axios.post(
            "https://servidor-vinos.onrender.com/buy",
            {
              products: cartItems,
              id,
              email: usuario.email,
              amount,
            }
          );
          console.log(data);
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            navigate("/Tienda");
          }, 3000);
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
          await axios.post("https://servidor-vinos.onrender.com/buy", {
            products: cartItems,
            id,
            email: usuario.email,
            amount,
          });
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            navigate("/Tienda");
          }, 3000);
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
      }
    }
  };

  const handleConfirmExit = () => {
    setShowModal(false);
    window.history.back();
  };

  const handleCancelExit = () => {
    setShowModal(false);
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
