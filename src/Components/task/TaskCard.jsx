import ClockIcon from "@/assets/icons/ClockIcon";
import { convertMillisecondsToDate } from "@/CustomHooks/convertMillisecondsToDate";
import { useTranslation } from "@/hooks";
import useCurrentColor from "@/hooks/useCurrentColor";
import { convertDateToHoursAndMins } from "@/lib/tasks";

const TaskCard = ({ task, textColor }) => {
  const currentColor = useCurrentColor();
  const t = useTranslation();
  return (
    <div className="w-[350px] h-[92px]n shadow-dropLight">
      <div
        className={`flex flex-col space-y-2 ${currentColor.bg} p-2 rounded-md border ${currentColor.taskBorder}`}
      >
        <p className={`text-[13px] ${textColor}`}>
          {t.taskName}: {task?.taskTitle}
        </p>
        <p
          className={`text-[13px] ${currentColor.text} border ${currentColor.taskBorder}`}
        >
          <span className={`${currentColor.taskTitle} mr-2`}>
            {t.executor}:
          </span>
          {task?.taskColleagueName}
        </p>
        <div
          className={`flex items-center gap-x-1 ${textColor} ${currentColor.text}`}
        >
          <p className="text-[13px] flex items-center gap-x-0.5">
            <ClockIcon className={currentColor.text} />
            {t.deadline}: {convertMillisecondsToDate(task?.taskEndDate)}{" "}
            {convertDateToHoursAndMins(task?.taskEndDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
{
  /*
        
                  <MoreModal
            id={item.taskId}
            moreBtnState={moreBtnState}
            setDeleteModal={setDeleteModal}
            setEditModal={() => {
              setUpdateTaskForm(true);
              setMoreBtnState(false);
              setTaskId(item?.taskId);
            }}
          />
        
        <img
              src={MoreBtn}
              alt="more btn"
              onClick={() => {
                moreBtnState
                  ? setMoreBtnState("")
                  : setMoreBtnState(item?.taskId);
              }}
              className={`block px-[3px] py-[3px] cursor-pointer duration-300 rounded-[4px] hover:bg-grayFour ${
                moreBtnState === item?.taskId ? "bg-grayFour" : ""
              }`}
              width="28"
              height="28"
            /> */
}
