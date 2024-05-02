import React from "react";
import styles from "./AlertModal.module.css"
import Button from "./Button"
import Modal from "./Modal"

const AlertModal = ({
  title,
  message,
  confirmText,
  onConfirm,
  show,
  handleClose,
  handleShow,
  button,
}) => {
  const [showModal, setShowModal] = React.useState(show);

  React.useEffect(() => {
    setShowModal(show);
  }, [show]);

  return (
    <div>
        {button && <Button onClick={handleShow}>{button}</Button>}

        <Modal isOpen={showModal} onClose={handleClose}>
            <div className={styles.alertModal}>
                <h3 className={styles.modalTitle}>{title}</h3>

                <button className={styles.closeBtn} onClick={handleClose}>
                    X
                </button>
                </div>

                <div className={styles.modalBody}>
                    <p>{message}</p>
                </div>

                <div className={styles.modalFooter}>
                    {onConfirm && (
                        <Button onClick={onConfirm}>{confirmText}</Button>
                    )}
                <Button onClick={handleClose}>Cancel</Button>
                </div>
        </Modal>
    </div>
  );
};

export default AlertModal;