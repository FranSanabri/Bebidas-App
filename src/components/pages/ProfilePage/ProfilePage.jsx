import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { hadlerUser} from "../../editProfile/handlersUser";
import { UserEdit } from "../../editProfile/userEdit";
import { UserReviews } from "../../editProfile/userReviews";
import { UserRecord } from "../../editProfile/UserRecord";

const ProfilePage = () => {
  // const { user } = useAuth0();
  const user = "administrado123@gmail.com";
  const [usuario, setUsuario] = useState({});
  const [save, setSave] = useState(false);
  const [putUser, setPutUser] = useState({
    userId: usuario.id,
    changes: [],
  });

  useEffect(() => {
    axios(`https://servidor-vinos.onrender.com/users?email=${user}`).then(({ data }) => {
      setUsuario(data);
      setPutUser({ ...putUser, userId: data.id });
    }).catch((error) => console.log("parece que hubo un error:", error));
  }, []);

  return (
    <div>
      <h1>Página de perfil</h1>
      {usuario.email ? (
        <div>
          <UserEdit
            usuario={usuario}
            putUser={putUser}
            setSave={setSave}
            data={"userName"}
          />
            <UserEdit
              usuario={usuario}
              putUser={putUser}
              setSave={setSave}
              data={"age"}
            />
          <UserEdit
            usuario={usuario}
            putUser={putUser}
            setSave={setSave}
            data={"phone"}
          />
          <UserEdit
            usuario={usuario}
            putUser={putUser}
            setSave={setSave}
            data={"ubicacion"}
          />
          <UserReviews usuario={usuario} />
          <UserRecord usuario={usuario} />
          {save ? (
            <button onClick={() => hadlerUser(putUser)}>Cambiar perfil</button>
          ) : null}
        </div>
      ) : (
        <h1>cargando</h1>
      )}
    </div>
  );
};

export default ProfilePage;
