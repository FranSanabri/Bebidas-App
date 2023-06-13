import axios from "axios";

export const hadlerUser = (putUser) => {
  axios
    .put("https://servidor-vinos.onrender.com/users/put", putUser)
    .then(() => alert("se a cambiado tu perfil, recarga para verlo"))
    .catch((error) => console.log("parece que hubo un error:", error));
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
    if(ids){
     for (const id of ids) {
    await axios(`https://servidor-vinos.onrender.com/product/${id}`)
        .then(({ data }) => {
          if (data.name) {
            productos.push(data);
          }
        })
        .catch((error) => console.log("parece que hubo un error:", error));
    }}
    console.log(productos);
    setRecord(productos);

};
