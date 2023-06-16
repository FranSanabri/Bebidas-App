import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { hadlerUser } from "../../editProfile/handlersUser";
import { UserEdit } from "../../editProfile/userEdit";
import { UserReviews } from "../../editProfile/userReviews";
import { UserRecord } from "../../editProfile/UserRecord";
import { UserEditImage } from "../../editProfile/userEditImage";

const ProfilePage = () => {
  const { user } = useAuth0();
  // const user = "administrado123@gmail.com";
  const [usuario, setUsuario] = useState({});
  const [save, setSave] = useState(false);
  const [img, setImg] = useState();
  const [putUser, setPutUser] = useState({
    userId: usuario.id,
    changes: [],
  });

  console.log(putUser);

  useEffect(() => {
    if (user) {
      axios(`https://servidor-vinos.onrender.com/users?email=${user.name}`)
        .then(({ data }) => {
          setUsuario(data[0]);
          setPutUser({ ...putUser, userId: data[0].id });
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
          <UserEdit
            usuario={usuario}
            putUser={putUser}
            setPutUser={setPutUser}
            setSave={setSave}
            data={"userName"}
          />
          <UserEdit
            usuario={usuario}
            putUser={putUser}
            setPutUser={setPutUser}
            setSave={setSave}
            data={"age"}
          />
          <UserEdit
            usuario={usuario}
            putUser={putUser}
            setPutUser={setPutUser}
            setSave={setSave}
            data={"phone"}
          />
          <UserEdit
            usuario={usuario}
            putUser={putUser}
            setPutUser={setPutUser}
            setSave={setSave}
            data={"ubicacion"}
          />
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
