import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation } from "react-router";

export const FormCompra = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const product = queryParams.get("name");
  let amount = parseFloat(queryParams.get("amount"));
  const stripe = useStripe();
  const elements = useElements();
  console.log(product);

  amount = parseInt(amount.toString().replace(".", ""));

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button>Buy</button>
      </form>
    </div>
  );
};
