import { useState } from "react";
import { handleEditCancel, handleInputChange } from "./handlersUser";

export const UserEdit = ({ usuario, putUser, setPutUser, setSave, data }) => {
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
              <h4>no has completado este campo</h4>
            </div>
          ) : (
            <div>
              <button
                onClick={() =>
                  handleEditCancel(setEdit, setPutUser, putUser, data, setSave)
                }
              >
                no cambiar {data}
              </button>
            </div>
          )}
          <input
            type="text"
            onChange={(event) =>
              handleInputChange(event, putUser, data, setPutUser, setSave)
            }
          />
        </div>
      )}
    </div>
  );
};
