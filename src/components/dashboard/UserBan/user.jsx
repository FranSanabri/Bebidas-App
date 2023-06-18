import axios from "axios";
import { useState } from "react";

export const User = ({ user }) => {
  const [usuario, setUsuario] = useState(user);

  const handlerClick = async () => {
    let newBan = !usuario.ban ? true : false;
    setUsuario({ ...usuario, ban: newBan });
    await axios.put(`https://servidor-vinos.onrender.com/users/put`, {
      userEmail: usuario.email,
      changes: [{ name: "ban", data: newBan }],
    });
  };

  return (
    <div style={{ display: "flex", marginLeft: "1rem", marginBottom: "1rem" }}>
      <div>
        <h2>{usuario.userName}</h2>
        <h2>{usuario.email}</h2>
        <button onClick={handlerClick} >{usuario.ban ? "Desbanear" : "Banear"}</button>
      </div>
    </div>
  );
};
