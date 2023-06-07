import React, { useEffect, useState } from 'react';
import './Carousel.css';

function Carousel() {
  const images = [
    "https://i.ibb.co/chMH2kQ/1.png",
    "https://i.ibb.co/QJg2TdJ/2.png",
    "https://i.ibb.co/SDkWbrC/3.png",
  ];
  const [img, setImg] = useState(0);

  function next() {
    if (img < images.length - 1) setImg(img + 1);
    else setImg(0);
  }

  function back() {
    if (img > 0) setImg(img - 1);
    else setImg(images.length - 1);
  }

  useEffect(() => {
    const time = setTimeout(next, 6000);
    return () => clearTimeout(time);
  }, [img]);

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <img
          key={img}
          src={images[img]}
          className="carousel-image"
        />

        <a
          className="carousel-prev"
          onClick={back}
        >
          &#10094;
        </a>
        <a
          className="carousel-next"
          onClick={next}
        >
          &#10095;
        </a>
        <div className="carousel-indicators">
          {images.length ? (
            images.map((e, k) => (
              <span
                key={k + 1}
                className={`carousel-indicator ${
                  img !== k ? 'carousel-inactive-indicator' : 'carousel-active-indicator'
                }`}
                onClick={() => setImg(k)}
              ></span>
            ))
          ) : (
            <p>Image not found</p>
          )}
        </div>
      </div>
      <div className="carousel-slider">
      </div>
      <div className="slider">
        <h2 className="text-slider">Nuestras mejores ofertas, al mejor precio!</h2>
        <div className="slide-track">
          <div className="slide">
            <img src="https://i.ibb.co/2SypNwY/1.png" alt="" className="w-full" />
          </div>
          <div className="slide">
            <img src="https://i.ibb.co/VmMZ00f/2.png" alt="" className="w-full" />
          </div>
          <div className="slide">
            <img src="https://i.ibb.co/HX9K9q9/3.png" alt="" className="w-full" />
          </div>
          <div className="slide">
            <img src="https://i.ibb.co/gRKnhFf/1.png" alt="" className="w-full" />
          </div>
          <div className="slide">
            <img src="https://i.ibb.co/4McB6rG/2.png" alt="" className="w-full" />
          </div>
          <div className="slide">
            <img src="https://i.ibb.co/Sw2k6CY/3.png" alt="" className="w-full" />
          </div>
          <div className="slide">
            <img src="https://i.ibb.co/2SypNwY/1.png" alt="" className="w-full" />
          </div>
          <div className="slide">
            <img src="https://i.ibb.co/VmMZ00f/2.png" alt="" className="w-full" />
          </div>
          <div className="slide">
            <img src="https://i.ibb.co/HX9K9q9/3.png" alt="" className="w-full" />
          </div>
          <div className="slide">
            <img src="https://i.ibb.co/gRKnhFf/1.png" alt="" className="w-full" />
          </div>
          <div className="slide">
            <img src="https://i.ibb.co/4McB6rG/2.png" alt="" className="w-full" />
          </div>
          <div className="slide">
            <img src="hhttps://i.ibb.co/Sw2k6CY/3.png" alt="" className="w-full" />
          </div>
          <div className="slide">
            <img src="https://i.ibb.co/QJg2TdJ/2.png" alt="" className="w-full" />
          </div>
          <div className="slide">
            <img src="https://i.ibb.co/SDkWbrC/3.png" alt="" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;