import { memo } from "react";
import Modal from "./Modal";

const ConfirmModal = memo((props) => {
  const {
    title,
    subtitle,
    handleCancel,
    handleClick,
    deleteModal,
    loading,
    isOpen,
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      otherClasses={"bg-white"}
      handleCancel={handleCancel}
    >
      <h5 className="text-[16px] font-bold leading-[16px] text-black">
        {title}
      </h5>
      <p>{subtitle}</p>
      <div className="flex justify-between items-center gap-3">
        <button
          onClick={handleCancel}
          className="bg-formRgba rounded-md text-white min-h-8 px-2 py-1.5 hover:bg-formRgba/80 active:bg-formRgba/100 duration-150 min-w-[110px]"
        >
          Yo'q
        </button>
        <button
          onClick={handleClick}
          className={`${
            deleteModal
              ? "bg-formRed hover:bg-formRed/80 active:bg-formRed/100"
              : "bg-blueTifany hover:bg-blueTifany/80 active:bg-blueTifany/100"
          } duration-150 rounded-md text-white min-h-8 min-w-[110px] px-2 py-1.5`}
        >
          {loading ? (
            <span className="loader"></span>
          ) : (
            <span className="inline-block">Ha</span>
          )}
        </button>
      </div>
    </Modal>
  );
});

ConfirmModal.displayName = "ConfirmModal";

export default ConfirmModal;
