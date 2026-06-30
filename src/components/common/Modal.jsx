import { X } from "lucide-react";
import { useEffect } from "react";
import Button from "./Button.jsx";

export default function Modal({
  children,
  footer,
  isOpen,
  onClose,
  title,
  variant = "sheet",
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        aria-modal="true"
        className={["modal", variant === "center" ? "modal--center" : ""]
          .filter(Boolean)
          .join(" ")}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header className="modal__header">
          <h2>{title}</h2>
          <Button
            aria-label="Tutup pop-up"
            className="button--icon"
            onClick={onClose}
            variant="ghost"
          >
            <X size={18} />
          </Button>
        </header>
        <div className="modal__body">{children}</div>
        {footer ? <footer className="modal__footer">{footer}</footer> : null}
      </section>
    </div>
  );
}
