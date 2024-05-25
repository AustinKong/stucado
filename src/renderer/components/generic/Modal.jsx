import ReactDOM from 'react-dom';

import '@styles/generic/modal.css';

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal__overlay" />
      <div className="modal">
        <button className="modal__close" onClick={onClose}>
          {/* TODO: Replace with SVG */}
          Close
        </button>
        <div className="modal__content">{children}</div>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default Modal;
