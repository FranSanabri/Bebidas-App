import React, { useState } from 'react';
import axios from 'axios';

const INPUTPAYPAL = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlePayment = async () => {
    const amount = product.price * quantity;
    const currency = 'USD';
    const description = product.description;

    const paymentData = {
      amount,
      currency,
      description,
    };

    try {
      const response = await axios.post('http://localhost:3001/createOrder', paymentData);
      const { approvalUrl } = response.data;
      window.location.href = approvalUrl;
    } catch (error) {
      console.error(error);
      // Manejo del error
    }
  };

  return (
    <div>
      <h1>comprar?</h1>
      <p>Quantity:</p>
      <input type="number" value={quantity} onChange={handleQuantityChange} />
      <button onClick={handlePayment}>comprar ahora</button>
    </div>
  );
};

export default INPUTPAYPAL;