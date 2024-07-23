import ReactDOM from 'react-dom';
import { Warning, WarningDiamond } from '@phosphor-icons/react';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import styles from './styles.module.css';

// Basic modal with clicking outside to cancel
export const Modal = ({ onClose, size = 'small', children }) => {
  const modalRef = useRef();
  const colorTheme = useSelector((state) => state.settings.colorTheme);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={styles.blanket} data-testid="blanket" />
      <div
        className={styles.modal}
        ref={modalRef}
        style={{ width: size === 'small' ? '30vw' : size === 'medium' ? '40vw' : '50vw' }}
        data-testid="modal"
        data-colortheme={colorTheme}
      >
        {children}
      </div>
    </>,
    document.getElementById('portal')
  );
};

// Empty container for modal header, should include modal title
export const ModalHeader = ({ children }) => {
  return <div className={styles.modalHeader}>{children}</div>;
};

// Empty container for modal body
export const ModalBody = ({ children }) => {
  return <div className={styles.modalBody}>{children}</div>;
};

// Empty container for modal footer, should include modal buttons
export const ModalFooter = ({ children }) => {
  return <div className={styles.modalFooter}>{children}</div>;
};

// Appearance can be 'warn', 'danger' or nothing
export const ModalTitle = ({ appearance, children }) => {
  return (
    <h2 className={styles.modalTitle}>
      {appearance === 'warn' && (
        <Warning size="28" weight="fill" color="var(--text-warning)" className={styles.modalTitle__icon} />
      )}
      {appearance === 'danger' && (
        <WarningDiamond size="28" weight="fill" color="var(--text-danger)" className={styles.modalTitle__icon} />
      )}
      {children}
    </h2>
  );
};

export const ModalSubtitle = ({ children }) => {
  return <p className={styles.modalSubtitle}>{children}</p>;
};

export default Modal;
