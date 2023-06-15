import axios from "axios";
import { useState } from "react";

export const EditProductImg = ({ product, setImg, img }) => {
  const [edit, setEdit] = useState(false);
  const [newImg, setNewImg] = useState([]);

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    const update = img.concat(file);
    const newImgUpdate = newImg.concat(file.name);
    setImg(update);
    setNewImg(newImgUpdate);
  };

  const handlecancel = () => {
    setEdit(true);
    setImg([]);
    setNewImg([]);
  };

  const handleDelete = async (image) => {
    const images = product.images.filter((img) => img !== image);
    const deleteImg = {
      productId: product.id,
      changes: [{ name: "images", data: images }],
    };
    try {
      const response = await axios.put(
        "https://servidor-vinos.onrender.com/product/putProduct",
        deleteImg
      );
      if (response) {
        window.location.reload();
      }
      console.log("borrado");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Images</h1>
      {product.images.length && !edit ? (
        <div>
          {product.images.map((image, index) => {
            return (
              <div key={index}>
                <img src={image} alt="" />
                <button onClick={() => handleDelete(image)}>X</button>
              </div>
            );
          })}
          <button onClick={handlecancel}>Cambiar Images</button>
        </div>
      ) : (
        <div>
          {!edit ? (
            <div>
              <h4>No has completado este campo</h4>
            </div>
          ) : (
            <div>
              <button onClick={() => setEdit(false)}>No cambiar Images</button>
            </div>
          )}
          <input name="image" type="file" onChange={handleAddImage} />
          <div>
            <p>Imagenes a agregar</p>
            {newImg.map((name) => {
              return (
                <label key={name} htmlFor="">
                  {name}
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
