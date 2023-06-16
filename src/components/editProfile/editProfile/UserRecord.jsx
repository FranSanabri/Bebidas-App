import { useState } from "react";
import { handlerRecord } from "./handlersUser";



export const UserRecord = ({usuario}) => {
    const [record, setRecord] = useState([]);
    const [watchRecord, setWatchRecord] = useState(false);
    return(
        <div>
            {watchRecord ? (
            <div>
              {record.length ? (
                record.map((product) => {
                  return (
                    <div>
                      <h4>{product.name}</h4>
                      <h4>{product.price}</h4>
                    </div>
                  );
                })
              ) : (
                <div>
                  <h4>no has comprado ningun producto</h4>
                </div>
              )}
              <button onClick={() => setWatchRecord(false)}>
                no ver Record
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                handlerRecord(usuario.record, setRecord, setWatchRecord)
              }
            >
              Ver record
            </button>
          )}
        </div>
    )
}