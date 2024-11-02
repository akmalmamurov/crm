import { useEffect, useState } from "react";
import Portal from "../portal/Portal";
import ModalOverlay from "./ModalOverlay";

const Modal = ({ children, isOpen, otherClasses, handleCancel }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      const timer = setTimeout(() => setIsVisible(false), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <Portal>
      <ModalOverlay
        isOpen={isOpen}
        otherClasses={"bg-black/80"}
        onClick={handleCancel}
      />
      <div
        data-state={isOpen ? "open" : "closed"}
        className={`fixed left-[50%] top-[50%] z-[100] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg ${otherClasses}`}
      >
        {children}
      </div>
    </Portal>
  );
};

export default Modal;
