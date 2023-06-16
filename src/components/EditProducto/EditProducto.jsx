import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductEdit } from "./productParams";
import { handlePutProduct } from "./handlerProduct";
import "./EditProduct.css";
import { TypeEdit } from "./selects/type";
import { EditProductImg } from "./EditProductImg";

function ProductoEditar() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [putProduct, setPutProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [sabor, setSabor] = useState([]);
  const [contenedor, setContenedor] = useState([]);
  const [create, setCreate] = useState([]);
  const [img, setImg] = useState([]);
  const [descuento, setDescuento] = useState(null);
  const [habilitado, setHabilitado] = useState(null);

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
        setDescuento(response.data.ableDiscount);
        setHabilitado(response.data.availability);
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

  console.log(product);

  const handleDescount = (e) => {
    if (e.target.value === "false") {
      setDescuento(false);
      const update = putProduct.changes.filter(
        (changeObj) => changeObj.name !== "ableDiscount"
      );
      update.push({ name: "ableDiscount", data: false });
      setPutProduct({ ...putProduct, changes: update });
    } else {
      setDescuento(true);
      const update = putProduct.changes.filter(
        (changeObj) => changeObj.name !== "ableDiscount"
      );
      update.push({ name: "ableDiscount", data: true });
      setPutProduct({ ...putProduct, changes: update });
    }
  };

  const handleAvailability = (e) => {
    if (e.target.value === "false") {
      setHabilitado(false);
      const update = putProduct.changes.filter(
        (changeObj) => changeObj.name !== "availability"
      );
      update.push({ name: "availability", data: false });
      setPutProduct({ ...putProduct, changes: update });
    } else {
      setHabilitado(true);
      const update = putProduct.changes.filter(
        (changeObj) => changeObj.name !== "availability"
      );
      update.push({ name: "availability", data: true });
      setPutProduct({ ...putProduct, changes: update });
    }
  };

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
        setProduct={setProduct}
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
      {product.type === "Wine" ? (
        <ProductEdit
          product={product}
          data="cask"
          type="number"
          PutProduct={putProduct}
          setPutProduct={setPutProduct}
        />
      ) : null}

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

      <select onChange={handleDescount}>
        <option value={false}>Sin descuento</option>
        <option value={true}>Con descuento</option>
      </select>
      {descuento ? (
        <ProductEdit
          product={product}
          data="percentageDiscount"
          type="number"
          PutProduct={putProduct}
          setPutProduct={setPutProduct}
        />
      ) : null}

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

      <select onChange={handleAvailability}>
        <option value={false}>Sin habilitado</option>
        <option value={true}>habilitado</option>
      </select>
      <h3>ventas:{product.sells}</h3>
      <ProductEdit
        product={product}
        data="description"
        type="text"
        PutProduct={putProduct}
        setPutProduct={setPutProduct}
      />
      <EditProductImg product={product} setImg={setImg} img={img} />

      <button
        onClick={() => handlePutProduct(putProduct, create, img, product)}
      >
        Editar producto
      </button>
    </div>
  );
}

export default ProductoEditar;
