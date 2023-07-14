import axios from "axios";
import { useState } from "react";

export const Venta = ({ vent }) => {
  const [pedido, setPedido] = useState(vent.estado);
  const [selectedVentIndex, setSelectedVentIndex] = useState(null);

  const handleClick = async (ventStatus, ventId) => {
    const newStatus = ventStatus === "pending" ? "delivered" : "pending";
    setPedido(newStatus);
    await axios.put(
      `https://servidor-vinos.onrender.com/buy/put?idVent=${ventId}&status=${newStatus}`
    );
  };

  console.log(vent);

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
      {selectedVentIndex ? (
        <div>
          <h2 style={{ borderBottom: "1px solid #ccc" }}>Usuario</h2>
          <h3>Email: {vent.users[0].email}</h3>
          <h3>Nombre: {vent.users[0].userName}</h3>
          <h3>Ubicacion: {vent.users[0].ubicacion}</h3>
          <h3>Telefono: {vent.users[0].phone}</h3>
          <h2 style={{ borderBottom: "1px solid #ccc" }}>Productos</h2>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexWrap: "wrap",
              padding: "24px",
              justifyContent: "space-around",
            }}
          >
            {vent.productos.map((product) => {
              return (
                <div
                  style={{
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    paddingBottom: "10px",
                    borderRadius: "4px",
                    width: "20rem",
                  }}
                >
                  <h3>{product.product.name}</h3>
                  <h3>Precio: {product.product.price}</h3>
                  <h3>Cantidad: {product.quantity}</h3>
                </div>
              );
            })}
          </div>
          <h2 style={{ marginRight: "1rem" }}>Total: {vent.amount / 100}</h2>
          <button
            onClick={() => handleClick(pedido, vent.id)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: pedido === "pending" ? "#f44336" : "#4caf50",
              color: "#fff",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {pedido}
          </button>
          <button onClick={() => setSelectedVentIndex(false)}>
            Ocultar detalles
          </button>
        </div>
      ) : (
        <div>
          <h2 style={{ marginRight: "1rem" }}>Total: {vent.amount / 100}</h2>
          <h2 style={{ marginRight: "1rem" }}>{vent.users[0].email}</h2>
          <h2 style={{ marginRight: "1rem" }}>{vent.name}</h2>
          <button
            onClick={() => handleClick(pedido, vent.id)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: pedido === "pending" ? "#f44336" : "#4caf50",
              color: "#fff",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {pedido}
          </button>
          <button onClick={() => setSelectedVentIndex(true)}>Detalles</button>
        </div>
      )}
    </div>
  );
};
