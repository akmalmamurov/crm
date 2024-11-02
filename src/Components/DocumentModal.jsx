import { useSelector } from "react-redux";

const DocumentModal = ({ docModal }) => {
  const { sidenavType, theme } = useSelector((state) => state.theme);
  const currentColor = theme[sidenavType];
  return (
    <>
      <div
        data-name="overlay"
        className={
          docModal ? "fixed w-screen h-screen top-0 left-0 z-10" : "hidden"
        }
      ></div>
      <div
        className={
          docModal
            ? `visible fixed top-[8%] right-[7%] w-[120px] ${
                sidenavType === "white" ? "bg-white" : "bg-darkBg"
              }  border border-grayThird rounded-[10px] z-20  transition-all duration-200 ease-linear notification-modal`
            : "invisible fixed top-[11%] right-[7%] w-[120px] bg-white  border border-grayThird rounded-[10px] transition-all z-20 duration-200 ease-linear opacity-0"
        }
      >
        <button
          className={`rounded-t-[10px] text-[11px] relative w-full border-t border-t-grayThird text-left ${
            currentColor.text
          } font-medium leading-[14px] py-2 px-[24px] transition-all duration-200 ${
            sidenavType === "white"
              ? "hover:bg-whiteThird"
              : "hover:bg-borderWhite"
          }  focus:bg-whiteThird focus:after:absolute focus:after:left-[2%] 
          focus:after:top-[10%] focus:after:w-[18px] focus:after:h-[16px] focus:after:bg-check focus:text-blueTifany`}
        >
          Export
        </button>
        <button
          className={`text-[11px] relative w-full border-t border-t-grayThird text-left ${
            sidenavType === "white"
              ? "hover:bg-whiteThird"
              : "hover:bg-borderWhite"
          } ${currentColor.text} font-medium leading-[14px] py-2 px-[24px] transition-all duration-200  focus:bg-whiteThird focus:after:absolute focus:after:left-[2%] focus:after:top-[10%] focus:after:w-[18px] focus:after:h-[16px] focus:after:bg-check focus:text-blueTifany`}
        >
          Import
        </button>
        <button className={`text-[11px] relative w-full border-t border-t-grayThird text-left ${
            sidenavType === "white"
              ? "hover:bg-whiteThird"
              : "hover:bg-borderWhite"
          } ${currentColor.text} font-medium leading-[14px] py-2 px-[24px] transition-all duration-200  focus:bg-whiteThird focus:after:absolute focus:after:left-[2%] focus:after:top-[10%] focus:after:w-[18px] focus:after:h-[16px] focus:after:bg-check focus:text-blueTifany`}>
          Google sheat
        </button>
      </div>
    </>
  );
};

export default DocumentModal;
