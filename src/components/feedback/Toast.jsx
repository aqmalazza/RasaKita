import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const TOAST_TRANSITION_MS = 180;

export default function Toast({
  duration = 1800,
  isOpen,
  message,
  onClose,
  title,
  variant = "success",
}) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [contentSnapshot, setContentSnapshot] = useState({
    message,
    title,
    variant,
  });
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setContentSnapshot({ message, title, variant });
    }
  }, [isOpen, message, title, variant]);

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
    }, TOAST_TRANSITION_MS);

    return () => {
      window.clearTimeout(exitTimer);
    };
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const dismissTimer = window.setTimeout(() => {
      onCloseRef.current?.();
    }, duration);

    return () => {
      window.clearTimeout(dismissTimer);
    };
  }, [duration, isOpen, message, title]);

  if (!shouldRender || typeof document === "undefined") {
    return null;
  }

  const displayedContent = isOpen
    ? { message, title, variant }
    : contentSnapshot;

  return createPortal(
    <div className="toast-viewport" aria-atomic="true" aria-live="polite">
      <div
        className={[
          "toast",
          `toast--${displayedContent.variant}`,
          isVisible ? "toast--open" : "",
        ]
          .filter(Boolean)
        .join(" ")}
        role="status"
      >
        <strong>{displayedContent.title}</strong>
        {displayedContent.message ? (
          <span>{displayedContent.message}</span>
        ) : null}
      </div>
    </div>,
    document.body
  );
}
