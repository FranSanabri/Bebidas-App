import { useState } from "react";


export const UserAge = ({usuario, putUser, setPutUser, setSave}) => {
    const [editAge, setEditAge] = useState(false);
    return(
        <div>
            {usuario.age && !editAge ? (
            <div>
              <h1>{usuario.age}</h1>
              <button onClick={() => setEditAge(true)}>Cambiar edad</button>
            </div>
          ) : (
            <div>
              {!editAge ? (
                <div>
                  <h2>Edad</h2>
                  <h4>no has completado este campo</h4>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditAge(false);
                    setSave(false);
                  }}
                >
                  no cambiar edad
                </button>
              )}
              <input
                type="text"
                onChange={(event) => {
                  putUser.changes.push({
                    name: "age",
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