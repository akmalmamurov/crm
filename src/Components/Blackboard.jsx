import { useMemo, useState } from "react";
import AddingTaskForm from "./task/AddingTaskForm";
import Navbar from "../layout/Navbar";
import { GET_TASKS } from "../adapters/Queries/task/tasks";
import { useQuery } from "@apollo/client";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import TaskColumnContainer from "./task/TaskColumnContainer";
import { createPortal } from "react-dom";
import { identifyStatus } from "@/lib/tasks";
import { useTranslation } from "@/hooks";

const BlackBoard = () => {
  const [addTaskForm, setAddTaskForm] = useState(false);
  const t = useTranslation();
  const taskColumns = useMemo(
    () => [
      {
        columnName: t.notDone,
        columnId: "4ae42692-fee8-4d79-90e8-060f0e970fb3",
        textColor: "text-redPrimary",
        status: "undone",
      },
      {
        columnName: t.today,
        columnId: "c2ca2e15-75fa-41ac-9b51-111c2a7639b1",
        textColor: "text-checkBoxColor",
        status: "today",
      },
      {
        columnName: t.inWeek,
        columnId: "2ecb1a70-6edb-4a58-b178-961cafa5c311",
        textColor: "text-greenThird",
        status: "inweek",
      },
      {
        columnName: t.remainingTasks,
        columnId: "5403affd-effc-4502-8429-342c127c7ed1",
        textColor: "text-greenThird",
        status: "outweek",
      },
      {
        columnName: t.notSpecified,
        columnId: "a1ebafec-54e3-4fd7-afc8-71416cd9d4d2",
        textColor: "text-formRgba",
        status: "unspecified",
      },
    ],
    [t]
  );
  const taskColumnIds = useMemo(
    () => taskColumns.map((col) => col.columnId),
    [taskColumns]
  );

  const { data: taskData } = useQuery(GET_TASKS);

  // const [deleteTask, { loading: deleteTaskLoading, error: deleteTaskLoaging }] =
  //   useMutation(DELETE_TASK, {
  //     update(cache, { data: { deleteTask } }) {
  //       cache.modify({
  //         fields: {
  //           tasks(existingTasks = []) {
  //             return existingTasks.filter(
  //               (task) => task.taskId !== deleteTask.taskId
  //             );
  //           },
  //         },
  //       });
  //     },
  //   });

  const closeModal = () => {
    setAddTaskForm(false);
  };
  window.addEventListener("click", (e) => {
    const el = e.target.getAttribute("data-name");
    if (el === "overlay") {
      setAddTaskForm(false);
    }
  });
  return (
    <>
      <Navbar
        navHeading={t.tasks}
        buttonContent={t.addTask}
        setShowForm={() => {
          addTaskForm ? setAddTaskForm(false) : setAddTaskForm(true);
        }}
      />
      <section data-name="blackboard">
        <div className="flex w-full  overflow-y-hidden min-h-screen">
          <DndContext
          // sensors={sensors}
          // onDragStart={handleDragStart}
          // onDragEnd={handleDragEnd}
          // onDragOver={handleDragOver}
          >
            <div className="flex gap-4">
              <SortableContext items={taskColumnIds}>
                {taskColumns.map((column) => {
                  const changedTasks = taskData?.tasks?.map((task) => {
                    let taskStatus;
                    if (task.taskEndDate === null) {
                      taskStatus = "unspecified";
                    } else {
                      taskStatus = identifyStatus(task.taskEndDate);
                    }

                    return {
                      ...task,
                      status: taskStatus,
                    };
                  });
                  return (
                    <TaskColumnContainer
                      key={column.columnId}
                      column={column}
                      tasks={changedTasks?.filter(
                        (task) => column.status === task.status
                      )}
                    />
                  );
                })}
              </SortableContext>
            </div>
            {createPortal(
              <DragOverlay>
                {/* {activeTask && <LeadContainer lead={activeLead} />} */}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        </div>
      </section>

      <AddingTaskForm addTaskForm={addTaskForm} closeModal={closeModal} />
      {/* <UpdateTaskForm
        addTaskForm={updateTaskForm}
        closeModal={() => setUpdateTaskForm(false)}
        taskId={taskId}
      /> */}
    </>
  );
};
export default BlackBoard;

/*
<div className="text-red">
<div className="w-full bg-white h-[62px] rounded-[5px] border border-graySeven px-[10px] py-[20px] mb-[13px]">
  <h2 className="text-[18px] leading-[21px]">
    Bajarilmagan - {pastTask.length}
  </h2>
</div>
{pastTask?.map((item, i) => (
  <TaskCard
    item={item}
    type={"past"}
    moreBtnState={moreBtnState}
    setMoreBtnState={setMoreBtnState}
    setDeleteModal={setDeleteModal}
    setTaskId={setTaskId}
    setUpdateTaskForm={setUpdateTaskForm}
    key={i}
  />
))}
</div>

<div className="text-blueTifany">
<div className="w-full bg-white h-[62px] rounded-[5px] border border-graySeven px-[10px] py-[20px] mb-[13px]">
  <h2 className="text-[18px] leading-[21px]">
    Bugungi - {todayTask.length}
  </h2>
</div>

<div
  onClick={() => setMiniForm(true)}
  className={`border border-graySeven text-[16px] text-black w-full h-[54px] cursor-pointer mb-[28px] flex items-center justify-center ${
    miniForm ? "hidden" : ""
  }`}
>
  <h4>
    Tezkor yaratish{" "}
    <span className="inline-block rotate-45">&times;</span>
  </h4>
</div>
<AddingTaskMiniForm miniForm={miniForm} closeModal={closeModal} />
{todayTask?.map((item, i) => (
  <TaskCard
    item={item}
    type={"today"}
    moreBtnState={moreBtnState}
    setMoreBtnState={setMoreBtnState}
    setDeleteModal={setDeleteModal}
    setTaskId={setTaskId}
    setUpdateTaskForm={setUpdateTaskForm}
    key={i}
  />
))}
</div>

<div className="text-green">
<div className="w-full bg-white h-[62px] rounded-[5px] border border-graySeven px-[10px] py-[20px] mb-[13px]">
  <h2 className="text-[18px]  leading-[21px]">
    1 hafta keyin - {weakTask.length}
  </h2>
</div>

{weakTask?.map((item, i) => (
  <TaskCard
    item={item}
    type={"week"}
    moreBtnState={moreBtnState}
    setMoreBtnState={setMoreBtnState}
    setDeleteModal={setDeleteModal}
    setTaskId={setTaskId}
    setUpdateTaskForm={setUpdateTaskForm}
    key={i}
  />
))}
</div>

<div className="text-grayThird">
<div className="w-full bg-white h-[62px] rounded-[5px] border border-graySeven px-[10px] py-[20px] mb-[13px]">
  <h2 className="text-[18px]  leading-[21px]">
    Vaqti kiritilmagan - {futureTask.length}
  </h2>
</div>
{futureTask?.map((item, i) => (
  <TaskCard
    item={item}
    type={"future"}
    moreBtnState={moreBtnState}
    setMoreBtnState={setMoreBtnState}
    setDeleteModal={setDeleteModal}
    setTaskId={setTaskId}
    setUpdateTaskForm={setUpdateTaskForm}
    key={i}
  />
))}
</div> */
