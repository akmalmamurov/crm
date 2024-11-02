import { RightIcon } from "@/assets/icons";
import useCurrentColor from "@/hooks/useCurrentColor";

const ChevronButton = ({ imgClassname, disabled, handleClick, ariaLabel }) => {
  const currentColor = useCurrentColor();
  return (
    <button
      onClick={handleClick}
      className={`group ${currentColor.bg} h-[34px] w-[34px] pt-[8px] pb-[9px] pl-[11px] pr-[13px] rounded-md hover:bg-blueTifany duration-200 disabled:bg-lightestBlack chevron-button`}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <RightIcon
        className={`${!imgClassname ? "rotate-[183deg]" : ""} ${currentColor.text} group-hover:text-white `}
      />
    </button>
  );
};

export default ChevronButton;
