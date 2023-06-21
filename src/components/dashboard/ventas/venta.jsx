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
    const newStatus = ventStatus === "pending" ? "delivered" : "pending";
    setPedido({ ...pedido, estado: newStatus });
    await axios.put(
      `https://servidor-vinos.onrender.com/buy/put?idVent=${ventId}&status=${newStatus}`
    );
  };

  return (
    <div
      style={{
        display: "flex",
        marginLeft: "1rem",
        marginBottom: "1rem",
        background: "#f5f5f5",
        padding: "1rem",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ marginRight: "1rem" }}>{vent.description}</h2>
      <h2 style={{ marginRight: "1rem" }}>{vent.amount / 100}</h2>
      <h2 style={{ marginRight: "1rem" }}>{vent.receipt_email}</h2>
      <h2 style={{ marginRight: "1rem" }}>
        {vent.billing_details.address.postal_code}
      </h2>
      <button
        onClick={() => handleClick(pedido.estado, vent.payment_intent)}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: pedido.estado === "pending" ? "#f44336" : "#4caf50",
          color: "#fff",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        {pedido.estado}
      </button>
    </div>
  );
};
