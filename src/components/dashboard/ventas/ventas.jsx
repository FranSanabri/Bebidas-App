import axios from "axios";
import { useEffect, useState } from "react";
import { Venta } from "./venta";

export const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://servidor-vinos.onrender.com/pedidos?paginas=${currentPage}&estado=${status}`
      )
      .then(({ data }) => {
        setVentas(data);
        if (data.length < 10) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          alert("Ha ocurrido un error")
          console.log(error);
        } else {
          if(currentPage > 1){
          setCurrentPage(currentPage - 1);
          setVentas([]);
          setDisabled(true);}
        }
      });
  }, [currentPage, status]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <select onChange={handleChange} id="">
        <option value="">Todas</option>
        <option value="pending">Pendiente</option>
        <option value="delivered">Entregada</option>
      </select>
      {ventas.length ? (
        ventas.map((vent) => <Venta key={vent.id} vent={vent} />)
      ) : (
        <h1>No se encontraron pedidos</h1>
      )}

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{ marginRight: "0.5rem" }}
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={disabled}
          style={{ marginLeft: "0.5rem" }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
