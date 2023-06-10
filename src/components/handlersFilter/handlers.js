export const handleTipos = (event, bodyFiltros, setBodyFiltros) => {
  setBodyFiltros({
    ...bodyFiltros,
    tipos: event.target.value,
    Variedad: "",
    marca: "",
    envase: "",
  });
};

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

export const orderAll = (event, bodyFiltros, setBodyFiltros) => {
  let name, order, param;
  switch (event.target.value) {
    case "precioAscendente":
      name = "price";
      order = "ASC";
      break;
    case "precioDescendente":
      name = "price";
      order = "DESC";
      break;
    case "alcoholAscendente":
      name = "alcoholContent";
      order = "ASC";
      break;
    case "alcoholDescendente":
      name = "alcoholContent";
      order = "DESC";
      break;
    case "amountAscendente":
      name = "amount";
      order = "ASC";
      break;
    case "amountDescendente":
      name = "amount";
      order = "DESC";
      break;
    case "ventasAscendente":
      name = "sells";
      order = "ASC";
      break;
    case "ventasDescendente":
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
