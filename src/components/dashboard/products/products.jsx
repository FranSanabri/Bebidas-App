import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "./product";
import { handleNextPage, handlePreviousPage } from "../../ToolBar/handlers";
import "./products.css";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sig, setSig] = useState(false);
  const [not, setNot] = useState("");
  const [message, setMessage] = useState(false);
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://servidor-vinos.onrender.com/product/all?paginas=${pages}&search=${search}&stock=${stock}&status=${status}`
      )
      .then(({ data }) => {
        setNot(search);
        setProducts(data);
        setSig(false);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          alert("Ha ocurrido un error");
          console.log(error);
        } else {
          if (stock !== "" && stock === "false") {
            setMessage("No se encontraron productos sin stock");
          } else if (stock !== "" && stock === "true") {
            setMessage("No se encontraron productos con stock");
          } else {
            if (pages > 1) {
              setSig(true);
              setPages(pages - 1);
            }
            setSearch(not);
            setMessage("No se encontraron más productos");
          }
        }
      });
  }, [pages, search, not, stock, status]);

  const handleChangeStock = (event) => {
    setStock(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    setMessage(false);
  };

  return (
    <div className="products-container">
      <div>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Busca tus bebidas"
        />
        <select onChange={handleChangeStock} name="" id="">
          <option value="">Todos</option>
          <option value={false}>Sin stock</option>
          <option value={true}>Con stock</option>
        </select>
        <select onChange={handleChangeStatus} name="" id="">
          <option value="">Todos</option>
          <option value={false}>Inhabilitado</option>
          <option value={true}>Habilitado</option>
        </select>
      </div>

      {message ? (
        <label style={{ color: "black" }} htmlFor="">
          {message}
        </label>
      ) : null}
      {products.length ? (
        <div>
          {products.map((product) => {
            return <Product product={product} />;
          })}
        </div>
      ) : (
        <h1 className="products-loading">Cargando</h1>
      )}
      <div className="pagination-buttons">
        <button
          className="pagination-button"
          onClick={() => handlePreviousPage(pages, setPages)}
          disabled={pages === 1}
        >
          Anterior
        </button>
        <button
          className="pagination-button"
          onClick={() => handleNextPage(pages, setPages)}
          disabled={sig}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
