import useCurrentColor from "@/hooks/useCurrentColor";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const MoreModal = ({ moreBtnData, setIsMoreModal, isMoreModal }) => {
  const modalRef = useRef(null);
  const currentColor = useCurrentColor();
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsMoreModal(null);
    }
  };

  useEffect(() => {
    if (isMoreModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    // eslint-disable-next-line
  }, [isMoreModal]);

  return (
    <div
      ref={modalRef}
      className={`absolute top-4 right-10 z-20 flex flex-col gap-1 items-center min-w-[150px] ${currentColor.bg} rounded-md transition-all duration-200 ease-linear shadow-dropLight`}
    >
      {moreBtnData?.map((data) => {
        const iconSrc = isDarkMode ? data.imgUrl.dark : data.imgUrl.light;

        return (
          <button
            key={data.alt}
            onClick={(e) => {
              e.stopPropagation();
              data.handler();
            }}
            className={`flex items-center ${currentColor.moreModalHover} w-full gap-2 px-2 py-1 last:pb-2 rounded-t-md justify-start duration-150 text-[14px] tracking-[0.06px] leading-[14px] font-medium last:text-redFourth`}
          >
            <img
              src={iconSrc}
              alt={data.alt}
              width={20}
              height={20}
              className="w-5 h-5  object-contain"
            />
            <span className={`whitespace-nowrap  ${currentColor.text}`}>
              {data.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default MoreModal;
/* 
  (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditModal();
              }}
              className="flex items-center w-full px-2 py-[8px]  rounded-t-md justify-start duration-150 text-[13px] tracking-[0.06px] leading-[14px] font-medium hover:bg-whiteThird active:bg-whiteThird"
            >
              <img
                src={Pen}
                alt="pen icon"
                width={14}
                height={14}
                className="w-[14px] h-[14px] mr-[5px]"
              />
              Tahrirlash
            </button>
            <button
              onClick={(e) => {
                deleteItem(e.stopPropagation());
                setDeleteModal(true);
              }}
              className="flex items-center w-full px-2 py-[8px]  rounded-b-md  duration-150 justify-start text-[13px] tracking-[0.06px] leading-[14px] font-medium hover:bg-whiteThird active:bg-whiteThird text-red"
            >
              <img
                src={Trash}
                alt="pen icon"
                width={14}
                height={14}
                className="w-[14px] h-[14px] mr-[5px]"
              />
              O'chirish
            </button>
          </>
        ) */
