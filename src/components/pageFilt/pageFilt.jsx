import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  handleCask,
  handleContenedor,
  handleContenido,
  handleMarca,
  handleOferta,
  handleSabor,
  handleporcentaje,
  orderAlcoholContent,
  orderAmount,
  orderSells,
  orderprice,
} from "./handlers";

const PageFilt = () => {
  const { product, page } = useParams();
  const [filteredResults, setFilteredResults] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [sabor, setSabor] = useState([]);
  const [contenedor, setContenedor] = useState([]);
  const [bodyFiltros, setBodyFiltros] = useState({
    tipos: product,
    ofertas: "null",
    porcentajeDesc: { desde: 0, hasta: 0 },
    Variedad: "",
    marca: "",
    contenido: { desde: 0, hasta: 0 },
    envase: "",
    ordenarmiento: { name: "", order: "" },
    cask: 0,
  });

  useEffect(() => {
    axios
      .post(
        `https://servidor-vinos.onrender.com/product/filtrado?paginas=${page}`,
        bodyFiltros
      )
      .then(({ data }) => setFilteredResults(data));
  }, [bodyFiltros]);

  useEffect(() => {
    axios
      .get(`https://servidor-vinos.onrender.com/filtros?name=marca${product}`)
      .then(({ data }) => setMarcas(data));
  }, []);
  useEffect(() => {
    axios
      .get(`https://servidor-vinos.onrender.com/filtros?name=sabor${product}`)
      .then(({ data }) => setSabor(data));
  }, []);
  useEffect(() => {
    axios
      .get(`https://servidor-vinos.onrender.com/filtros?name=contenedor`)
      .then(({ data }) => setContenedor(data));
  }, []);

  return (
    <div>
      <div>
        <select
          onChange={(event) => handleSabor(event, bodyFiltros, setBodyFiltros)}
        >
          <option value="">Todos</option>
          {sabor.data?.map((sab) => {
            return <option value={sab}>{sab}</option>;
          })}
        </select>
        <select
          onChange={(event) => handleMarca(event, bodyFiltros, setBodyFiltros)}
        >
          <option value="">Todas</option>
          {marcas.data?.map((marc) => {
            return <option value={marc}>{marc}</option>;
          })}
        </select>
        {product !== "Wine" ? (
          <select
            onChange={(event) =>
              handleContenedor(event, bodyFiltros, setBodyFiltros)
            }
          >
            <option value="">Todos</option>
            {contenedor.data?.map((cont) => {
              return <option value={cont}>{cont}</option>;
            })}
          </select>
        ) : null}
        {product === "Wine" ? (
          <select
            onChange={(event) => handleCask(event, bodyFiltros, setBodyFiltros)}
          >
            <option value={0}>Todos</option>
            <option value={6}>6 Meses</option>
            <option value={12}>12 Meses</option>
            <option value={14}>14 Meses</option>
          </select>
        ) : null}
        <select
          onChange={(event) =>
            handleContenido(event, bodyFiltros, setBodyFiltros)
          }
        >
          <option value={0}>Todos</option>
          <option value={400}>400cc a 500cc</option>
          <option value={500}>500cc a 700cc</option>
          <option value={700}>700cc a 1000cc</option>
          <option value={1000}>1000cc a 2000cc</option>
        </select>
        <select
          onChange={(event) => handleOferta(event, bodyFiltros, setBodyFiltros)}
        >
          <option value="null">Todos</option>
          <option value={false}>Sin oferta</option>
          <option value={true}>Con Oferta</option>
        </select>
        <select
          onChange={(event) =>
            handleporcentaje(event, bodyFiltros, setBodyFiltros)
          }
        >
          <option value={0}>Todos</option>
          <option value={5}>De 5% a 10%</option>
          <option value={10}>De 10% a 25%</option>
          <option value={25}>De 25% a 35%</option>
        </select>
        <select
          onChange={(event) => orderprice(event, bodyFiltros, setBodyFiltros)}
        >
          <option value="todos">Todos</option>
          <option value="ascendente">Precio ascendente</option>
          <option value="Descendente">Precio Descendente</option>
        </select>
        <select
          onChange={(event) => orderSells(event, bodyFiltros, setBodyFiltros)}
        >
          <option value="todos">Todos</option>
          <option value="ascendente">ventas ascendente</option>
          <option value="Descendente">ventas Descendente</option>
        </select>
        <select
          onChange={(event) =>
            orderAlcoholContent(event, bodyFiltros, setBodyFiltros)
          }
        >
          <option value="todos">Todos</option>
          <option value="ascendente">Porcentaje de alcohol ascendente</option>
          <option value="Descendente">Porcentaje de alcohol Descendente</option>
        </select>
        <select
          onChange={(event) => orderAmount(event, bodyFiltros, setBodyFiltros)}
        >
          <option value="todos">Todos</option>
          <option value="ascendente">amount ascendente</option>
          <option value="Descendente">amount Descendente</option>
        </select>
      </div>
      <div>
        {filteredResults.length ? (
          filteredResults.map((prod) => {
            return <h1>{prod.name}</h1>;
          })
        ) : (
          <h1>cagando...</h1>
        )}
      </div>
    </div>
  );
};

export default PageFilt;
