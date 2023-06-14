import { useState } from "react";

export const EditProductImg = ({ usuario, setSave, data, setImg }) => {
  const [edit, setEdit] = useState(false);
  return (
    <div>
      <h1>{data}</h1>
      {usuario[data] && !edit ? (
        <div>
          <img src={usuario[data]} alt="" />
          <button onClick={() => setEdit(true)}>Cambiar {data}</button>
        </div>
      ) : (
        <div>
          {!edit ? (
            <div>
              <h4>no has completado este campo</h4>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  setEdit(false);
                  setSave(false);
                }}
              >
                no cambiar {data}
              </button>
            </div>
          )}
          <input
            name="image"
            type="file"
            onChange={(event) => {
              setSave(true);
              setImg(event.target.files[0]);
            }}
            placeholder="I"
            required
          />
        </div>
      )}
    </div>
  );
};
