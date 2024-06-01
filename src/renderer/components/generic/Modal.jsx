import ReactDOM from 'react-dom';
import { X } from '@phosphor-icons/react';

import '@styles/generic/modal.css';

export const Modal = ({ isOpen, onClose, title, subtitle, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal__overlay" />
      <div className="modal">
        <div className="modal__title">{title}</div>
        <div className="modal__subtitle">{subtitle}</div>
        <div className="modal__close" onClick={onClose}>
          <X className="modal__close-icon" size="20" />
        </div>
        <form className="modal__content">{children}</form>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export const ModalTextInput = ({ title, nameKey, value, onChange, required = false }) => {
  return (
    <div className="modal-input">
      <label className="modal-input__title">
        {title}
        {required && <span className="modal-input__requiredStar">*</span>}
      </label>
      <input
        className="modal-input__input"
        type="text"
        name={nameKey}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export const ModalNumberInput = ({ title, nameKey, value, onChange, required = false }) => {
  return (
    <div className="modal-input">
      <label className="modal-input__title">
        {title}
        {required && <span className="modal-input__requiredStar">*</span>}
      </label>
      <input
        className="modal-input__input"
        type="number"
        min="0"
        name={nameKey}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export const ModalBeside = ({ children }) => {
  return <div className="modal-beside">{children}</div>;
};

export const ModalFooter = ({ left, right }) => {
  return (
    <div className="modal-footer">
      <div className="modal-footer__left">{left}</div>
      <div className="modal-footer__right">{right}</div>
    </div>
  );
};

export const ModalButtonPrimary = ({ text, onClick }) => {
  return (
    <button className="modal-button--primary" onClick={onClick}>
      {text}
    </button>
  );
};

export const ModalButtonSecondary = ({ text, onClick }) => {
  return (
    <button className="modal-button--secondary" onClick={onClick}>
      {text}
    </button>
  );
};