import { useState } from "react";
import CalendarGroupLessons from "./CalendarGroupLessons";
import PropTypes from "prop-types";
import { groupDataTypes } from "../../propTypes/groupTypes";
import { calendarDataObject } from "../../propTypes/calendarProps";
import { useSelector } from "react-redux";
import { StudentsIcon } from "@/assets/icons";

const MiniCalendarDays = ({ updatedCalendarDate, data, firstGroupsData }) => {
  const [showGroupLessons, setGroupLessons] = useState(false);
  const { sidenavType, theme } = useSelector((state) => state.theme);
  const currentColor = theme[sidenavType];
  window.addEventListener("click", (e) => {
    const el = e.target.getAttribute("data-name");
    if (el === "overlay") {
      setGroupLessons(false);
    }
  });

  return (
    <>
      {showGroupLessons && (
        <CalendarGroupLessons
          showGroupLessons={showGroupLessons}
          groupLessons={data.groups}
        />
      )}
      <div
        className={`${currentColor.bg} rounded-[4px] px-[8px] pt-[8px] pb-[4px] mb-3`}
      >
        <h4 className={`text-right text-[14px] text-grayThird  mb-[5px]`}>
          {updatedCalendarDate}
        </h4>
        <div
          className={`${
            sidenavType === "white" ? "bg-graySix " : "bg-[#FFFFFF26]"
          } text-[12px] leading-[14px] rounded-[4px] p-[5px] mb-[4px]`}
        >
          <div className="flex items-center justify-between mb-[6px]">
            <h4 className={currentColor.text}>{firstGroupsData?.courseName}</h4>

            <h3
              className={`flex items-center ${currentColor.text} gap-x-[5px]`}
            >
              <StudentsIcon
                className={`w-[14px] h-[14px] ${currentColor.text}`}
              />
              {firstGroupsData?.studentCount}
            </h3>
          </div>
          <h4 className={`${currentColor.text} mb-[6px]`}>
            {firstGroupsData?.employerName}
          </h4>
          <div className="flex items-center justify-between">
            <h4 className={currentColor.text}>{firstGroupsData?.startTime}</h4>
            <h4 className={currentColor.text}>{firstGroupsData?.endTime}</h4>
          </div>
        </div>
        <button
          onClick={() => setGroupLessons(true)}
          className={`w-full text-grayThird text-[14px] font-normal leading-[16.8px] text-center`}
        >
          {data?.groups.length} dars bor
        </button>
      </div>
    </>
  );
};
MiniCalendarDays.propTypes = {
  updatedCalendarDate: PropTypes.string.isRequired,
  firstGroupsData: groupDataTypes,
  data: calendarDataObject,
};

export default MiniCalendarDays;
