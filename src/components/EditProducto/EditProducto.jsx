import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductEdit } from "./productParams";
import { handlePutProduct } from "./handlerProduct";
import "./EditProduct.css";
import { TypeEdit } from "./selects/type";

function ProductoEditar() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [putProduct, setPutProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [sabor, setSabor] = useState([]);
  const [contenedor, setContenedor] = useState([]);
  const [create, setCreate] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://servidor-vinos.onrender.com/product/${id}`
        );
        setProduct(response.data);
        setPutProduct({
          productId: response.data.id,
          changes: [],
        });
      } catch (error) {
        setErrorMessage("Error al obtener los datos del producto.");
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      axios
        .get(
          `https://servidor-vinos.onrender.com/filtros?name=marca${product.type}`
        )
        .then(({ data }) => setMarcas(data));
    }
  }, [product]);
  useEffect(() => {
    if (product) {
      axios
        .get(
          `https://servidor-vinos.onrender.com/filtros?name=sabor${product.type}`
        )
        .then(({ data }) => setSabor(data));
    }
  }, [product]);
  useEffect(() => {
    if (product) {
      axios
        .get(`https://servidor-vinos.onrender.com/filtros?name=contenedor`)
        .then(({ data }) => setContenedor(data));
    }
  }, [product]);

  console.log(putProduct);
  console.log(create);

  if (!product) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="container">
      <ProductEdit
        product={product}
        data="name"
        type="text"
        PutProduct={putProduct}
        setPutProduct={setPutProduct}
      />
      <TypeEdit
        product={product}
        data="type"
        PutProduct={putProduct}
        setPutProduct={setPutProduct}
      />
      <ProductEdit
        product={product}
        data="alcoholContent"
        type="number"
        PutProduct={putProduct}
        setPutProduct={setPutProduct}
      />
      <TypeEdit
        product={product}
        data="Variety"
        type={sabor}
        PutProduct={putProduct}
        setPutProduct={setPutProduct}
        setCreate={setCreate}
        create={create}
       dataFilt={`sabor${product.type}`}
      />
      <TypeEdit
        product={product}
        data="brand"
        type={marcas}
        PutProduct={putProduct}
        setPutProduct={setPutProduct}
        setCreate={setCreate}
        create={create}
        dataFilt={`marca${product.type}`}
      />
      <ProductEdit
        product={product}
        data="amount"
        type="number"
        PutProduct={putProduct}
        setPutProduct={setPutProduct}
      />
      <ProductEdit
        product={product}
        data="cask"
        type="number"
        PutProduct={putProduct}
        setPutProduct={setPutProduct}
      />
      <ProductEdit
        product={product}
        data="price"
        type="number"
        PutProduct={putProduct}
        setPutProduct={setPutProduct}
      />
      <ProductEdit
        product={product}
        data="stock"
        type="number"
        PutProduct={putProduct}
        setPutProduct={setPutProduct}
      />
      <ProductEdit
        product={product}
        data="ableDiscount"
        type="bulean"
        PutProduct={putProduct}
        setPutProduct={setPutProduct}
      />
      <ProductEdit
        product={product}
        data="percentageDiscount"
        type="number"
        PutProduct={putProduct}
        setPutProduct={setPutProduct}
      />
      <TypeEdit
        product={product}
        data="container"
        type={contenedor}
        PutProduct={putProduct}
        setPutProduct={setPutProduct}
        setCreate={setCreate}
        create={create}
        dataFilt={`contenedor`}
      />
      <ProductEdit
        product={product}
        data="availability"
        type="bulean"
        PutProduct={putProduct}
        setPutProduct={setPutProduct}
      />
      <h3>ventas:{product.sells}</h3>
      <ProductEdit
        product={product}
        data="description"
        type="text"
        PutProduct={putProduct}
        setPutProduct={setPutProduct}
      />
      {product.images.map((image) => {
        return (
          <div>
            <img src={image} alt="" />
          </div>
        );
      })}

      <button onClick={() => handlePutProduct(putProduct, create)}>
        cambiar prroducto
      </button>
    </div>
  );
}

export default ProductoEditar;
