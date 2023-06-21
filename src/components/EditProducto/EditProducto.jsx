import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditarProducto.css';

function ProductoEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://servidor-vinos.onrender.com/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        setErrorMessage('Error al obtener los datos del producto.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (property, value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [property]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://servidor-vinos.onrender.com/product/putProduct/${id}`,
        product
      );
      setSuccessMessage(response.data);
      navigate(`/editar/${id}`); // Redirigir al route de /editar/:id
    } catch (error) {
      setErrorMessage('Error al actualizar los datos del producto.');
    }
  };

  if (!product) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="product-edit-container">
      <h2>Editar Producto</h2>
      {/* Mostrar etiquetas y campos de entrada */}
      <div className="input-container">
        <label>Name</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Price</label>
        <input
          type="number"
          value={product.price}
          onChange={(e) => handleInputChange('price', Number(e.target.value))}
        />
      </div>
      <div className="input-container">
        <label>Amount</label>
        <input
          type="number"
          value={product.amount}
          onChange={(e) => handleInputChange('amount', Number(e.target.value))}
        />
      </div>
      <div className="input-container">
        <label>Container</label>
        <input
          type="text"
          value={product.container}
          onChange={(e) => handleInputChange('container', e.target.value)}
        />
      </div>

      {/* Mostrar mensaje de éxito o error */}
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}

      {/* Botón para actualizar el producto */}
      <button className="update-button" onClick={handleUpdate}>Actualizar Producto</button>
    </div>
  );
}

export default ProductoEditar;
