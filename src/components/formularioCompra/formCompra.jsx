import React, { useState } from "react";
import Modal from "react-modal";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation } from "react-router";
import "./formCompra.css";
import { NavLink } from "react-router-dom";

export const FormCompra = () => {
  const [showModal, setShowModal] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const product = queryParams.get("name");
  let amount = parseFloat(queryParams.get("amount"));
  const stripe = useStripe();
  const elements = useElements();

  amount = parseInt(amount.toString().replace(".", ""));

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
      const { id } = paymentMethod;
      const { data } = await axios.post("http://localhost:3001/buy", {
        amount,
        id,
        product,
      });

      console.log(data);
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
        <button className="submit-button" onClick={handleGoBack}>
          Atrás
        </button>
        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Confirm Exit Modal"
          className="custom-modal"
          overlayClassName="custom-modal-overlay"
        >
          <h2 className="modal-title">¿Deseas salir sin guardar los cambios?</h2>
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
    </div>
  );
};
