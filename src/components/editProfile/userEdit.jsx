import { useState } from "react";
import { handleEditCancel, handleInputChange } from "./handlersUser";
import './userEdit.css';

export const UserEdit = ({ usuario, putUser, setPutUser, setSave, data }) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="user-edit-container">
      <h1 className="data-title">{data}</h1>
      {usuario[data] && !edit ? (
        <div>
          <h2 className="data-value">{usuario[data]}</h2>
          <button className="change-button" onClick={() => setEdit(true)}>
            Cambiar {data}
          </button>
        </div>
      ) : (
        <div>
          {!edit ? (
            <div>
              <h4 className="incomplete-field">No has completado este campo</h4>
            </div>
          ) : (
            <div>
              <button
                className="cancel-button"
                onClick={() =>
                  handleEditCancel(setEdit, setPutUser, putUser, data, setSave)
                }
              >
                No cambiar {data}
              </button>
            </div>
          )}
          <input
            className="data-input"
            type="text"
            onChange={(event) =>
              handleInputChange(event, putUser, data, setPutUser, setSave)
            }
            value={putUser.changes.find((changeObj) => changeObj.name === data)?.data || ''}
          />
        </div>
      )}
    </div>
  );
};
