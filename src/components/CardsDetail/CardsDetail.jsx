import styles from "./detail.module.css";
import ImageDetail from "@/app/components/ImageDetail/img";
import Paypal from './paypal'

const fetchProducts = (id) => {
  return fetch(`http://localhost:3001/product/${id}`, {
    next: {
      revalidate: 120,
    },
  }).then((res) => res.json());
};

export default async function Detail({ params }) {
  const { id } = params;
  const products = await fetchProducts(id);
const product={
  name: products.name,
  price: products.price,
  description: products.description
}
  return (
    <div className={styles.contains}>
      <div className={styles.containproduct}>
        <div>
          {products.images.length ? (
            <div>
              <ImageDetail imagen={products.images} />
            </div>
          ) : null}
        </div>
        <div className={styles.containInfo}>
          <div className={styles.info}>
            <h1>{products.name}</h1>
            <h3>Reviews: {products.averageScore}</h3>
            <h3>Volumen de la unidad: {products.amount}</h3>
            <h2>precio: ${products.price}</h2>
            {products.percentageDiscount ? (
              <h3>Porcentaje de descuento: {products.percentageDiscount}%</h3>
            ) : null}
            <h3>Marca: {products.brandName}</h3>
            <h3>Stock: {products.stock}</h3>
            <h3>Ventas: {products.sell}</h3>
            {products.yearPacking ? (
              <h3>Año de empacado: {products.yearPacking}</h3>
            ) : null}
            <Paypal product={product}/>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h1>Descripcion:</h1>
          <h3>{products.description}</h3>
        </div>
        {products.review.length ? (
          <h3>Comentarios: {products.products.review}</h3>
        ) : null}
      </div>
    </div>
  );
}
