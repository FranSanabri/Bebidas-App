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
      habilitado.changes[0].data = false
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
      habilitado.changes[0].data = true
      axios.put(
        "https://servidor-vinos.onrender.com/product/putProduct",
        habilitado
      );
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {product.name ? (
        <div style={{ display: "flex", marginLeft: "15rem", marginBottom: "1rem"  }}>
          <img
            src={product.images[0]}
            alt=""
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          />
          <h2>{product.name}</h2>
          <button
            onClick={handleClick}
            style={{ maxWidth: "50px", maxHeight: "30px" }}
          >
            {habilitado.changes[0].data + ""}
          </button>
          <Link to={`/editar/${product.id}`}>
            <button>Editar</button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};
