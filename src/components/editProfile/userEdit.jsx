import { useState } from "react";

export const UserEdit = ({ usuario, putUser, setSave, data }) => {
  const [edit, setEdit] = useState(false);
  return (
    <div>
      <h1>{data}</h1>
      {usuario[data] && !edit ? (
        <div>
          <h2>{usuario[data]}</h2>
          <button onClick={() => setEdit(true)}>Cambiar {data}</button>
        </div>
      ) : (
        <div>
          {!edit ? (
            <div>
              <h2>{usuario[data]}</h2>
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
            type="text"
            onChange={(event) => {
              putUser.changes.push({
                name: data,
                data: event.target.value,
              });
              setSave(true);
            }}
          />
        </div>
      )}
    </div>
  );
};
