import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductEdit } from "./productParams";
import { handlePutProduct } from "./handlerProduct";
import "./EditProduct.css";
import { TypeEdit } from "./selects/type";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { EditProductImg } from "./EditProductImg";
import { useAuth0 } from "@auth0/auth0-react";

function ProductoEditar() {
  // const user = {email:"juan@gmail.com"};
  // const user = {email:"finalproyecto06@gmail.com"};
  // const user = {};
  const { id } = useParams();
  const [usuario, setUsuario] = useState({});
  const [product, setProduct] = useState(null);
  const [putProduct, setPutProduct] = useState(null);
  const [marcas, setMarcas] = useState([]);
  const [sabor, setSabor] = useState([]);
  const [contenedor, setContenedor] = useState([]);
  const [create, setCreate] = useState([]);
  const [img, setImg] = useState([]);
  const [descuento, setDescuento] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
    if (user && user.email) {
      axios(`https://servidor-vinos.onrender.com/users?email=${user.email}`)
        .then(({ data }) => {
          setUsuario(data);
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((error) => console.log("parece que hubo un error:", error));
    } else {
      const storedUser = localStorage.getItem("user");
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser.email) {
        axios(
          `https://servidor-vinos.onrender.com/users?email=${parsedUser.email}`
        ).then(({ data }) => {
          setUsuario(data);
        });
      } else {
        alert("Ha ocurrido un error");
      }
    }
  }, [user]);

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
      } catch (error) {
        alert("Ha ocurrido un error")
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

  const manejarDescuento = (e) => {
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

  const manejarDisponibilidad = (e) => {
    if (e.target.value === "false") {
      const update = putProduct.changes.filter(
        (changeObj) => changeObj.name !== "availability"
      );
      update.push({ name: "availability", data: false });
      setPutProduct({ ...putProduct, changes: update });
    } else {
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
    <div>
      {usuario.admin ? (
        <div className="contenedor-editar-producto">
          <ProductEdit
            product={product}
            data="name"
            type="text"
            PutProduct={putProduct}
            setPutProduct={setPutProduct}
            className="editar-entrada"
          />
          <TypeEdit
            product={product}
            data="type"
            PutProduct={putProduct}
            setPutProduct={setPutProduct}
            setProduct={setProduct}
            className="editar-select"
          />
          <ProductEdit
            product={product}
            data="alcoholContent"
            type="number"
            PutProduct={putProduct}
            setPutProduct={setPutProduct}
            className="editar-entrada"
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
            className="editar-select"
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
            className="editar-select"
          />
          <ProductEdit
            product={product}
            data="amount"
            type="number"
            PutProduct={putProduct}
            setPutProduct={setPutProduct}
            className="editar-entrada"
          />
          {product.type === "Wine" ? (
            <ProductEdit
              product={product}
              data="cask"
              type="number"
              PutProduct={putProduct}
              setPutProduct={setPutProduct}
              className="editar-entrada"
            />
          ) : null}

          <ProductEdit
            product={product}
            data="price"
            type="number"
            PutProduct={putProduct}
            setPutProduct={setPutProduct}
            className="editar-entrada"
          />
          <ProductEdit
            product={product}
            data="stock"
            type="number"
            PutProduct={putProduct}
            setPutProduct={setPutProduct}
            className="editar-entrada"
          />

          <select onChange={manejarDescuento} className="editar-select">
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
              className="editar-entrada"
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
            className="editar-select"
          />

          <select onChange={manejarDisponibilidad} className="editar-select">
            <option value={false}>Sin habilitado</option>
            <option value={true}>Habilitado</option>
          </select>
          <h3>ventas: {product.sells}</h3>
          <ProductEdit
            product={product}
            data="description"
            type="text"
            PutProduct={putProduct}
            setPutProduct={setPutProduct}
            className="editar-entrada"
          />
          <EditProductImg
            product={product}
            setImg={setImg}
            img={img}
            className="editar-imagen-producto-1"
          />

          <button
            onClick={() => handlePutProduct(putProduct, create, img, product)}
            className="boton-editar-1"
          >
            Editar producto
          </button>
          <Link to="/dashboard" className="home-button">
            <FiHome className="home-icon" />
            Volver al inicio
          </Link>
        </div>
      ) : (
        <h1>401</h1>
      )}
    </div>
  );
}

export default ProductoEditar;
