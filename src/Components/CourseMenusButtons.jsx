import { useTranslation } from "@/hooks";
import useCurrentColor from "@/hooks/useCurrentColor";
import { useLocation, useNavigate } from "react-router-dom";

const CourseMenusButtons = () => {
  const pathname = useLocation().pathname;

  const navigate = useNavigate();
  const currentColor = useCurrentColor();
  const t = useTranslation();

  const courseMenusButtons = [
    {
      button: t.course,
      path: "/category/courses",
    },
    {
      button: t.employees,
      path: "/category/colleagues",
    },
    {
      button: t.rooms,
      path: "/category/rooms",
    },
    {
      button: t.archive,
      path: "/category/archive-collegues",
    },
  ];

  return (
    <div className="flex gap-[10px] mb-[20px]">
      {courseMenusButtons.map((menusButton, index) => {
        return (
          <button
            onClick={() => navigate(menusButton.path)}
            key={index}
            type="button"
            className={`${
              pathname === menusButton.path
                ? "bg-blueTifany text-white"
                : `${currentColor.text} ${currentColor.bg} hover:bg-lighterBlack duration-200`
            } px-[12px] py-[8px] rounded-[6px] cursor-pointer text-[15px] leading-[17.9px] tracking-[-0.23px]  font-normal `}
          >
            {menusButton.button}
          </button>
        );
      })}
    </div>
  );
};

export default CourseMenusButtons;
