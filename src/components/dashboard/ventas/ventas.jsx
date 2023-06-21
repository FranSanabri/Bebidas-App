import axios from "axios";
import { useEffect, useState } from "react";
import { Venta } from "./venta";

export const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  useEffect(() => {
    axios
      .get("https://servidor-vinos.onrender.com/buy/all")
      .then(({ data }) => setVentas(data));
  }, []);


  return(
    <div>
        {ventas.length ? ventas.map((vent) => {
            return(
                <Venta vent={vent}  />
            )
        }) :null}
    </div>
  )
};
