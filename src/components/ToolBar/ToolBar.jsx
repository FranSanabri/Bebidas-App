import React, { useState } from "react";
import SearchResults from "../SearchResults/SearchResults";
import { useEffect } from "react";
import axios from "axios";

const Toolbar = () => {
  const [activeFilter, setActiveFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
    const {data} = axios.post(`https://servidor-dogs-6whl.onrender.com/temperaments`, bodyFiltros)
    setFilteredResults(data)
  }, [bodyFiltros]);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setBodyFiltros({ ...bodyFiltros, tipos: selectedFilter });
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className={`toolbar ${isOpen ? "open" : ""}`}>
      <button className="toolbar-toggle" onClick={handleToggleMenu}>
        <span className="toolbar-toggle-line"></span>
        <span className="toolbar-toggle-line"></span>
        <span className="toolbar-toggle-line"></span>
      </button>
      <div className="toolbar-menu">
        <select value={activeFilter} onChange={handleFilterChange}>
          <option value="">Todos</option>
          <option value="vinos">Vinos</option>
          <option value="licores">Licores</option>
          <option value="tequilas">Tequilas</option>
          <option value="cervezas">Cervezas</option>
          <option value="coctelerias">Bebidas</option>
        </select>
      </div>
      <SearchResults
        searchResults={filteredResults}
        handleProductClick={handleProductClick}
      />
    </div>
  );
};

export default Toolbar;
