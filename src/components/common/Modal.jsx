import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button.jsx";

const MODAL_TRANSITION_MS = 180;

export default function Modal({
  children,
  footer,
  isOpen,
  onExited,
  onClose,
  title,
  variant = "sheet",
}) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [contentSnapshot, setContentSnapshot] = useState({
    children,
    footer,
    title,
  });
  const onCloseRef = useRef(onClose);
  const onExitedRef = useRef(onExited);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    onExitedRef.current = onExited;
  }, [onExited]);

  useEffect(() => {
    if (isOpen) {
      setContentSnapshot({ children, footer, title });
    }
  }, [children, footer, isOpen, title]);

  useEffect(() => {
    let animationFrame;
    let exitTimer;

    if (isOpen) {
      setShouldRender(true);
      animationFrame = window.requestAnimationFrame(() => setIsVisible(true));

      return () => {
        window.cancelAnimationFrame(animationFrame);
      };
    }

    if (!shouldRender) {
      return undefined;
    }

    setIsVisible(false);
    exitTimer = window.setTimeout(() => {
      setShouldRender(false);
      onExitedRef.current?.();
    }, MODAL_TRANSITION_MS);

    return () => {
      window.clearTimeout(exitTimer);
    };
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (!shouldRender) {
      return undefined;
    }

    const scrollY = window.scrollY;
    const previousBodyStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseRef.current?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyStyle.overflow;
      document.body.style.position = previousBodyStyle.position;
      document.body.style.top = previousBodyStyle.top;
      document.body.style.width = previousBodyStyle.width;
      window.scrollTo(0, scrollY);
    };
  }, [shouldRender]);

  if (!shouldRender || typeof document === "undefined") {
    return null;
  }

  const displayedContent = isOpen
    ? { children, footer, title }
    : contentSnapshot;

  return createPortal(
    <div
      className={[
        "modal-backdrop",
        isVisible ? "modal-backdrop--open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="presentation"
      onMouseDown={() => onCloseRef.current?.()}
    >
      <section
        aria-modal="true"
        className={[
          "modal",
          variant === "center" ? "modal--center" : "",
          isVisible ? "modal--open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header className="modal__header">
          <h2>{displayedContent.title}</h2>
          <Button
            aria-label="Tutup pop-up"
            className="button--icon"
            onClick={() => onCloseRef.current?.()}
            variant="ghost"
          >
            <X size={18} />
          </Button>
        </header>
        <div className="modal__body">{displayedContent.children}</div>
        {displayedContent.footer ? (
          <footer className="modal__footer">{displayedContent.footer}</footer>
        ) : null}
      </section>
    </div>,
    document.body
  );
}
