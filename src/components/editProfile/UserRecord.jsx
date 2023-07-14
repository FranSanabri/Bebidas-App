import { useState } from "react";
import { handlerRecord } from "./handlersUser";
import "./userRecord.css";
import { Link } from "react-router-dom";
import { ReviewsPage } from "../ReviewsPage/reviews";

export const UserRecord = ({ usuario }) => {
  const [watchRecord, setWatchRecord] = useState(false);
  const [selectedPedidoIndex, setSelectedPedidoIndex] = useState(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  return (
    <div className="user-record-container">
      {watchRecord ? (
        <div>
          {usuario.pedidos.length ? (
            usuario.pedidos.map((pedido, index) => {
              const isPedidoSelected = selectedPedidoIndex === index;
              return (
                <div className="record-item" key={index}>
                  <div>
                    {isPedidoSelected ? (
                      <div style={{ marginTop: "10px" }}>
                        {pedido.productos.map((product, productIndex) => {
                          const isProductSelected = selectedProductIndex === productIndex;
                          return (
                            <div className="record-item" key={productIndex}>
                              <h4 className="record-name">
                                {product.product.name}
                              </h4>
                              <h4 className="record-price">
                                Precio {product.product.price}
                              </h4>
                              <img
                                src={product.product.images[0]}
                                alt=""
                                style={{
                                  maxWidth: "250px",
                                  maxHeight: "200px",
                                  borderRadius: "4px",
                                  marginRight: "1rem",
                                }}
                              />
                              <h4>Cantidad comprada: {product.quantity}</h4>
                              {isProductSelected ? (
                                <div>
                                  <ReviewsPage
                                    id={product.product.id}
                                    email={usuario.email}
                                  />
                                  <button
                                    onClick={() =>
                                      setSelectedProductIndex(null)
                                    }
                                  >
                                    Ocultar Calificacion
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setSelectedProductIndex(productIndex)}
                                >
                                  Calificar
                                </button>
                              )}
                            </div>
                          );
                        })}
                        <h4>Precio total: {pedido.amount / 100}</h4>
                        <button onClick={() => setSelectedPedidoIndex(null)}>
                          Ocultar detalles
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h2>Pedido número {index + 1}</h2>
                        <h4>Precio total: {pedido.amount / 100}</h4>
                        <button onClick={() => setSelectedPedidoIndex(index)}>
                          Ver detalles
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h4 className="no-record">No has comprado ningún producto</h4>
            </div>
          )}
          <button
            className="record-button"
            onClick={() => setWatchRecord(false)}
          >
            No ver Record
          </button>
        </div>
      ) : (
        <button className="record-button" onClick={() => setWatchRecord(true)}>
          Ver Record
        </button>
      )}
    </div>
  );
};