import React, { useState } from "react";
import Home from "./pages/Home";
import Output from "./pages/Output";
import { Routes, Route } from 'react-router-dom';
import MyModal from "./components/Modal";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [showButton, setShowButton] = useState(false)

  const handleShowModal = (title, message, showButton) => {
    setModalTitle(title);
    setModalMessage(message);
    setShowButton(showButton);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setModalMessage('');
    setShowModal(false);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home Modal={handleShowModal}/>} />
        <Route path="/output_page" element={<Output Modal={handleShowModal}/>} />
      </Routes>
      <MyModal show={showModal} 
               handleClose={handleCloseModal} 
               title={modalTitle}
               message={modalMessage}
               showButton={showButton}/>
    </div>
  );
};

export default App;
