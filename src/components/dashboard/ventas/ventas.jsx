import axios from "axios";
import { useEffect, useState } from "react";
import { Venta } from "./venta";
import { handleNextPage, handlePreviousPage } from "../../ToolBar/handlers";

export const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [pendientes, setPendientes] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/buy/all`);
        const { data } = response;
        setVentas(data);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <button onClick={() => setPendientes(pendientes ? false : true)} >{pendientes ? "Todos" : "Pendientes"}</button>
      {ventas.length ? (
        ventas.map((vent) => <Venta vent={vent} pendientes={pendientes} />)
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};
