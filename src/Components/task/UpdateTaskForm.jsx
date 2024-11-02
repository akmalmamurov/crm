import { UPDATE_TASK } from "../../adapters/Mutations/tasks/updateTask";
import { Formik } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import * as Yup from "yup";
import dayjs from "dayjs";
import FormDate from "../form-components/FormDate";
import FormInput from "../form-components/FormInput";
import FormSelectSearch from "../form-components/FormSelectSearch";
import FormSelect from "../form-components/FormSelect";
import FormTextarea from "../FormTextarea";
import AddFormButtons from "../AddFormButtons";
import AddFormWrapper from "../AddFormWrapper";
import { useRef } from "react";
import { GET_EMPLOYERS } from "../../adapters/Queries/employer/employers";
import { GET_TASKS } from "../../adapters/Queries/task/tasks";
import { converMillisecondsToDateSecond } from "../../CustomHooks/convertMillisecondsToDate";
import { GET_TASK_BY_ID } from "../../adapters/Queries/task/taskById";

const UpdateTaskForm = ({ addTaskForm, closeModal, taskId }) => {
  const {
    data: taskData,
    error: taskError,
    loading: taskLoading,
  } = useQuery(GET_TASK_BY_ID, {
    variables: {
      id: taskId,
    },
  });

  const {
    data: employerData,
    error: employerError,
    loading: employerLoading,
  } = useQuery(GET_EMPLOYERS);

  const employerType = useRef();

  employerType.current = employerData?.employers?.map(
    (employer) => employer.employerName
  );

  const taskType = ["Tezkor", "Sekin"];
  const [updateTask, { loading }] = useMutation(UPDATE_TASK, {
    refetchQueries: [
      {
        query: GET_TASKS,
      },
    ],
  });
  const filterEmployer = (id) => {
    const data = employerData?.employers.find(
      (employer) => employer.employerId === id
    );
    return data.employerName;
  };
  const updateTaskScheme = Yup.object({
    taskTitle: Yup.string()
      .min(4, "It is too short, at least 4 characters")
      .max(50, "It is too long")
      .required("This field is required"),
    taskBody: Yup.string()
      .min(4, "It is too short, at least 4 characters")
      .max(50, "It is too long")
      .required("This field is required"),
    employerType: Yup.string().test({
      name: "employerType",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),
    taskType: Yup.string().test({
      name: "taskType",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),
    taskStartDate: Yup.date()
      .typeError("Select a valid date")
      .nullable()
      .test({
        name: "taskStartDate",
        test(value, ctx) {
          const date = new Date(value);
          if (value === null) {
            return ctx.createError({ message: "Specify the time" });
          }
          if (date.getFullYear() > 2100 || date.getFullYear() < 2000) {
            return ctx.createError({
              message: "Select a year from 2000 to 2100",
            });
          }
          return true;
        },
      }),
    taskEndDate: Yup.date()
      .typeError("Select a valid date")
      .nullable()
      .test({
        name: "taskEndDate",
        test(value, ctx) {
          const date = new Date(value);
          if (value === null) {
            return ctx.createError({ message: "Specify the time" });
          }
          if (date.getFullYear() > 2100 || date.getFullYear() < 2000) {
            return ctx.createError({
              message: "Select a year from 2000 to 2100",
            });
          }
          return true;
        },
      }),
  });
  return (
    <>
      <AddFormWrapper showForm={addTaskForm} formHeading={"Vazifa yangilash"}>
        {taskLoading && (
          <div className="w-full flex items-center justify-center h-full">
            <h2 className="text-4xl">Loader...</h2>
          </div>
        )}
        {taskData?.taskById && (
          <Formik
            initialValues={{
              taskTitle: taskData?.taskById?.taskTitle,
              taskBody: taskData?.taskById?.taskBody,
              employerType: filterEmployer(
                taskData?.taskById?.taskFromColleagueId
              ),
              taskStartDate: dayjs(
                converMillisecondsToDateSecond(
                  taskData?.taskById?.taskStartDate
                )
              ),
              taskEndDate: dayjs(
                converMillisecondsToDateSecond(taskData?.taskById?.taskEndDate)
              ),
              taskType: taskData?.taskById?.taskType === 1 ? "Tezkor" : "Sekin",
            }}
            validationSchema={updateTaskScheme}
            onSubmit={async (values, { resetForm }) => {
              const selectEmployer = employerData?.employers?.find(
                (employer) => values.employerType === employer.employerName
              );
              try {
                await updateTask({
                  variables: {
                    id: taskData?.taskById.taskId,
                    title: values.taskTitle,
                    body: values.taskBody,
                    startDate: new Date(values.taskStartDate).toString(),
                    endDate: new Date(values.taskEndDate).toString(),
                    type: values.taskType === "Tezkor" ? 1 : 2,
                    fromColleagueId: selectEmployer.employerId,
                  },
                });
                closeModal();
                resetForm();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              setValues,
              handleSubmit,
              handleChange,
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <FormInput
                    labelValue={"Nomi"}
                    type={"text"}
                    name={"taskTitle"}
                    autoComplete={"off"}
                    inputValue={values.taskTitle}
                    inputPlaceholder={"Enter task title"}
                    onChange={handleChange}
                    validationError={errors}
                    validationTouch={touched}
                    required
                  />
                  <FormSelectSearch
                    labelValue={"Hodimni tanlang"}
                    name={"employerType"}
                    selectOptionsData={employerType}
                    setSelectedOption={setValues}
                    selectedOption={values.employerType}
                    validationError={errors}
                    validationTouch={touched}
                    required
                  />
                  <FormSelect
                    labelValue={"Vazifa turini tanlang"}
                    name={"taskType"}
                    selectedOption={values.taskType}
                    selectOptionsData={taskType}
                    setSelectedOption={setValues}
                    validationError={errors}
                    validationTouch={touched}
                    required
                  />
                  <FormDate
                    labelValue={"Vazifani boshlanish sanasi"}
                    value={values.taskStartDate}
                    name={"taskStartDate"}
                    onChange={(newValue) =>
                      setValues({ ...values, taskStartDate: newValue })
                    }
                    minDate={dayjs("2000-01-01")}
                    maxDate={dayjs("2100-01-01")}
                    validationErrors={errors}
                    validationTouched={touched}
                    required
                  />
                  <FormDate
                    labelValue={"Tugash sanasi"}
                    value={values.taskEndDate}
                    name={"taskEndDate"}
                    onChange={(newValue) =>
                      setValues({ ...values, taskEndDate: newValue })
                    }
                    minDate={dayjs("2000-01-01")}
                    maxDate={dayjs("2100-01-01")}
                    validationErrors={errors}
                    validationTouched={touched}
                    required
                  />
                  <FormTextarea
                    labelValue={"Vazifa haqida"}
                    name={"taskBody"}
                    inputValue={values.taskBody}
                    inputPlaceholder={"Enter task body"}
                    onChange={handleChange}
                    validationError={errors}
                    validationTouch={touched}
                  />
                  <AddFormButtons title={"Yangilash"} loading={loading} closeModal={closeModal} />
                </form>
              );
            }}
          </Formik>
        )}
      </AddFormWrapper>
    </>
  );
};

export default UpdateTaskForm;
