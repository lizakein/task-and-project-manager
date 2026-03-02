import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { Button } from "@ui/index";
import "./ConfirmModal.css";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
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
        <p id="confirm-message" className="confirm-modal__message">
          {message}
        </p>

        <div className="confirm-modal__actions">
          <Button ref={confirmButtonRef} variant="warning" onClick={onConfirm}>
            Yes, I&apos;m sure
          </Button>
          <Button variant="primary" onClick={onCancel}>
            No
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
