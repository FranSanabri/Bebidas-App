export const handleMarca = (event, bodyFiltros, setBodyFiltros) => {
  setBodyFiltros({ ...bodyFiltros, marca: event.target.value });
};

export const handleSabor = (event, bodyFiltros, setBodyFiltros) => {
  setBodyFiltros({ ...bodyFiltros, Variedad: event.target.value });
};

export const handleContenedor = (event, bodyFiltros, setBodyFiltros) => {
  setBodyFiltros({ ...bodyFiltros, envase: event.target.value });
};

export const handleCask = (event, bodyFiltros, setBodyFiltros) => {
  setBodyFiltros({ ...bodyFiltros, cask: event.target.value });
};

export const handleContenido = (event, bodyFiltros, setBodyFiltros) => {
  let desde, hasta;
  switch (parseInt(event.target.value)) {
    case 400:
      desde = 0;
      hasta = 400;
      break;
    case 500:
      desde = 401;
      hasta = 500;
      break;
    case 700:
      desde = 501;
      hasta = 700;
      break;
    case 1000:
      desde = 701;
      hasta = 1000;
      break;
    default:
      desde = 0;
      hasta = 0;
      break;
  }
  setBodyFiltros({
    ...bodyFiltros,
    contenido: { ...bodyFiltros.contenido, desde: desde, hasta: hasta },
  });
};

export const handleporcentaje = (event, bodyFiltros, setBodyFiltros) => {
  let desde, hasta;
  switch (parseInt(event.target.value)) {
    case 5:
      desde = 5;
      hasta = 10;
      break;
    case 10:
      desde = 10;
      hasta = 25;
      break;
    case 25:
      desde = 25;
      hasta = 35;
      break;
    default:
      desde = 0;
      hasta = 0;
      break;
  }
  setBodyFiltros({
    ...bodyFiltros,
    porcentajeDesc: {
      ...bodyFiltros.porcentajeDesc,
      desde: desde,
      hasta: hasta,
    },
  });
};

export const handleOferta = (event, bodyFiltros, setBodyFiltros) => {
  setBodyFiltros({ ...bodyFiltros, ofertas: event.target.value });
};

export const orderSells = (event, bodyFiltros, setBodyFiltros) => {
  let name, order;
  switch (event.target.value) {
    case "ascendente":
      name = "sells";
      order = "ASC";
      break;
    case "Descendente":
      name = "sells";
      order = "DESC";
      break;
    default:
      name = "";
      order = "";
      break;
  }
  setBodyFiltros({
    ...bodyFiltros,
    ordenarmiento: { ...bodyFiltros.ordenarmiento, name: name, order: order },
  });
};
export const orderprice = (event, bodyFiltros, setBodyFiltros) => {
  let name, order;
  switch (event.target.value) {
    case "ascendente":
      name = "price";
      order = "ASC";
      break;
    case "Descendente":
      name = "price";
      order = "DESC";
      break;
    default:
      name = "";
      order = "";
      break;
  }
  setBodyFiltros({
    ...bodyFiltros,
    ordenarmiento: { ...bodyFiltros.ordenarmiento, name: name, order: order },
  });
};
export const orderAlcoholContent = (event, bodyFiltros, setBodyFiltros) => {
  let name, order;
  switch (event.target.value) {
    case "ascendente":
      name = "alcoholContent";
      order = "ASC";
      break;
    case "Descendente":
      name = "alcoholContent";
      order = "DESC";
      break;
    default:
      name = "";
      order = "";
      break;
  }
  setBodyFiltros({
    ...bodyFiltros,
    ordenarmiento: { ...bodyFiltros.ordenarmiento, name: name, order: order },
  });
};
export const orderAmount = (event, bodyFiltros, setBodyFiltros) => {
  let name, order;
  switch (event.target.value) {
    case "ascendente":
      name = "amount";
      order = "ASC";
      break;
    case "Descendente":
      name = "amount";
      order = "DESC";
      break;
    default:
      name = "";
      order = "";
      break;
  }
  setBodyFiltros({
    ...bodyFiltros,
    ordenarmiento: { ...bodyFiltros.ordenarmiento, name: name, order: order },
  });
};
