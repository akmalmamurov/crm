import { useMutation, useQuery } from "@apollo/client";
import FormSelectSearch from "../form-components/FormSelectSearch";
import { GET_EMPLOYERS } from "@/adapters/Queries/employer/employers";
import { useMemo } from "react";
import { Formik } from "formik";
import { CREATE_TASK } from "@/adapters/Mutations/tasks/createTasks";
import { GET_TASKS } from "@/adapters/Queries/task/tasks";
import { addTaskMiniFormSchema } from "@/lib/validations/tasks";
import FormTextarea from "../FormTextarea";
import FormInput from "../form-components/FormInput";
import AddFormButtons from "../AddFormButtons";
import useCurrentColor from "@/hooks/useCurrentColor";
import { useTranslation } from "@/hooks";

const AddingTaskMiniForm = ({ handleFormClose }) => {
  const { data: employerData } = useQuery(GET_EMPLOYERS);
  const currentColor = useCurrentColor();
  const t = useTranslation();
  const employerNames = useMemo(
    () => employerData?.employers?.map((employer) => employer.employerName),
    [employerData]
  );
  const [createTask, { loading }] = useMutation(CREATE_TASK, {
    refetchQueries: [
      {
        query: GET_TASKS,
      },
    ],
  });

  return (
    <>
      <Formik
        initialValues={{
          taskTitle: "",
          employerType: "Tanlang",
          taskBody: "",
        }}
        validationSchema={addTaskMiniFormSchema}
        onSubmit={async (values, { resetForm }) => {
          const selectedEmployer = employerData?.employers?.find(
            (employer) => values.employerType === employer.employerName
          );

          try {
            await createTask({
              variables: {
                taskTitle: values.taskTitle,
                taskBody: values.taskBody,
                taskEndDate: new Date(
                  new Date().setHours(23, 59, 59)
                ).toString(),
                taskToColleagueId: selectedEmployer.employerId,
              },
            });
            handleFormClose();
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
            <form
              data-name="overlay"
              onSubmit={handleSubmit}
              className={`w-full py-3 rounded-md ${currentColor.bg}`}
            >
              <FormInput
                labelValue={t.name}
                type={"text"}
                name={"taskTitle"}
                autoComplete={"off"}
                inputValue={values.taskTitle}
                inputPlaceholder={"Enter task title"}
                onChange={handleChange}
                validationError={errors}
                className={`${currentColor.input} `}
                validationTouch={touched}
                required
              />
              <FormSelectSearch
                labelValue={t.selectEmployee}
                name={"employerType"}
                selectOptionsData={employerNames}
                setSelectedOption={setValues}
                selectedOption={values.employerType}
                validationError={errors}
                validationTouch={touched}
                required
              />
              <FormTextarea
                labelValue={t.aboutTask}
                name={"taskBody"}
                inputValue={values.taskBody}
                inputPlaceholder={"Enter task body"}
                onChange={handleChange}
                validationError={errors}
                className={`${currentColor.input} h-20`}
                validationTouch={touched}
              />
              <AddFormButtons
                title={t.add}
                loading={loading}
                closeModal={handleFormClose}
              />
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddingTaskMiniForm;
