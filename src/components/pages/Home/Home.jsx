import React, { useState, useEffect } from 'react';
import NavBar from '../../Navbar/Navbar';
import Carousel from '../../Carousel/Carousel';
import Footer from '../../Footer/Footer';
import Modal from 'react-modal';
import './Home.css';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      width: '300px',
      height: '200px',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
      backgroundColor: '#fff',
    },
  };

  return (
    <div>
      <NavBar setSearchResults={setSearchResults} />
      <Carousel />
      <Footer />
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Success Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="modal-content">Bienvenidos a DrinkUp!</h2>
        <p className="modal-content">Disfruta de este contenido.</p>
        <button className="modal-button" onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default Home;
