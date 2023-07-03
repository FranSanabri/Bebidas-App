import { useState } from "react";
import { handlerRecord } from "./handlersUser";
import './userRecord.css';

export const UserRecord = ({ usuario }) => {
  const [record, setRecord] = useState([]);
  const [watchRecord, setWatchRecord] = useState(false);

  return (
    <div className="user-record-container">
      {watchRecord ? (
        <div>
          {record.length ? (
            record.map((product, index) => (
              <div className="record-item" key={index}>
                <h4 className="record-name">{product.name}</h4>
                <h4 className="record-price">{product.price}</h4>
              </div>
            ))
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
        <button
          className="record-button"
          onClick={() => handlerRecord(usuario.record, setRecord, setWatchRecord)}
        >
          Ver Record
        </button>
      )}
    </div>
  );
};
