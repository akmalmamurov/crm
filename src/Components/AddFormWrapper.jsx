import { useSelector } from "react-redux";

const AddFormWrapper = ({ showForm, formHeading, children }) => {
  const { sidenavType, theme } = useSelector((state) => state.theme);
  const currentColor = theme[sidenavType];
  return (
    <>
      <div
        data-name="overlay"
        className={
          showForm ? "fixed w-screen h-screen top-0 left-0 z-10" : "hidden"
        }
      ></div>
      <div
        className={`${
          showForm
            ? "visible translate-x-0 overflow-y-auto"
            : "invisible translate-x-full"
        } fixed z-40 overflow-x-hidden top-[71px] right-0 drop-shadow-md duration-200 ${
          sidenavType === "white" ? "bg-white" : "bg-darkBg"
        } w-[278px] h-[90vh] rounded-l-[8px] py-6`}
      >
        <h2
          className={`pb-4 px-[13px] mb-[24px] border-b border-grayThird text-[24px] leading-6 text-left ${currentColor.text}`}
        >
          {formHeading}
        </h2>

        {children}
      </div>
    </>
  );
};

export default AddFormWrapper;
