import 'Styles/generics/modal.css'
import ReactDOM from 'react-dom';

const Modal: React.FC<{ isOpen: boolean, children: React.ReactNode, onClose: () => void }> = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <>
      <div className='modal__overlay' />
      <div className='modal'>
        <button className='modal__close' onClick={onClose}>
          Close
        </button>
        <div className='modal__content'>
          {children}
        </div>
      </div>
    </>,
    document.getElementById('portal')!
  );
}

export default Modal