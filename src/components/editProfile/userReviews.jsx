import { useState } from "react";
import "./userReviews.css";

export const UserReviews = ({ usuario }) => {
  const [watchReviews, setWatchReviews] = useState(false);

  return (
    <div className="container">
      {watchReviews ? (
        <div>
          {usuario.reviews.length ? (
            usuario.reviews.map((review, index) => (
              <div
                className="review-item"
                key={index}
                style={{ borderBottom: "1px solid #ccc" }}
              >
                <h4 className="review-product-name">
                  Producto: {review.products[0].name}
                </h4>
                <img
                  src={review.products[0].images[0]}
                  alt=""
                  style={{
                    maxWidth: "250px",
                    maxHeight: "200px",
                    borderRadius: "4px",
                    marginRight: "1rem",
                  }}
                />
                <h4>
                  Calificación:
                  {[...Array(review.score)].map((_, index) => (
                    <span key={index} style={{ color: "gold" }}>
                      &#9733;
                    </span>
                  ))}
                  {[...Array(5 - review.score)].map((_, index) => (
                    <span key={index} style={{ color: "lightgray" }}>
                      &#9734;
                    </span>
                  ))}
                </h4>
                <h4 className="review-content">Comentario: {review.content}</h4>
              </div>
            ))
          ) : (
            <div>
              <h4 className="no-reviews">No has comentado ninguna review</h4>
            </div>
          )}
          <button className="button" onClick={() => setWatchReviews(false)}>
            No ver Reviews
          </button>
        </div>
      ) : (
        <button className="button" onClick={() => setWatchReviews(true)}>
          Ver Reviews
        </button>
      )}
    </div>
  );
};
