import { useState } from 'react';

const Toolbar = () => {
  const [activeFilter, setActiveFilter] = useState('');

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    // Aquí puedes realizar acciones adicionales al seleccionar un filtro,
    // como llamar a una función para aplicar el filtro a los productos.
  };

  return (
    <div className="toolbar">
      <button
        className={`toolbar-button ${activeFilter === 'vinos' ? 'active' : ''}`}
        onClick={() => handleFilterClick('vinos')}
      >
        VINOS
      </button>
      <button
        className={`toolbar-button ${activeFilter === 'licores' ? 'active' : ''}`}
        onClick={() => handleFilterClick('licores')}
      >
        LICORES
      </button>
      <button
        className={`toolbar-button ${activeFilter === 'tequilas' ? 'active' : ''}`}
        onClick={() => handleFilterClick('tequilas')}
      >
        TEQUILAS
      </button>
      <button
        className={`toolbar-button ${activeFilter === 'cervezas' ? 'active' : ''}`}
        onClick={() => handleFilterClick('cervezas')}
      >
        CERVEZAS
      </button>
      <button
        className={`toolbar-button ${activeFilter === 'coctelerias' ? 'active' : ''}`}
        onClick={() => handleFilterClick('coctelerias')}
      >
        COCTELERIAS
      </button>
      <button
        className={`toolbar-button ${activeFilter === 'bebidas' ? 'active' : ''}`}
        onClick={() => handleFilterClick('bebidas')}
      >
        BEBIDAS
      </button>
      <button
        className={`toolbar-button ${activeFilter === 'alimentos' ? 'active' : ''}`}
        onClick={() => handleFilterClick('alimentos')}
      >
        ALIMENTOS
      </button>
    </div>
  );
};

export default Toolbar;