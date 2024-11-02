import { useSelector } from "react-redux";

const GroupsFilter = ({ showFilter }) => {
  const { sidenavType, theme } = useSelector((state) => state.theme);
  const currentColor = theme[sidenavType];
  return showFilter ? (
    <div
      className={`fixed z-20 top-[150px] right-[20px] flex flex-col w-[200px] p-[3px] ${
        sidenavType === "white" ? "bg-white" : "bg-darkBg"
      } border border-formRgba rounded-[6px]`}
    >
      <label
        htmlFor="filterOne"
        className={`relative flex justify-between items-center px-[6px] py-[8px] cursor-pointer text-[13px] leading-[16px] tracking-[0.12px] ${currentColor.text} select-none`}
      >
        Xumora gr
        <input
          type="checkbox"
          id="filterOne"
          className={`${
            sidenavType === "white" ? "border-black" : "border-white"
          } relative cursor-pointer shrink-0 appearance-none border-[1.5px] rounded-[4px] border-solid  w-[18px] h-[18px] bg-transparent outline-none focus:border-0  focus:ring-blue focus:ring-2 checked:bg-checkBoxColor checked:border-0 checked:after:absolute checked:after:left-[50%] checked:after:translate-x-[-50%] checked:after:block checked:after:h-[13px] checked:after:w-[7px] checked:after:rotate-45 checked:after:border-[3px] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent`}
        />
      </label>
      <label
        htmlFor="filterTwo"
        className={`relative flex justify-between items-center px-[6px] py-[8px] cursor-pointer text-[13px] leading-[16px] tracking-[0.12px] ${currentColor.text} select-none`}
      >
        Xumora gr
        <input
          type="checkbox"
          id="filterTwo"
          className={`${
            sidenavType === "white" ? "border-black" : "border-white"
          } relative cursor-pointer shrink-0 appearance-none border-[1.5px] rounded-[4px] border-solid  w-[18px] h-[18px] bg-transparent outline-none focus:border-0  focus:ring-blue focus:ring-2 checked:bg-checkBoxColor checked:border-0 checked:after:absolute checked:after:left-[50%] checked:after:translate-x-[-50%] checked:after:block checked:after:h-[13px] checked:after:w-[7px] checked:after:rotate-45 checked:after:border-[3px] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent`}
        />
      </label>
      <label
        htmlFor="filterThree"
        className={`relative flex justify-between items-center px-[6px] py-[8px] cursor-pointer text-[13px] leading-[16px] tracking-[0.12px] ${currentColor.text} select-none`}
      >
        Xumora gr
        <input
          type="checkbox"
          id="filterThree"
          className={`${
            sidenavType === "white" ? "border-black" : "border-white"
          } relative cursor-pointer shrink-0 appearance-none border-[1.5px] rounded-[4px] border-solid  w-[18px] h-[18px] bg-transparent outline-none focus:border-0  focus:ring-blue focus:ring-2 checked:bg-checkBoxColor checked:border-0 checked:after:absolute checked:after:left-[50%] checked:after:translate-x-[-50%] checked:after:block checked:after:h-[13px] checked:after:w-[7px] checked:after:rotate-45 checked:after:border-[3px] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent`}
        />
      </label>
      <label
        htmlFor="filterFour"
        className={`relative flex justify-between items-center px-[6px] py-[8px] cursor-pointer text-[13px] leading-[16px] tracking-[0.12px] ${currentColor.text} select-none`}
      >
        Xumora gr
        <input
          type="checkbox"
          id="filterFour"
          className={`${
            sidenavType === "white" ? "border-black" : "border-white"
          } relative cursor-pointer shrink-0 appearance-none border-[1.5px] rounded-[4px] border-solid  w-[18px] h-[18px] bg-transparent outline-none focus:border-0  focus:ring-blue focus:ring-2 checked:bg-checkBoxColor checked:border-0 checked:after:absolute checked:after:left-[50%] checked:after:translate-x-[-50%] checked:after:block checked:after:h-[13px] checked:after:w-[7px] checked:after:rotate-45 checked:after:border-[3px] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent`}
        />
      </label>
    </div>
  ) : null;
};

export default GroupsFilter;
