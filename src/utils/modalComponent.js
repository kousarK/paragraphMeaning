import React from "react";
import Modal from "react-modal";

export default function ModalComponent({
  ismodalOpen = false,
  closeFunc = () =>{},
  modalContent,
}) {
  return (
    <Modal
      isOpen={ismodalOpen}
      contentLabel="Example Modal"
      style={customStyles}
      ariaHideApp={false}
    >
      <div style={customStyles.closeButton} onClick={closeFunc}>
        X
      </div>
      {modalContent}
    </Modal>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FDFDFD",
  },
  closeButton: {
    cursor: "pointer",
    textAlign: "end",
    padding: 10,
  },
};
