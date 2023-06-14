import axios from "axios";

export const handleInputChange = (
  event,
  PutProduct,
  data,
  setPutProduct,
  setInputValue
) => {
  const change = event.target.value;
  setInputValue(change);
  if (change === "") {
    const updatedChanges = PutProduct.changes.filter(
      (changeObj) => changeObj.name !== data
    );
    setPutProduct({
      ...PutProduct,
      changes: updatedChanges,
    });
  } else {
    const updatedChanges = PutProduct.changes.filter(
      (changeObj) => changeObj.name !== data
    );
    updatedChanges.push({ name: data, data: change });
    setPutProduct({
      ...PutProduct,
      changes: updatedChanges,
    });
  }
};

export const handlePutProduct = async (PutProduct, create, img, product) => {
  if (img) {
    const imageUrl = await uploadImage(img);
    const allImg = product.images.concat(imageUrl);
    PutProduct.changes.push({
      name: "images",
      data: allImg,
    });
  }
  try {
    if (create.length) {
      await axios.put(
        "https://servidor-vinos.onrender.com/filtros/put",
        create
      );
    }
    await axios.put(
      "https://servidor-vinos.onrender.com/product/putProduct",
      PutProduct
    );
    alert("Se ha cambiado tu Producto");
    window.location.reload();
  } catch (error) {
    alert("parece que hubo un error");
    console.log("Parece que hubo un error:", error);
  }
};

export const uploadImage = async (img) => {
  try {
    const images = [];
    for (const image of img) {
      const imageFormData = new FormData();
      imageFormData.append("image", image);
      const { data } = await axios.post(
        "https://api.imgbb.com/1/upload?key=171a59fb0c1e2f1606024563e5f358d8",
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      images.push(data.data.url);
    }

    return images;
  } catch (error) {
    console.log("Parece que hubo un error:", error);
    return null;
  }
};
