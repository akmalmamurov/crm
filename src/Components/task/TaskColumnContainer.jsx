import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import AddingTaskMiniForm from "./AddingTaskMiniForm";
import { useSelector } from "react-redux";
import { useTranslation } from "@/hooks";

const TaskColumnContainer = ({ column, tasks }) => {
  const [miniForm, setMiniForm] = useState(false);
  const { sidenavType, theme } = useSelector((state) => state.theme);
  const currentColor = theme[sidenavType];
  const t = useTranslation();
  const tasksId = useMemo(
    () => tasks?.map((task) => task.taskId) || [],
    [tasks]
  );

  const { setNodeRef } = useSortable({
    id: column.columnId,
    data: {
      type: "Column",
      column,
    },
  });

  const handleFormClose = () => {
    setMiniForm(false);
  };

  return (
    <div ref={setNodeRef} className="flex flex-col w-[350px] bg-transparent">
      <h2
        className={`px-4 py-6 mb-3 ${
          column.columnName === "Belgilanmagan" && sidenavType === "dark"
            ? "text-white"
            : column.textColor
        } rounded-md ${
          currentColor.bg
        } font-medium text-[22px] leading-[21.6px] capitalize`}
      >
        {column.columnName} - {tasks?.length}
      </h2>

      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden">
        {column.status === "today" && (
          <>
            <div
              onClick={() => setMiniForm(true)}
              className={`border ${currentColor.taskBorder} w-full min-h-[54px] cursor-pointer flex items-center justify-center ${currentColor.bg} ${
                miniForm ? "hidden" : ""
              }`}
            >
              <p className={`${currentColor.text}`}>
                {t.createTask}{" "}
                <span className="inline-block rotate-45">&times;</span>
              </p>
            </div>
            {miniForm && (
              <AddingTaskMiniForm
                miniForm={miniForm}
                handleFormClose={handleFormClose}
              />
            )}
          </>
        )}

        <SortableContext items={tasksId}>
          {tasks?.map((task) => (
            <TaskCard
              key={task.taskId}
              task={task}
              textColor={column.textColor}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default TaskColumnContainer;
