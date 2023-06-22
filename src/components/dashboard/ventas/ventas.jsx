import axios from "axios";
import { useEffect, useState } from "react";
import { Venta } from "./venta";

export const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ventasPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("https://servidor-vinos.onrender.com/buy/all")
      .then(({ data }) => setVentas(data));
  }, []);

  // Calcular el índice del último pedido en la página actual
  const indexOfLastVenta = currentPage * ventasPerPage;
  // Calcular el índice del primer pedido en la página actual
  const indexOfFirstVenta = indexOfLastVenta - ventasPerPage;
  // Obtener las ventas de la página actual
  const ventasActuales = ventas.slice(indexOfFirstVenta, indexOfLastVenta);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(ventas.length / ventasPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      {ventasActuales.map((vent) => (
        <Venta key={vent.payment_intent} vent={vent} />
      ))}

      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{ marginRight: "0.5rem" }}
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={ventasActuales.length < ventasPerPage}
          style={{ marginLeft: "0.5rem" }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
