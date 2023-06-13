import { useState } from "react";


export const UserUbicacion = ({usuario, putUser, setPutUser, setSave}) => {
    const [editUbicacion, setEditUbicacion] = useState(false);
    return(
        <div>
            {usuario.ubicacion && !editUbicacion ? (
            <div>
              <h1>{usuario.ubicacion}</h1>
              <button onClick={() => setEditUbicacion(true)}>
                Cambiar ubicacion
              </button>
            </div>
          ) : (
            <div>
              {!editUbicacion ? (
                <div>
                  <h2>Ubicaion</h2>
                  <h4>no has completado este campo</h4>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditUbicacion(false);
                    setSave(false);
                  }}
                >
                  no cambiar Ubicaion
                </button>
              )}
              <input
                type="text"
                onChange={(event) => {
                  putUser.changes.push({
                    name: "ubicacion",
                    data: event.target.value,
                  });
                  setSave(true);
                }}
              />
            </div>
          )}
        </div>
    )
}