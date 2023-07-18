import { useEffect, useState } from "react";
import "./Create.css";
import { NavLink } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import axios from "axios";

const Create = ({ usuarios }) => {
  // const user = {email:"juan@gmail.com"};
  // const user = {email:"finalproyecto06@gmail.com"};
  // const user = {};
  const [usuario, setUsuario] = useState(usuarios ? usuarios : null);
  const [form, setForm] = useState({ images: [] });
  const [marcas, setMarcas] = useState(null);
  const [sabor, setSabor] = useState(null);
  const [contenedor, setContenedor] = useState(null);
  const [img, setImg] = useState(null);
  const handleChange = (e) => {
    let value = e.target.value;
    if (
      value === "price" ||
      value === "amount" ||
      value === "stock" ||
      value === "percentageDiscount"
    ) {
      value = parseInt(value);
    }
    if (value === "true") {
      value = true;
    }
    if (value === "false") {
      value = false;
    }
    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const submitForm = async () => {
    if (img) {
      const imageUrl = await handlerImg(img);
      form.images.push(imageUrl);

      try {
        await axios.post(
          "https://servidor-vinos.onrender.com/product/postProduct",
          form
        );
        alert("Se ha creado el producto");
        window.location.reload();
      } catch (error) {
        alert("Parece que hubo un error");
        console.log("Parece que hubo un error:", error);
      }
    }
  };

  const handlerImg = async () => {
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

  useEffect(() => {
    if (usuarios) {
      setUsuario(usuarios);
    }
  }, [usuarios]);

  useEffect(() => {
    if (form?.type) {
      axios
        .get(
          `https://servidor-vinos.onrender.com/filtros?name=marca${form.type}`
        )
        .then(({ data }) => setMarcas(data));
    }
  }, [form?.type]);
  useEffect(() => {
    if (form?.type) {
      axios
        .get(
          `https://servidor-vinos.onrender.com/filtros?name=sabor${form?.type}`
        )
        .then(({ data }) => setSabor(data));
    }
  }, [form?.type]);
  useEffect(() => {
    axios
      .get(`https://servidor-vinos.onrender.com/filtros?name=contenedor`)
      .then(({ data }) => setContenedor(data));
  }, []);



  return (
    <div>
      {usuario && usuario.admin ? (
        <>
          <div className="form">
            <input onChange={handleChange} name="name" placeholder="Nombre" />
            <select name="type" value={form?.type} onChange={handleChange}>
              <option value="">Ninguna</option>
              <option value="Wine">Vinos</option>
              <option value="Beer">Cervezas</option>
              <option value="Tequila">Tequilas</option>
              <option value="Liqueur">Licores</option>
              <option value="Drinks">Bebidas</option>
            </select>
            {sabor?.data ? (
              <select
                name="Variety"
                value={form?.Variety}
                onChange={handleChange}
                placeholder="Sabor"
              >
                <option value="">Ninguna</option>
                {sabor.data.map((sab) => {
                  return <option value={sab}>{sab}</option>;
                })}
              </select>
            ) : null}
            {marcas?.data ? (
              <select
                name="brand"
                value={form?.brand}
                onChange={handleChange}
                placeholder="Marca"
              >
                <option value="">Ninguna</option>
                {marcas.data.map((brand) => {
                  return <option value={brand}>{brand}</option>;
                })}
              </select>
            ) : null}
            <div className="label">
              <input
                type="number"
                onChange={handleChange}
                name="amount"
                placeholder="Cantidad"
              />
              <label htmlFor="amount">ML</label>
            </div>
            <input
              type="number"
              onChange={handleChange}
              name="price"
              placeholder="Precio"
            />
            <input
              type="number"
              onChange={handleChange}
              name="stock"
              placeholder="Stock"
            />
            <select
              name="ableDiscount"
              value={form?.ableDiscount}
              onChange={handleChange}
            >
              <option value={false}>Sin descuento</option>
              <option value={true}>Con descuento</option>
            </select>
            <input
              type="number"
              onChange={handleChange}
              name="percentageDiscount"
              placeholder="Porcentaje descuento"
            />
            {contenedor?.data ? (
              <select
                name="container"
                value={form?.container}
                onChange={handleChange}
                placeholder="contenedor"
              >
                <option value="">Ninguna</option>
                {contenedor.data.map((cont) => {
                  return <option value={cont}>{cont}</option>;
                })}
              </select>
            ) : null}
            <select
              name="availability"
              value={form?.availability}
              onChange={handleChange}
            >
              <option value={false}>No disponible</option>
              <option value={true}>Disponible</option>
            </select>
            <input
              type="text"
              onChange={handleChange}
              name="description"
              placeholder="Descripcion"
            />
            <input
              name="image"
              type="file"
              onChange={(event) => {
                setImg(event.target.files[0]);
              }}
              placeholder="I"
              required
            />
            <button onClick={submitForm}>Crear Producto</button>
          </div>
          <NavLink to="/dashboard" className="dashboard-button">
            <FiHome className="dashboard-icon" />
            Volver al dashboard
          </NavLink>
        </>
      ) : (
        <h1>401</h1>
      )}
    </div>
  );
};

export default Create;
