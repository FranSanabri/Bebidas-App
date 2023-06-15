import { useState } from "react";
import "../EditProduct.css";

export const TypeEdit = ({
  product,
  data,
  PutProduct,
  setPutProduct,
  type,
  create,
  setCreate,
  dataFilt,
}) => {
  const [inputValue, setInputValue] = useState(product[data]);
  const [nuevo, setNuevo] = useState(false);

  const handleClick = () => {
    setNuevo(false);
    const update = PutProduct.changes.filter(
      (changeObj) => changeObj.name !== data
    );
    setPutProduct({ ...PutProduct, changes: update });
    setInputValue(product[data]);
  };

  const handleChangeInput = (event) => {
    let change = event.target.value;
    if(change){
    change = change[0].toUpperCase()+ change.slice(1);;}
    const update = PutProduct.changes.filter(
      (changeObj) => changeObj.name !== data
    );
    update.push({ name: data, data: change });
    setPutProduct({ ...PutProduct, changes: update });

    const updatefilt = create.filter(
      (changeObj) => changeObj.name !== dataFilt
    );
    if (change !== "") {
      updatefilt.push({ name: dataFilt, data: change });
    }

    setCreate(updatefilt);
  };

  const handleChange = (event) => {
    const change = event.target.value;
    if (change === "new") {
      setNuevo(true);
      const update = PutProduct.changes.filter(
        (changeObj) => changeObj.name !== data
      );
      setPutProduct({ ...PutProduct, changes: update });
    } else {
      setInputValue(change);
      const update = PutProduct.changes.filter(
        (changeObj) => changeObj.name !== data
      );
      update.push({ name: data, data: change });
      setPutProduct({ ...PutProduct, changes: update });
    }
  };
  return (
    <div className="card">
      <label>{data}</label>
      {!nuevo ? (
        <input type="text" value={inputValue} />
      ) : (
        <div>
          <input type="text" onChange={handleChangeInput} />
          <button onClick={handleClick}>No Crear</button>
        </div>
      )}
      {data !== "type" && !nuevo ? (
        <select onChange={handleChange}>
          {type.data?.map((typ) => {
            return <option value={typ}>{typ}</option>;
          })}
          <option value="new">Crear Nuevo...</option>
        </select>
      ) : null}
      {data === "type" && !nuevo ? (
        <select onChange={handleChange}>
          <option value="Wine">Vinos</option>
          <option value="Beer">Cervezas</option>
          <option value="Tequila">Tequilas</option>
          <option value="Liqueur">Licores</option>
          <option value="Drinks">Bebidas</option>
        </select>
      ) : null}
    </div>
  );
};
