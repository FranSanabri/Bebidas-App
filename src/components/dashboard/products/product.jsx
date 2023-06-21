import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Product = ({ product }) => {
  const [habilitado, setHabilitado] = useState({
    productId: product.id,
    changes: [{ name: "availability", data: product.availability }],
  });

  const handleClick = () => {
    if (habilitado.changes[0].data) {
      setHabilitado({
        ...habilitado,
        changes: [
          {
            ...habilitado.changes[0],
            data: false,
          },
        ],
      });
      habilitado.changes[0].data = false;
      axios.put(
        "https://servidor-vinos.onrender.com/product/putProduct",
        habilitado
      );
    } else {
      setHabilitado({
        ...habilitado,
        changes: [
          {
            ...habilitado.changes[0],
            data: true,
          },
        ],
      });
      habilitado.changes[0].data = true;
      axios.put(
        "https://servidor-vinos.onrender.com/product/putProduct",
        habilitado
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
        padding: "0.5rem",
      }}
    >
      {product.name ? (
        <div
          style={{
            display: "flex",
            marginLeft: "15rem",
            marginBottom: "1rem",
          }}
        >
          <img
            src={product.images[0]}
            alt=""
            style={{
              maxWidth: "50px",
              maxHeight: "50px",
              borderRadius: "4px",
              marginRight: "1rem",
            }}
          />
          <h2
            style={{
              marginLeft: "1rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {product.name}
          </h2>
          <button
            onClick={handleClick}
            style={{
              width: "100px",
              height: "30px",
              marginLeft: "1rem",
              backgroundColor: habilitado.changes[0].data ? "green" : "red",
              color: "white",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              textTransform: "uppercase",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {habilitado.changes[0].data ? "Enabled" : "Disabled"}
          </button>
          <Link to={`/editar/${product.id}`}>
            <button
              style={{
                marginLeft: "1rem",
                backgroundColor: "blue",
                color: "white",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                padding: "0.5rem 1rem",
              }}
            >
              Editar
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};
