import { useCallback, useState } from "react";

export const useModal = () => {
  const [isOpen, setIsopen] = useState(false);
  const open = useCallback(() => setIsopen(true), []);
  const close = useCallback(() => setIsopen(false), []);
  const toggle = useCallback(() => setIsopen((prev) => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
