import { useState } from "react";
import Modal from "./Modal";

const ModalUsecase = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="modal-usecase">
      <h1 className="title">React Custom Modal Example</h1>
      <button
        className="open-modal-btn"
        onClick={() => setModalOpen(true)}
      >
        Open Modal
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="modal-title">Hello from the Modal!</h2>
        <p className="modal-text">
          This modal uses <strong>React Portals</strong> and is accessible.
        </p>
        <button
          className="confirm-btn"
          onClick={() => setModalOpen(false)}
        >
          Close
        </button>
      </Modal>
    </div>
  )
}

export default ModalUsecase