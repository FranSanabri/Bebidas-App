import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import {
  hadlerUser,
  handleEditCancel,
  handleInputChange,
} from "../../editProfile/handlersUser";
import { UserReviews } from "../../editProfile/userReviews";
import { UserRecord } from "../../editProfile/UserRecord";
import { UserEditImage } from "../../editProfile/userEditImage";

const ProfilePage = () => {
  // const { user } = useAuth0();
  const user = "juanpabloaste00@gmail.com";
  const [usuario, setUsuario] = useState({});
  const [save, setSave] = useState(false);
  const [img, setImg] = useState();
  const [putUser, setPutUser] = useState({
    userEmail: user,
    changes: [],
  });

  const [name, setName] = useState(false);
  const [edad, setEdad] = useState(false);
  const [telefono, setTelefono] = useState(false);
  const [ubicacion, setUbicacion] = useState(false);

  useEffect(() => {
    if (user) {
      axios(`https://servidor-vinos.onrender.com/users?email=${user}`)
        .then(({ data }) => {
          setUsuario(data);
        })
        .catch((error) => console.log("parece que hubo un error:", error));
    } else {
      alert("a ocurrido un error");
    }
  }, []);

  return (
    <div>
      <h1>Página de perfil</h1>
      {usuario.email ? (
        <div>
          <div>
            <h1>userName</h1>
            {usuario.userName && !name ? (
              <div>
                <h2>{usuario.userName}</h2>
                <button onClick={() => setName(true)}>Cambiar userName</button>
              </div>
            ) : (
              <div>
                {!name ? (
                  <div>
                    <h4>no has completado este campo</h4>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() =>
                        handleEditCancel(
                          setName,
                          setPutUser,
                          putUser,
                          "userName",
                          setSave
                        )
                      }
                    >
                      no cambiar userName
                    </button>
                  </div>
                )}
                <input
                  type="text"
                  onChange={(event) =>
                    handleInputChange(
                      event,
                      putUser,
                      "userName",
                      setPutUser,
                      setSave
                    )
                  }
                />
              </div>
            )}
          </div>
          <div>
            <h1>age</h1>
            {usuario.age && !edad ? (
              <div>
                <h2>{usuario.age}</h2>
                <button onClick={() => setEdad(true)}>Cambiar age</button>
              </div>
            ) : (
              <div>
                {!edad ? (
                  <div>
                    <h4>no has completado este campo</h4>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() =>
                        handleEditCancel(
                          setEdad,
                          setPutUser,
                          putUser,
                          "age",
                          setSave
                        )
                      }
                    >
                      no cambiar age
                    </button>
                  </div>
                )}
                <input
                  type="text"
                  onChange={(event) =>
                    handleInputChange(
                      event,
                      putUser,
                      "age",
                      setPutUser,
                      setSave
                    )
                  }
                />
              </div>
            )}
          </div>
          <div>
            <h1>phone</h1>
            {usuario.phone && !telefono ? (
              <div>
                <h2>{usuario.phone}</h2>
                <button onClick={() => setTelefono(true)}>Cambiar phone</button>
              </div>
            ) : (
              <div>
                {!telefono ? (
                  <div>
                    <h4>no has completado este campo</h4>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() =>
                        handleEditCancel(
                          setTelefono,
                          setPutUser,
                          putUser,
                          "phone",
                          setSave
                        )
                      }
                    >
                      no cambiar phone
                    </button>
                  </div>
                )}
                <input
                  type="text"
                  onChange={(event) =>
                    handleInputChange(
                      event,
                      putUser,
                      "phone",
                      setPutUser,
                      setSave
                    )
                  }
                />
              </div>
            )}
          </div>
          <div>
            <h1>ubicacion</h1>
            {usuario.ubicacion && !ubicacion ? (
              <div>
                <h2>{usuario.ubicacion}</h2>
                <button onClick={() => setUbicacion(true)}>
                  Cambiar ubicacion
                </button>
              </div>
            ) : (
              <div>
                {!ubicacion ? (
                  <div>
                    <h4>no has completado este campo</h4>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() =>
                        handleEditCancel(
                          setUbicacion,
                          setPutUser,
                          putUser,
                          "ubicacion",
                          setSave
                        )
                      }
                    >
                      no cambiar ubicacion
                    </button>
                  </div>
                )}
                <input
                  type="text"
                  onChange={(event) =>
                    handleInputChange(
                      event,
                      putUser,
                      "ubicacion",
                      setPutUser,
                      setSave
                    )
                  }
                />
              </div>
            )}
          </div>
          <UserEditImage
            usuario={usuario}
            putUser={putUser}
            setSave={setSave}
            data={"image"}
            setImg={setImg}
          />
          <UserReviews usuario={usuario} />
          <UserRecord usuario={usuario} />
          {save ? (
            <button onClick={() => hadlerUser(putUser, img)}>
              Cambiar perfil
            </button>
          ) : null}
        </div>
      ) : (
        <h1>cargando</h1>
      )}
    </div>
  );
};

export default ProfilePage;
