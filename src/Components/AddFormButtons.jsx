import { useTranslation } from "@/hooks";
import useCurrentColor from "@/hooks/useCurrentColor";
import { useSelector } from "react-redux";

const AddFormButtons = ({ title, loading, closeModal }) => {
  const sideNavType = useSelector((state) => state.theme.sidenavType);
  const currentColor = useCurrentColor();
  const t = useTranslation();
  return (
    <div className="flex justify-between px-[14px]">
      <button
        type="submit"
        className="relative px-[10px] w-[120px] text-[13px] leading-4 tracking-[0.12px]  bg-blueTifany rounded-[7px] text-white duration-200 hover:opacity-85 disabled:opacity-75"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="absolute left-[10%] top-[30%] w-[16px] h-[16px] rounded-[50%] border-[3px] border-solid border-loadingColor border-t-[3px] border-t-white animate-loader"></span>
            <span className="ml-[12px] text-[13px] leading-4 tracking-[0.12px]">
              Processing...
            </span>
          </>
        ) : (
          <span>{title}</span>
        )}
      </button>
      <button
        onClick={closeModal}
        type="button"
        className={` ${
          currentColor.text
        } px-[18px] py-[10px] text-[13px] leading-4 tracking-[0.12px] ${
          sideNavType === "white" ? "bg-whiteBtn" : "bg-darkBody"
        }  rounded-[7px]  duration-200 hover:bg-lightestBlack hover:text-white`}
      >
        {t.cancellation}
      </button>
    </div>
  );
};

export default AddFormButtons;
