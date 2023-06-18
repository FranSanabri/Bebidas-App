import axios from "axios";
import { useEffect, useState } from "react";

export const Venta = ({ vent }) => {
  const [pedido, setPedido] = useState({});

  useEffect(() => {
    axios
      .get(`https://servidor-vinos.onrender.com/pedidos/id?idUser=${vent.payment_intent}`)
      .then(({ data }) => setPedido(data))
      .catch((error) => console.log(error));
  }, []);

  const handleClick = async (ventStatus, ventId) => {
    let newStatus = ventStatus === "pending" ? "delivered" : "pending";
    setPedido({ ...pedido, estado: newStatus });
    await axios.put(
      `https://servidor-vinos.onrender.com/buy/put?idVent=${ventId}&status=${newStatus}`
    );
  };

  return (
    <div style={{ display: "flex", marginLeft: "1rem", marginBottom: "1rem" }}>
      <h2>{vent.description}</h2>
      <h2>{vent.amount / 100}</h2>
      <h2>{vent.receipt_email}</h2>
      <h2>{vent.billing_details.address.postal_code}</h2>
      <button onClick={() => handleClick(pedido.estado, vent.payment_intent)}>
        {pedido.estado}
      </button>
    </div>
  );
};
