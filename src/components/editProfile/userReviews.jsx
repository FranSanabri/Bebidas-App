import { useState } from "react";
import { handlerReview } from "./handlersUser";


export const UserReviews = ({usuario}) => {
    const [reviews, setReview] = useState([]);
    const [watchReviews, setWatchReviews] = useState(false);
    return (
        <div>
            {watchReviews ? (
            <div>
              {reviews.length ? (
                reviews.map((review) => {
                  return (
                    <div>
                      <h4>{review.score}</h4>
                      <h4>{review.content}</h4>
                      <h4>{review.products[0].name}</h4>
                    </div>
                  );
                })
              ) : (
                <div>
                  <h4>no has comentado ninguna review</h4>
                </div>
              )}
              <button onClick={() => setWatchReviews(false)}>
                no ver Reviews
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                handlerReview(usuario.id, setReview, setWatchReviews)
              }
            >
              Ver Reviews
            </button>
          )}
        </div>
    )
}