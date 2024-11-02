const ModalOverlay = ({ isOpen, otherClasses, ...props }) => {
  if (!isOpen) return null;

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className={`fixed inset-0 z-[100]  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ${otherClasses}`}
      {...props}
    ></div>
  );
};

export default ModalOverlay;
