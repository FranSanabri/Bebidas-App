import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchResults from "../SearchResults/SearchResults";
import './ToolBar.css';

const Toolbar = ({ activeFilter, onFilterChange }) => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [bodyFiltros, setBodyFiltros] = useState({
    tipos: "",
    ofertas: false,
    porcentajeDesc: 0,
    Variedad: "",
    marca: "",
    contenido: 0,
    envase: "",
    ordenarmiento: "",
    cask: 0,
  });

  useEffect(() => {
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
    }
  };

  return (
    <div>
      <div className="toolbar-menu">
        <select value={activeFilter} onChange={handleFilterChange}>
          <option value="">Todos</option>
          <option value="Came">Vinos</option>
          <option value="Liqueur">Licores</option>
          <option value="Tequila">Tequilas</option>
          <option value="Beer">Cervezas</option>
          <option value="Drinks">Bebidas</option>
        </select>
      </div>
      <SearchResults searchResults={filteredResults} />
    </div>
  );
};

export default Toolbar;
