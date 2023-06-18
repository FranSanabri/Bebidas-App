import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "./product";
import { handleNextPage, handlePreviousPage } from "../../ToolBar/handlers";

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


  return (
    <div>
      {products.length ? (
        <div>
          {products.map((product) => {
            return <Product product={product} />;
          })}
        </div>
      ) : <h1>Cargando</h1> }
      <button
        onClick={() => handlePreviousPage(pages, setPages)}
        disabled={pages === 1}
      >
        Anterior
      </button>
      <button
        onClick={() => handleNextPage(pages, setPages)}
        disabled={!products.length || products.length / 10 < 1}
      >
        Siguiente
      </button>
    </div>
  );
};
