import React from "react";
import styles from "./DeleteConfirmModal.module.css"
import Button from "./Button"
import Modal from "./Modal"

const DeleteConfirmModal = ({
  show,
  handleClose,
  handleDelete,
  commentId,
}) => {
  const [showModal, setShowModal] = React.useState(show);

  React.useEffect(() => {
    setShowModal(show);
  }, [show]);

  const handleConfirm = () => {
    handleDelete(commentId);
    handleClose();
  };

  return (
    <Modal isOpen={showModal} onClose={handleClose}>
      <div className={styles.alertModal}>
        <h3 className={styles.modalTitle}>Delete Comment</h3>
        <button className={styles.closeBtn} onClick={handleClose}>
          X
        </button>
      </div>

      <div className={styles.modalBody}>
        <p>Are you sure you want to delete this comment?</p>
      </div>

      <div className={styles.modalFooter}>
        <Button onClick={handleConfirm}>Delete</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;