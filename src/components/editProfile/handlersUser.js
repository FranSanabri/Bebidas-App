import axios from "axios";

export const hadlerUser = async (putUser, img) => {
  if (img) {
    const imageUrl = await uploadImage(img);
    putUser.changes.push({
      name: "image",
      data: imageUrl,
    });
  }
  try {
    await axios.put("https://servidor-vinos.onrender.com/users/put", putUser);
    alert("Se ha cambiado tu perfil");
  } catch (error) {
    alert("parece que hubo un error")
    console.log("Parece que hubo un error:", error);
  }
};

export const handlerReview = (id, setReview, setWatchReviews) => {
  if (id) {
    setWatchReviews(true);
    axios(`https://servidor-vinos.onrender.com/reviews?paginas=1&userId=${id}`)
      .then(({ data }) => {
        if (data.length) {
          setReview(data);
        }
      })
      .catch((error) => console.log("parece que hubo un error:", error));
  }
};

export const handlerRecord = async (ids, setRecord, setWatchRecord) => {
  setWatchRecord(true);
  const productos = [];
  if (ids) {
    for (const id of ids) {
      await axios(`https://servidor-vinos.onrender.com/product/${id}`)
        .then(({ data }) => {
          if (data.name) {
            productos.push(data);
          }
        })
        .catch((error) => console.log("parece que hubo un error:", error));
    }
  }
  setRecord(productos);
};

export const uploadImage = async (img) => {
  try {
    const imageFormData = new FormData();
    imageFormData.append("image", img);
    const { data } = await axios.post(
      "https://api.imgbb.com/1/upload?key=171a59fb0c1e2f1606024563e5f358d8",
      imageFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data.data.url;
  } catch (error) {
    console.log("Parece que hubo un error:", error);
    return null;
  }
};


export const handleInputChange = (event, putUser, data, setPutUser, setSave) => {
  const change = event.target.value;
  if (change === "") {
    const updatedChanges = putUser.changes.filter(
      (changeObj) => changeObj.name !== data
    );
    setPutUser({
      ...putUser,
      changes: updatedChanges,
    });
  } else {
    const updatedChanges = putUser.changes.filter(
      (changeObj) => changeObj.name !== data
    );
    updatedChanges.push({ name: data, data: change });
    setPutUser({
      ...putUser,
      changes: updatedChanges,
    });
  }
  setSave(true);
};

export const handleEditCancel = (setEdit, setPutUser, putUser, data, setSave) => {
  setEdit(false);
  setPutUser({
    ...putUser,
    changes: putUser.changes.filter((change) => change.name !== data),
  });
  setSave(false);
};