import axios from "axios";
import { useState } from "react";

export const ReviewsPage = ({id, email}) => {
  const [score, setScore] = useState(null);
  const [coment, setComent] = useState(null);

  const handlerSubmit = (event) => {
    if (!coment && !score) {
      event.preventDefault();
      alert("No has completado los campos");
    } else if (!coment.length) {
      event.preventDefault();
      alert("No has completado tu comentario");
    } else if (!score) {
      event.preventDefault();
      alert("No has añadido un numero de estrellas al producto");
    } else {
      const review = {
        userEmail: email,
        productId: id,
        score: score,
        content: coment,
      };
      try {
        axios.post("https://servidor-vinos.onrender.com/reviews/post", review);
        alert("Se a publicado tu review");
      } catch (error) {
        alert("Ha ocurrido un error");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <input
          type="range"
          min={1}
          max={5}
          onChange={(event) => setScore(event.target.value)}
        />
        <span>{score}</span>
        <input
          type="text"
          onChange={(event) => setComent(event.target.value)}
        />
        <button>Subir</button>
      </form>
    </div>
  );
};
