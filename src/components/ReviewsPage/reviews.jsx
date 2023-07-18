import axios from "axios";
import { useState } from "react";

export const ReviewsPage = ({ id, email }) => {
  const [score, setScore] = useState(1);
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
        <div style={{ display: "flex" }}>
          <input
            type="range"
            min={1}
            max={5}
            value={score}
            onChange={(event) => setScore(event.target.value)}
            style={{
              width: "90%",
              height: "20px",
              backgroundColor: "#e0e0e0",
              borderRadius: "10px",
            }}
          />
          <h3 style={{ marginLeft: "7px" }}>{score}</h3>
        </div>
        <input
          type="text"
          onChange={(event) => setComent(event.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button style={{ marginBottom: "10px" }}>Subir</button>
      </form>
    </div>
  );
};
