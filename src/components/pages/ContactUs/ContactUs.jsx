import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import NavBar from '../../Navbar/Navbar';
import './ContactUs.css';
import Modal from 'react-modal';

 const ContactUs = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

  const sendEmail = (event) => {
    event.preventDefault();

    emailjs.sendForm('service_cz8zerh','template_0el3e9p',event.target,'myXHIgdyVK0L0BUIi')
    .then((response) => {
        console.log(response);
        setModalIsOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Recargar la página después de 3 segundos (ajusta el tiempo según tus necesidades)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <NavBar />
      <div className='contact-form'>
        <h1 className='form-title'>Contactanos!!!!!!!!!</h1>
        <form className='form-mail' onSubmit={sendEmail}>
          <div className='form-group'>
            <label htmlFor='user_name'>Nombre</label>
            <input type="text" id='user_name' name='user_name' className='form-input' />
          </div>

          <div className='form-group'>
            <label htmlFor='user_email'>Email</label>
            <input type="email" id='user_email' name='user_email' className='form-input' />
          </div>

          <div className='form-group'>
            <label htmlFor='user_message'>Mensaje</label>
            <textarea id='user_message' name="user_message" className='form-textarea' rows="5"></textarea>
          </div>

          <button type='submit' className='form-button'>Enviar</button>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Success Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <p>Email sent successfully!</p>
          <button className="modal-button" onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  )
}

export default ContactUs;
