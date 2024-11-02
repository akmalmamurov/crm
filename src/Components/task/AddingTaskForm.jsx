import { Formik } from "formik";
import FormInput from "../form-components/FormInput";
import FormSelectSearch from "../form-components/FormSelectSearch";
import AddFormButtons from "../AddFormButtons";
import AddFormWrapper from "../AddFormWrapper";
import dayjs from "dayjs";
import FormTextarea from "../FormTextarea";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TASK } from "../../adapters/Mutations/tasks/createTasks";
import { GET_TASKS } from "../../adapters/Queries/task/tasks";
import { GET_EMPLOYERS } from "../../adapters/Queries/employer/employers";
import FormSelect from "../form-components/FormSelect";
import { useMemo } from "react";
import FormDateTime from "../form-components/FormDateTime";
import { addTaskScheme } from "@/lib/validations/tasks";

const AddingTaskForm = ({ addTaskForm, closeModal }) => {
  const { data: employerData } = useQuery(GET_EMPLOYERS);

  const employerNames = useMemo(
    () => employerData?.employers?.map((employer) => employer.employerName),
    [employerData]
  );

  const taskType = ["Tezkor", "Sekin"];
  const [createTask, { loading }] = useMutation(CREATE_TASK, {
    refetchQueries: [
      {
        query: GET_TASKS,
      },
    ],
  });

  return (
    <>
      <AddFormWrapper showForm={addTaskForm} formHeading={"Vazifa yaraish"}>
        <Formik
          initialValues={{
            taskTitle: "",
            taskBody: "",
            employerType: "Tanlang",
            taskType: "Tanlang",
            taskEndDate: dayjs(""),
          }}
          validationSchema={addTaskScheme}
          onSubmit={async (values, { resetForm }) => {
            const selectedEmployer = employerData?.employers?.find(
              (employer) => values.employerType === employer.employerName
            );
            console.log(selectedEmployer);

            try {
              await createTask({
                variables: {
                  taskTitle: values.taskTitle,
                  taskBody: values.taskBody,
                  taskEndDate:
                    values.taskEndDate?.$d == "Invalid Date"
                      ? null
                      : new Date(values.taskEndDate).toString(),
                  taskType: 1,
                  taskToColleagueId: selectedEmployer.employerId,
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
                  labelValue={"Xodimni tanlang"}
                  name={"employerType"}
                  selectOptionsData={employerNames}
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

                <FormDateTime
                  labelValue={"Tugash sanasi"}
                  value={values.taskEndDate}
                  name={"taskEndDate"}
                  onChange={(newValue) => {
                    let parsedDate = dayjs(newValue);
                    if (
                      dayjs(newValue).hour() === 0 &&
                      dayjs(newValue).minute() === 0
                    ) {
                      parsedDate = dayjs(newValue)
                        .hour(23)
                        .minute(59)
                        .second(59);
                    }
                    setValues({ ...values, taskEndDate: parsedDate });
                  }}
                  minDate={dayjs("2000-01-01")}
                  maxDate={dayjs("2100-01-01")}
                  validationErrors={errors}
                  validationTouched={touched}
                  required={false}
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
                <AddFormButtons
                  title={"Yaratish"}
                  loading={loading}
                  closeModal={closeModal}
                />
              </form>
            );
          }}
        </Formik>
      </AddFormWrapper>
    </>
  );
};

export default AddingTaskForm;
