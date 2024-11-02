
const AttendanceOptions = ({
  showAttendanceOptions,
  attendance,
  studentId,
  handleClick,
}) => {
  return (
    showAttendanceOptions === attendance.attendId && (
      <div className="absolute left-[50%] flex justify-evenly items-center translate-x-[-50%] bottom-[-26px] z-10 rounded-md w-[68px] h-[26px] bg-attendance-option">
        <button
          onClick={() =>
            handleClick(attendance.attendId, attendance.groupId, 3, studentId)
          }
          className="flex justify-center items-center w-[18px] h-[18px] border-[2px] border-greenPrimary border-solid rounded-[50%]"
        >
          <span className="w-[12.5px] h-[12.5px] bg-greenPrimary rounded-[50%]"></span>
        </button>
        <button
          onClick={() =>
            handleClick(attendance.attendId, attendance.groupId, 2, studentId)
          }
          className="flex justify-center items-center w-[18px] h-[18px] border-[2px] border-redPrimary border-solid rounded-[50%]"
        >
          <span className="w-[12.5px] h-[12.5px] bg-redPrimary rounded-[50%]"></span>
        </button>
      </div>
    )
  );
};

export default AttendanceOptions;
