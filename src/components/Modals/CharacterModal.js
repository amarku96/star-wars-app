import React from "react";
import "./CharacterModal.css";

const CharacterModal = ({ children, onClose }) => {
  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default CharacterModal;
