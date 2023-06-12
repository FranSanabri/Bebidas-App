import React, { useState } from 'react';
import { connect } from 'react-redux';
import { startPayment } from '../actions/paymentActions';

const INPUTPAYPAL = ({ startPayment }, product ) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlePayment = () => {


    const amount = product.price * quantity;
    const currency = 'USD';
    

    startPayment({ amount, currency, product.description });
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

export default connect(null, { startPayment })(INPUTPAYPAL);


/*import axios from 'axios';

export const startPayment = (paymentData) => async (dispatch) => {
  try {
    const response = await axios.post('/createOrder', paymentData);
    const { approvalUrl } = response.data;

    window.location.href = approvalUrl;
  } catch (error) {
    console.error(error);
    
  }
};*/