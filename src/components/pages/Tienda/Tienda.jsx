import React, { useState } from "react";
import NavBar from "../../Navbar/Navbar";
import "./Tienda.css";
import Toolbar from "../../ToolBar/ToolBar";
import Footer from "../../Footer/Footer";

function Tienda() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("");

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleFilterChange = (selectedFilter) => {
    setActiveFilter(selectedFilter);
    setCurrentPage(1);
  };

  return (
    <div>
      <NavBar />
      <Toolbar
        currentPage={currentPage}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      {/* <div className="product-list">
        <SearchResults searchResults={searchResults} />
      </div> */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <button onClick={handleNextPage}>Siguiente</button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Tienda;
