import { useState } from "react";
import './userEditImage.css';

export const UserEditImage = ({ usuario, setSave, data, setImg }) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="user-edit-image-container">
      <h1 className="data-title">{data}</h1>
      {usuario[data] && !edit ? (
        <div className="image-container">
          <img className="user-image" src={usuario[data]} alt="" />
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
                onClick={() => {
                  setEdit(false);
                  setSave(false);
                }}
              >
                No cambiar {data}
              </button>
            </div>
          )}
          <input
            className="image-input"
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
