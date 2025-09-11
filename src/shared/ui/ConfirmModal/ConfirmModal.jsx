import { createPortal } from "react-dom";
import './ConfirmModal.css';

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="overlay confirm-modal__overlay">
      <div className="window confirm-modal__window">
        <h2 className="confirm-modal__title">{title}</h2>
        <p className="confirm-modal__message">{message}</p>
        <div className="confirm-modal__actions">
          <button className="button button--warning" onClick={onConfirm}>
            Yes, I'm sure
          </button>
          <button className="button button--primary" onClick={onCancel}>
            No
          </button>
        </div>     
      </div>
    </div>,
    document.body
  );
}