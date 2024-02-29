import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';

const MyModal = ({props, show, handleClose, title, message, showButton}) => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    setShowFooter(showButton);
  }, [showButton]);

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} onHide={handleClose}
      className="css-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <h4>{title}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      {showFooter && (
        <Modal.Footer>
          <button className="modal-button" onClick={handleClose}>ตกลง</button>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default MyModal;