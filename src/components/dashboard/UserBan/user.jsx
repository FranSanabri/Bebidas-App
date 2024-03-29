import axios from "axios";
import { useState } from "react";

export const User = ({ user, gridArea }) => {
  const [usuario, setUsuario] = useState(user);

  const handlerClick = async () => {
    let newBan = !usuario.ban ? true : false;
    setUsuario({ ...usuario, ban: newBan });
    await axios.put(`https://servidor-vinos.onrender.com/users/put`, {
      userEmail: usuario.email,
      changes: [{ name: "ban", data: newBan }],
    });
  };

  const handlerAdmin = async () => {
    let newAdmin = !usuario.admin ? true : false;
    setUsuario({ ...usuario, admin: newAdmin });
    await axios.put(`https://servidor-vinos.onrender.com/users/put`, {
      userEmail: usuario.email,
      changes: [{ name: "admin", data: newAdmin }],
    });
  }

  return (
    <div
      style={{
        gridArea: gridArea,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "0",
        background: "#f5f5f5",
        padding: "1rem",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        border: "1px solid #ccc",
        flexGrow: 1,
        margin: "0.5rem",
      }}
    >
      <div>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
          {usuario.userName}
        </h2>
        <h2 style={{ fontSize: "1rem", color: "#888" }}>{usuario.email}</h2>
        <button
          onClick={handlerClick}
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: usuario.ban ? "#f44336" : "#4caf50",
            color: "#fff",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {usuario.ban ? "Desbanear" : "Banear"}
        </button>
        <button
          onClick={handlerAdmin}
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: usuario.admin ? "#4c92dd" : "#4caf50",
            color: "#fff",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {usuario.admin ? "Admin" : "User"}
        </button>
      </div>
    </div>
  );
};


