import { useState } from "react";
import { handleInputChange } from "./handlerProduct";
import "./EditProduct.css";

export const ProductEdit = ({ product, data, type, PutProduct, setPutProduct }) => {
  const [inputValue, setInputValue] = useState(product[data]);
  return(
    <div className="card">
        <label>{data}</label>
        <input
          type={type}
          value={inputValue}
          onChange={(event) => handleInputChange(event, PutProduct, data, setPutProduct, setInputValue)}
        />
      </div>
  )
};
