import { useEffect, useState } from "react";
import { Products } from "./products/products";
import { Ventas } from "./ventas/ventas";
import { Link } from "react-router-dom";
import { UserBan } from "./UserBan/userBan";
import { FiHome } from "react-icons/fi"; // Importar el icono de inicio
import "./dashboard.css";

export const Dashboard = ({ usuarios }) => {
  // const user = {email: "finalproyecto06@gmail.com"}
  const [usuario, setUsuario] = useState(usuarios ? usuarios : null)
  const [product, setProducts] = useState(true);
  const [ventas, setVentas] = useState(false);
  const [users, setUsers] = useState(false);

  useEffect(() => {
    if (usuarios) {
      setUsuario(usuarios);
    }
  }, [usuarios]);

  if (usuario && usuario.admin) {
    return (
      <div className="dashboard-container">
        <div className="sidebar">
          <button
            onClick={() => {
              setProducts(false);
              setVentas(true);
              setUsers(false);
            }}
            className={`sidebar-button ${ventas ? "active" : ""}`}
          >
            Ventas
          </button>
          <button
            onClick={() => {
              setProducts(true);
              setVentas(false);
              setUsers(false);
            }}
            className={`sidebar-button ${product ? "active" : ""}`}
          >
            Productos
          </button>
          <button
            onClick={() => {
              setProducts(false);
              setVentas(false);
              setUsers(true);
            }}
            className={`sidebar-button ${users ? "active" : ""}`}
          >
            Usuarios
          </button>
          <Link to="/Create" className="create-product-button">
            Crear Producto
          </Link>
          <Link to="/" className="home-button">
            <FiHome className="home-icon" />
            Volver al inicio
          </Link>
        </div>
        <div className="content">
          {product && !ventas && !users ? <Products /> : null}
          {!product && ventas && !users ? <Ventas /> : null}
          {!product && !ventas && users ? <UserBan /> : null}
        </div>
      </div>
    );
  } else {
    return <h1>401</h1>;
  }
};
