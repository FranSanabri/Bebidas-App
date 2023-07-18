import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import {
  hadlerUser,
  handleEditCancel,
  handleInputChange,
} from "../../editProfile/handlersUser";
import { UserReviews } from "../../editProfile/userReviews";
import { UserRecord } from "../../editProfile/UserRecord";
import { UserEditImage } from "../../editProfile/userEditImage";
import "./profilePage.css";

const ProfilePage = ({ usuarios }) => {
  // const user = {email:"juan@gmail.com"};
  // const user = {email:"finalproyecto06@gmail.com"};
  // const user = {};
  const [usuario, setUsuario] = useState(usuarios ? usuarios : null);
  const [save, setSave] = useState(false);
  const [img, setImg] = useState();
  const [putUser, setPutUser] = useState({
    userEmail: usuario ? usuario.email : null,
    changes: [],
  });
  const [name, setName] = useState(false);
  const [edad, setEdad] = useState(false);
  const [telefono, setTelefono] = useState(false);
  const [ubicacion, setUbicacion] = useState(false);

  useEffect(() => {
    if (usuarios) {
      setPutUser((prevPutUser) => ({
        ...prevPutUser,
        userEmail: usuarios.email,
      }));
      setUsuario(usuarios);
    }
  }, [usuarios]);

  return (
    <div className="profile-container">
      <h1>Perfil</h1>
      {usuario && usuario.email ? (
        <div>
          <div className="profile-field-container">
            <h1 className="profile-title">Nombre</h1>
            {usuario.userName && !name ? (
              <div>
                <h2 className="profile-field-value">{usuario.userName}</h2>
                <button
                  className="profile-button"
                  onClick={() => setName(true)}
                >
                  Cambiar nombre
                </button>
              </div>
            ) : (
              <div>
                {!name ? (
                  <div>
                    <h4 className="profile-field-value">
                      No has completado este campo
                    </h4>
                  </div>
                ) : (
                  <div>
                    <button
                      className="profile-button profile-edit-button"
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
                      No cambiar nombre
                    </button>
                  </div>
                )}
                <input
                  className="profile-input"
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
          <div className="profile-field-container">
            <h1 className="profile-title">Edad</h1>
            {usuario.age && !edad ? (
              <div>
                <h2 className="profile-field-value">{usuario.age}</h2>
                <button
                  className="profile-button"
                  onClick={() => setEdad(true)}
                >
                  Cambiar edad
                </button>
              </div>
            ) : (
              <div>
                {!edad ? (
                  <div>
                    <h4 className="profile-field-value">
                      No has completado este campo
                    </h4>
                  </div>
                ) : (
                  <div>
                    <button
                      className="profile-button profile-edit-button"
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
                      No cambiar edad
                    </button>
                  </div>
                )}
                <input
                  className="profile-input"
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
          <div className="profile-field-container">
            <h1 className="profile-title">Celular</h1>
            {usuario.phone && !telefono ? (
              <div>
                <h2 className="profile-field-value">{usuario.phone}</h2>
                <button
                  className="profile-button"
                  onClick={() => setTelefono(true)}
                >
                  Cambiar celular
                </button>
              </div>
            ) : (
              <div>
                {!telefono ? (
                  <div>
                    <h4 className="profile-field-value">
                      No has completado este campo
                    </h4>
                  </div>
                ) : (
                  <div>
                    <button
                      className="profile-button profile-edit-button"
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
                      No cambiar numero de celular
                    </button>
                  </div>
                )}
                <input
                  className="profile-input"
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
          <div className="profile-field-container">
            <h1 className="profile-title">Ubicacion</h1>
            {usuario.ubicacion && !ubicacion ? (
              <div>
                <h2 className="profile-field-value">{usuario.ubicacion}</h2>
                <button
                  className="profile-button"
                  onClick={() => setUbicacion(true)}
                >
                  Cambiar ubicacion
                </button>
              </div>
            ) : (
              <div>
                {!ubicacion ? (
                  <div>
                    <h4 className="profile-field-value">
                      No has completado este campo
                    </h4>
                  </div>
                ) : (
                  <div>
                    <button
                      className="profile-button profile-edit-button"
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
                      No cambiar ubicacion
                    </button>
                  </div>
                )}
                <input
                  className="profile-input"
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
            <button
              className="profile-button profile-save-button"
              onClick={() => hadlerUser(putUser, img)}
            >
              Cambiar perfil
            </button>
          ) : null}
        </div>
      ) : (
        <h1>Cargando</h1>
      )}
      <div className="back-tienda">
        <Link to="/Tienda" className="back-to-store-link">
          <FiArrowLeft className="back-to-store-icon" /> Volver a la tienda
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
