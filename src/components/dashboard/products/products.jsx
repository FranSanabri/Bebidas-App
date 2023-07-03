import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "./product";
import { handleNextPage, handlePreviousPage } from "../../ToolBar/handlers";
import "./products.css";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://servidor-vinos.onrender.com/product/all?paginas=${pages}&search=${search}`
      )
      .then(({ data }) => {
        setProducts(data);
        console.log(data);
      });
  }, [pages, search]);

  // Obtener los 5 productos correspondientes a la página actual
  const displayedProducts = products.slice(0, 5);

  return (
    <div className="products-container">
      {displayedProducts.length ? (
        <div>
          {displayedProducts.map((product) => {
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
          disabled={!products.length || products.length / 5 < 1}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
