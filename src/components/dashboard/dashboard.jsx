import { useEffect, useState } from "react";
import { Products } from "./products/products";
import axios from "axios";
import { Ventas } from "./ventas/ventas";
import { Link } from "react-router-dom";
import { UserBan } from "./UserBan/userBan";
import { useAuth0 } from "@auth0/auth0-react";

export const Dashboard = () => {
  const user = "administrado123@gmail.com";
  const [usuario, setUsuario] = useState({});
  const [product, setProducts] = useState(true);
  const [ventas, setVentas] = useState(false);
  const [users, setUsers] = useState(false)
  // const {user} = useAuth0()

  useEffect(() => {
    if (user) {
      axios(`https://servidor-vinos.onrender.com/users?email=${user}`)
        .then(({ data }) => {
          setUsuario(data);
        })
        .catch((error) => console.log("parece que hubo un error:", error));
    } else {
      alert("a ocurrido un error");
    }
  }, []);

  if (usuario.admin) {
    return (
      <div style={{ display: "flex" }}>
        <div style={{display: "flex", justifyContent: "space-between", position: "fixed" }} >
          <button
            onClick={() => {
              setProducts(false);
              setVentas(true);
              setUsers(false)
            }}
            style={{ width: "100px", height: "40px" }}
          >
            Ventas
          </button>
          <button
            onClick={() => {
              setProducts(true);
              setVentas(false);
              setUsers(false)
            }}
            style={{ width: "100px", height: "40px" }}
          >
            Productos
          </button>
          <button onClick={() => {
              setProducts(false);
              setVentas(false);
              setUsers(true)
            }}
            style={{ width: "100px", height: "40px" }}>Users</button>
          <Link to="/Create">
            <button style={{ width: "100px", height: "50px" }}>
              Crear Productos
            </button>
          </Link>
        </div>
        <div style={{marginTop:"70px"}} >
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
