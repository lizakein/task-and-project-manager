import { createPortal } from "react-dom";
import './ConfirmModal.css';
import { useEffect, useRef } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel}: ConfirmModalProps) {
  if (!isOpen) return null;

  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    confirmButtonRef.current?.focus();
  }, []);

  return createPortal(
    <div className="overlay confirm-modal__overlay">
      <div 
        className="window confirm-modal__window"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        <h2 id="confirm-title" className="confirm-modal__title">
          {title}
        </h2>
        <p id="confirm-message"className="confirm-modal__message">
          {message}
        </p>

        <div className="confirm-modal__actions">
          <button 
            ref={confirmButtonRef}
            type="button" 
            className="button button--warning" 
            onClick={onConfirm}
          >
            Yes, I'm sure
          </button>
          <button type="button" className="button button--primary" onClick={onCancel}>
            No
          </button>
        </div>     
      </div>
    </div>,
    document.body
  );
}