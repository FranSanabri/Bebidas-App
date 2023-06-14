import axios from "axios";

export const handleInputChange = (event, PutProduct, data, setPutProduct, setInputValue) => {
    const change = event.target.value;
    setInputValue(change)
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

export const handlePutProduct = async (PutProduct, create) => {
    try {
      if(create.length){
        await axios.put("https://servidor-vinos.onrender.com/filtros/put", create);
      }
        await axios.put("https://servidor-vinos.onrender.com/product/putProduct", PutProduct);
        alert("Se ha cambiado tu perfil");
        window.location.reload();
      } catch (error) {
        alert("parece que hubo un error")
        console.log("Parece que hubo un error:", error);
      }
}