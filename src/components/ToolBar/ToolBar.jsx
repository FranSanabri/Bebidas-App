import axios from "axios";
import { useEffect, useState } from "react";
import {
  handleCask,
  handleContenedor,
  handleContenido,
  handleMarca,
  handleNextPage,
  handleOferta,
  handlePreviousPage,
  handleSabor,
  handleSearchInputChange,
  handleTipos,
  handleporcentaje,
  orderAll,
} from "./handlers";
import SearchResults from "../SearchResults/SearchResults";
<<<<<<< HEAD
import './ToolBar.css';

const Toolbar = ({ activeFilter, onFilterChange }) => {
=======
import "./ToolBar.css";

const Toolbar = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
>>>>>>> 6553f089453cce068b9799221d91a10437ace453
  const [filteredResults, setFilteredResults] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [sabor, setSabor] = useState([]);
  const [contenedor, setContenedor] = useState([]);
  const [bodyFiltros, setBodyFiltros] = useState({
    tipos: "",
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
<<<<<<< HEAD
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          "https://servidor-vinos.onrender.com/product/filtrado?paginas=1&cantidad=10",
          bodyFiltros
        );
        setFilteredResults(data);
        console.log(data);
      } catch (error) {
        console.error("Error al filtrar productos:", error);
      }
    };

    fetchData();
  }, [bodyFiltros]);

  const handleFilterChange = async (event) => {
    const selectedFilter = event.target.value;
    onFilterChange(selectedFilter); // Llamar a la función onFilterChange desde Tienda
    setBodyFiltros({ ...bodyFiltros, tipos: selectedFilter }); // Actualizar el estado local

    try {
      const { data } = await axios.post(
        "https://servidor-vinos.onrender.com/product/filtrado?paginas=1&cantidad=10",
        { ...bodyFiltros, tipos: selectedFilter }
      );
      setFilteredResults(data);
      console.log(data);
    } catch (error) {
      console.error("Error al filtrar productos:", error);
=======
    axios
      .post(
        `https://servidor-vinos.onrender.com/product/filtrado?paginas=${page}&search=${search}`,
        bodyFiltros
      )
      .then(({ data }) => setFilteredResults(data));
  }, [bodyFiltros, page, search]);
  useEffect(() => {
    if (bodyFiltros.tipos !== "") {
      axios
        .get(
          `https://servidor-vinos.onrender.com/filtros?name=marca${bodyFiltros.tipos}`
        )
        .then(({ data }) => setMarcas(data));
>>>>>>> 6553f089453cce068b9799221d91a10437ace453
    }
  }, [bodyFiltros.tipos]);
  useEffect(() => {
    if (bodyFiltros.tipos !== "") {
      axios
        .get(
          `https://servidor-vinos.onrender.com/filtros?name=sabor${bodyFiltros.tipos}`
        )
        .then(({ data }) => setSabor(data));
    }
  }, [bodyFiltros.tipos]);
  useEffect(() => {
    if (bodyFiltros.tipos !== "") {
      axios
        .get(`https://servidor-vinos.onrender.com/filtros?name=contenedor`)
        .then(({ data }) => setContenedor(data));
    }
  }, [bodyFiltros.tipos]);

  return (
    <div>
      <div>
        <div className="search-bar-container">
          <div className="search-bar-wrapper">
            <div className="search-bar-input">
              <input
                type="text"
                value={search}
                onChange={(event) =>
                  handleSearchInputChange(event, setSearch, setPage)
                }
                placeholder="Busca tus bebidas"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="filtros">
        <select
          className="select"
          onChange={(event) =>
            handleTipos(event, bodyFiltros, setBodyFiltros, setPage)
          }
        >
          <option value="">Todos</option>
<<<<<<< HEAD
          <option value="Came">Vinos</option>
          <option value="Liqueur">Licores</option>
          <option value="Tequila">Tequilas</option>
=======
          <option value="Wine">Vinos</option>
>>>>>>> 6553f089453cce068b9799221d91a10437ace453
          <option value="Beer">Cervezas</option>
          <option value="Tequila">Tequilas</option>
          <option value="Liqueur">Licores</option>
          <option value="Drinks">Bebidas</option>
        </select>
        {bodyFiltros.tipos !== "" ? (
          <select
            className="select"
            onChange={(event) =>
              handleSabor(event, bodyFiltros, setBodyFiltros, setPage)
            }
          >
            <option value="">Marca</option>
            {sabor &&
              sabor.data?.map((sab) => {
                return <option value={sab}>{sab}</option>;
              })}
          </select>
        ) : null}
        {bodyFiltros.tipos !== "" ? (
          <select
            className="select"
            onChange={(event) =>
              handleMarca(event, bodyFiltros, setBodyFiltros, setPage)
            }
          >
            <option value="">Tipo</option>
            {marcas.data?.map((marc) => {
              return <option value={marc}>{marc}</option>;
            })}
          </select>
        ) : null}
        {bodyFiltros.tipos !== "Wine" && bodyFiltros.tipos !== "" ? (
          <select
            className="select"
            onChange={(event) =>
              handleContenedor(event, bodyFiltros, setBodyFiltros, setPage)
            }
          >
            <option value="">Todos</option>
            {contenedor.data?.map((cont) => {
              return <option value={cont}>{cont}</option>;
            })}
          </select>
        ) : null}
        {bodyFiltros.tipos === "Wine" && bodyFiltros.tipos !== "" ? (
          <select
            className="select"
            onChange={(event) =>
              handleCask(event, bodyFiltros, setBodyFiltros, setPage)
            }
          >
            <optgroup label="Sin orden"></optgroup>
            <option value={0}>Fecha</option>
            <option value={6}>6 Meses</option>
            <option value={12}>12 Meses</option>
            <option value={14}>14 Meses</option>
          </select>
        ) : null}
        <select
          className="select"
          onChange={(event) =>
            handleContenido(event, bodyFiltros, setBodyFiltros, setPage)
          }
        >
          <optgroup value={0} label="Cantidad"></optgroup>
          <option value={0}>Cantidad</option>
          <option value={400}>400cc a 500cc</option>
          <option value={500}>500cc a 700cc</option>
          <option value={700}>700cc a 1000cc</option>
          <option value={1000}>1000cc a 2000cc</option>
        </select>
        <select
          className="select"
          onChange={(event) =>
            handleOferta(event, bodyFiltros, setBodyFiltros, setPage)
          }
        >
          <optgroup label="Ofertas">
            <option value="null">Ofertas</option>
            <option value={false}>Sin oferta</option>
            <option value={true}>Con Oferta</option>
          </optgroup>
        </select>
        <select
          className="select"
          onChange={(event) =>
            handleporcentaje(event, bodyFiltros, setBodyFiltros, setPage)
          }
        >
          <optgroup label="Porcentaje de descuento">
            <option value={0}>Porcentaje de descuento</option>
            <option value={5}>De 5% a 10%</option>
            <option value={10}>De 10% a 25%</option>
            <option value={25}>De 25% a 35%</option>
          </optgroup>
        </select>
        <select
          className="select"
          onChange={(event) =>
            orderAll(event, bodyFiltros, setBodyFiltros, setPage)
          }
        >
          <optgroup label="Sin orden">
            <option value="todos">Ordenamiento</option>
          </optgroup>
          <optgroup label="Orden de precio">
            <option value="precioAscendente">Precio ascendente</option>
            <option value="precioDescendente">Precio Descendente</option>
          </optgroup>
          <optgroup label="Orden de ventas">
            <option value="ventasAscendente">Ventas ascendente</option>
            <option value="ventasDescendente">Ventas Descendente</option>
          </optgroup>
          <optgroup label="Orden de contenido de alcohol">
            <option value="alcoholAscendente">
              Porcentaje de alcohol ascendente
            </option>
            <option value="alcoholDescendente">
              Porcentaje de alcohol Descendente
            </option>
          </optgroup>
          <optgroup label="Orden de contenido">
            <option value="amountAscendente">amount ascendente</option>
            <option value="amountDescendente">amount Descendente</option>
          </optgroup>
        </select>
      </div>
      <div>
        <SearchResults searchResults={filteredResults} />
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePreviousPage(page, setPage)}
          disabled={page === 1}
        >
          Anterior
        </button>
        <button
          onClick={() => handleNextPage(page, setPage)}
          disabled={!filteredResults.length || (filteredResults.length / 10 < 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
