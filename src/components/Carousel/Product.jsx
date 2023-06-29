import React from "react";
import Tienda from "../pages/Tienda/Tienda";
import { NavLink } from "react-router-dom";

export default function Product(props) {
  return (
    <div className="card-1">
      <img className="product--image-1" src={props.url} alt="product image" />
      <h2 className="titulo">{props.name}</h2>
      <p className="price">{props.price}</p>
      <p className="descripcion">{props.description}</p>
      <p><NavLink exact
                    to="/tienda" >
        <button>Ver en la Tienda</button>
        </NavLink>
        <NavLink />
      </p>
    </div>
  );
}