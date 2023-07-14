import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "./user";
import { handleNextPage, handlePreviousPage } from "../../ToolBar/handlers";

export const UserBan = () => {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(false);
  const [not, setNot] = useState("");

  useEffect(() => {
    axios
      .get(`https://servidor-vinos.onrender.com/users/all?paginas=${pages}&search=${search}`)
      .then(({ data }) => {
        setUsers(data);
        setNot(search);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          if (pages > 1) {
            setPages(pages - 1);
          }
          setSearch(not);
          setMessage("No se encontraron más usuarios");
        } else {
          alert("Ha ocurrido un error");
        }
      });
  }, [pages, search, not]);

  const handleChange = (event) => {
    setSearch(event.target.value);
    setMessage(false);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <input
        onChange={handleChange}
        type="text"
        placeholder="Buscar por Email"
      />
      {message ? (
        <label style={{ color: "black" }} htmlFor="">
          {message}
        </label>
      ) : null}
      {users.length ? (
        <div style={{ width: "100%" }}>
          {users.map((user) => {
            return <User user={user} />;
          })}
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
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
