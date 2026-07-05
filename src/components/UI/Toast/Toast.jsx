import { useState, useEffect } from 'react';
import './Toast.css';

export function Toast({
  message = '',
  duration = 5000,
  position = 'bottom-center',
  type = 'info',
  isVisible = false,
  onClose = () => {},
}) {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);

    if (isVisible) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!show) return null;

  return (
    <div
      id="toast"
      className={`toast toast-${type} toast-${position}`}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
}

export default Toast;
