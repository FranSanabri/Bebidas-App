import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "./user";
import { handleNextPage, handlePreviousPage } from "../../ToolBar/handlers";

export const UserBan = () => {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://servidor-vinos.onrender.com/users/all?paginas=${pages}&search=${search}`
      )
      .then(({ data }) => setUsers(data));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {users.length ? (
        <div style={{ width: "100%" }}>
          {users.map((user) => {
            return <User user={user} />;
          })}
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <button
          onClick={() => handlePreviousPage(pages, setPages)}
          disabled={pages === 1}
          style={{ marginRight: "0.5rem" }}
        >
          Anterior
        </button>
        <button
          onClick={() => handleNextPage(pages, setPages)}
          disabled={!users.length || users.length / 10 < 1}
          style={{ marginLeft: "0.5rem" }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
