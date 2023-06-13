import { useState } from "react";


export const UserPhone = ({usuario, putUser, setPutUser, setSave}) => {
    const [editPhone, setEditPhone] = useState(false);
    return(
        <div>
            {usuario.phone && !editPhone ? (
            <div>
              <h1>{usuario.phone}</h1>
              <button onClick={() => setEditPhone(true)}>Cambiar phone</button>
            </div>
          ) : (
            <div>
              {!editPhone ? (
                <div>
                  <h2>Telefono</h2>
                  <h4>no has completado este campo</h4>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditPhone(false);
                    setSave(false);
                  }}
                >
                  no cambiar Telefono
                </button>
              )}
              <input
                type="text"
                onChange={(event) => {
                  putUser.changes.push({
                    name: "phone",
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