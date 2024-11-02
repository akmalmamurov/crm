import { groupTypesArray } from "../../propTypes/groupTypes";
import TablesTemplate from "../TablesTemplate";
import PropTypes from "prop-types";

const CalendarGroupLessons = ({ groupLessons, showGroupLessons }) => {
  console.log(groupLessons);
  const groupLessonHeadings = [
    "ID",
    "Guruh nomi",
    "O'qituvchi",
    "Kunlar",
    "Xonalar",
  ];

  const dataExceptions = {
    dataException1: "startTime",
    dataException2: "endTime",
    dataException3: "studentCount",
    dataException4: "courseName",
  };

  return (
    <>
      <div
        data-name="overlay"
        className={
          showGroupLessons
            ? "fixed w-screen h-screen top-0 left-0 z-[19]"
            : "hidden"
        }
      ></div>
      <div className="fixed z-10 top-0 left-0 bg-lightestBlack flex min-h-screen w-full items-center justify-center">
        <div className="w-[880px] h-full ml-auto mr-auto">
          <TablesTemplate
            headings={groupLessonHeadings}
            sections={groupLessons}
            {...dataExceptions}
          />
        </div>
      </div>
    </>
  );
};
CalendarGroupLessons.propTypes = {
  groupLessons: groupTypesArray,
  showGroupLessons: PropTypes.bool.isRequired,
};

export default CalendarGroupLessons;
