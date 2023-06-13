import { useState } from "react";


export const UserName = ({usuario, putUser, setPutUser, setSave}) => {
    const [editName, setEditName] = useState(false);
 return(
    <div>
        {usuario.userName && !editName ? (
            <div>
              <h1>{usuario.userName}</h1>
              <button onClick={() => setEditName(true)}>
                Cambiar userName
              </button>
            </div>
          ) : (
            <div>
              {!editName ? (
                <div>
                  <h2>UserName</h2>
                  <h4>no has completado este campo</h4>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditName(false);
                    setSave(false);
                  }}
                >
                  no cambiar edad
                </button>
              )}
              <input
                type="text"
                onChange={(event) => {
                    const cambios = putUser.changes
                    cambios.push({
                    name: "userName",
                    data: event.target.value,
                  });
                  setPutUser({...putUser, changes: cambios})
                  setSave(true);
                }}
              />
            </div>
          )}
    </div>
 )
}