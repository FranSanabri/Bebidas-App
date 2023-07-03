import { useState } from "react";
import { handlerReview } from "./handlersUser";
import './userReviews.css';

export const UserReviews = ({ usuario }) => {
  const [reviews, setReview] = useState([]);
  const [watchReviews, setWatchReviews] = useState(false);

  return (
    <div className="container">
      {watchReviews ? (
        <div>
          {reviews.length ? (
            reviews.map((review, index) => (
              <div className="review-item" key={index}>
                <h4 className="review-score">{review.score}</h4>
                <h4 className="review-content">{review.content}</h4>
                <h4 className="review-product-name">
                  {review.products[0].name}
                </h4>
              </div>
            ))
          ) : (
            <div>
              <h4 className="no-reviews">No has comentado ninguna review</h4>
            </div>
          )}
          <button
            className="button"
            onClick={() => setWatchReviews(false)}
          >
            No ver Reviews
          </button>
        </div>
      ) : (
        <button
          className="button"
          onClick={() => handlerReview(usuario.id, setReview, setWatchReviews)}
        >
          Ver Reviews
        </button>
      )}
    </div>
  );
};
