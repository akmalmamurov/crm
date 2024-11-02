import AddFormWrapper from "../AddFormWrapper";
import FormInput from "../form-components/FormInput";
import FormSelect from "../form-components/FormSelect";
import AddFormButtons from "../AddFormButtons";
import { useMutation } from "@apollo/client";
import { CREATE_COURSES } from "../../adapters/Mutations/course/createCourses";
import {
  extractNumberFromString,
  removeSpaceCommaAndConvertStringToFloat,
} from "../../CustomHooks/regexFunctions";
// import { PatternFormat } from "react-number-format";
import { GET_COURSES } from "../../adapters/Queries/course/courses";
import { Formik } from "formik";
import dayjs from "dayjs";
import FormTime from "../form-components/FormTime";
import ToastWarning from "../ToastWarning";
import { useState } from "react";
import { addCourseSchemaValidation } from "@/lib/validations/courseValidation";
import { useTranslation } from "@/hooks";

const AddingCourseForm = ({ showCourseForm, setShowCourseForm }) => {
  const [showWarningToast, setShowWarningToast] = useState(false);
  const t = useTranslation();
  const courseDurationData = ["3 oy", "6 oy", "9 oy", "1 yil"];

  const [createCourse, { loading, error: errorAvailability }] = useMutation(
    CREATE_COURSES,
    {
      refetchQueries: [
        {
          query: GET_COURSES,
        },
      ],
    }
  );

  return (
    <AddFormWrapper showForm={showCourseForm} formHeading={t.createCourse}>
      {/* WARNING TOAST */}
      <ToastWarning
        showWarningToast={showWarningToast}
        setShowWarningToast={setShowWarningToast}
        errorAvailability={errorAvailability}
      />

      {/* ADD COURSE FORM */}
      <Formik
        initialValues={{
          courseName: "",
          coursePrice: "",
          courseDuration: "Tanlang",
          courseLessonDuration: dayjs().set("hours", 0).set("minutes", 0),
        }}
        validationSchema={addCourseSchemaValidation}
        onSubmit={async (values, { resetForm }) => {
          const timeMinutes =
            values.courseLessonDuration.$H * 60 +
            values.courseLessonDuration.$m;

          try {
            await createCourse({
              variables: {
                courseName: values.courseName,
                coursePrice: removeSpaceCommaAndConvertStringToFloat(
                  values.coursePrice
                ),
                courseDuration: extractNumberFromString(values.courseDuration),
                courseDurationLesson: timeMinutes,
              },
            });
            resetForm();
            setShowCourseForm(false);
          } catch (error) {
            if (error && error?.message) {
              setShowWarningToast(true);
            }
            console.log(error);
          }

          setTimeout(() => {
            setShowWarningToast(false);
          }, 4000);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleBlur,
          handleChange,
          setValues,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormInput
                labelValue={t.courseName}
                type={"text"}
                name={"courseName"}
                autoComplete={"off"}
                inputValue={values.courseName}
                inputPlaceholder={"Enter course name"}
                onChange={handleChange}
                onBlur={handleBlur}
                validationError={errors}
                validationTouch={touched}
              />

              <FormInput
                labelValue={t.price}
                type={"text"}
                name={"coursePrice"}
                autoComplete={"off"}
                inputValue={values.coursePrice}
                inputPlaceholder={"Enter course price"}
                onChange={(e) =>
                  setValues({
                    ...values,
                    coursePrice: e.target.value.replace(/[^0-9\s]/g, ""),
                  })
                }
                onBlur={handleBlur}
                validationError={errors}
                validationTouch={touched}
              />

              <FormSelect
                labelValue={t.courseDuration}
                name={"courseDuration"}
                selectOptionsData={courseDurationData}
                setSelectedOption={setValues}
                selectedOption={values.courseDuration}
                validationError={errors}
                validationTouch={touched}
              />

              <FormTime
                labelValue={t.classDuration}
                value={values.courseLessonDuration}
                name={"courseLessonDuration"}
                onChange={(newValue) =>
                  setValues({ ...values, courseLessonDuration: newValue })
                }
                validationErrors={errors}
                validationTouched={touched}
              />

              <AddFormButtons
                title={t.create}
                loading={loading}
                closeModal={setShowCourseForm}
              />
            </form>
          );
        }}
      </Formik>
    </AddFormWrapper>
  );
};

export default AddingCourseForm;
