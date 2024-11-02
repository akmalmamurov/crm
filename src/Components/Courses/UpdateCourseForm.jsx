import { Formik } from "formik";
import AddFormWrapper from "../AddFormWrapper";
import ToastWarning from "../ToastWarning";
import AddFormButtons from "../AddFormButtons";
import moment from "moment/moment";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import FormInput from "../form-components/FormInput";
import FormSelect from "../form-components/FormSelect";
import FormTime from "../form-components/FormTime";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_COURSE } from "@/adapters/Mutations/course/updateCourse";
import dayjs from "dayjs";
import { GET_COURSE_BY_ID } from "@/adapters/Queries/course/courseById";
import { extractNumberFromString } from "@/CustomHooks/regexFunctions";
import { GET_COURSES } from "@/adapters/Queries/course/courses";
import { useTranslation } from "@/hooks";

const UpdateCourseForm = ({ showAddForm, closeModal, courseId }) => {
  const [showToastWarning, setShowToastWarning] = useState(false);
  const t = useTranslation();
  const [time, setTime] = useState({
    h: 0,
    m: 0,
  });
  // course single data
  const {
    data: courseData,
    error: courseError,
    loading: courseLoading,
  } = useQuery(GET_COURSE_BY_ID, {
    variables: {
      id: courseId,
    },
  });

  useEffect(() => {
    if (courseData?.courseById) {
      const hours = courseData?.courseById?.courseDurationLesson / 60;
      const minut = hours - 60;

      setTime((time) => {
        (time.h = hours), (time.m = minut);
      });
    }
  }, [courseData?.courseById]);
  // course durtion data
  const courseDurationData = ["3 oy", "6 oy", "9 oy", "1 yil"];

  // update course function
  const [updateCourse, { loading, error: updateCourseError }] = useMutation(
    UPDATE_COURSE,
    {
      refetchQueries: [
        {
          query: GET_COURSES,
        },
      ],
    }
  );

  // update course scheme
  const updateCourseScheme = Yup.object().shape({
    courseName: Yup.string()
      .required("The field is required")
      .min(4, "It is too short, at least 4 characters")
      .max(50, "It is too long, at most 50 characters"),
    coursePrice: Yup.number()
      .required("The field is required")
      .typeError("The field is required")
      .min(10000, "It is too short, at least 5 digits"),
    courseDuration: Yup.string().test({
      name: "courseDuration",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),
    courseLessonDuration: Yup.date()
      .typeError("Select a valid time")
      .nullable()
      .test({
        name: "courseLessonDuration",
        test(value, ctx) {
          const date = new Date(value);
          if (value === null) {
            return ctx.createError({ message: "Specify the time" });
          }
          if (date.getHours() === 0 && date.getMinutes() === 0) {
            return ctx.createError({ message: "Specify the time" });
          }
          return true;
        },
      }),
  });
  return (
    <AddFormWrapper formHeading={"Kursni yangilash"} showForm={showAddForm}>
      <ToastWarning
        showWarningToast={showToastWarning}
        setShowWarningToast={setShowToastWarning}
        errorAvailability={updateCourseError}
      />

      {courseLoading && (
        <div className="w-full flex items-center justify-center h-full">
          <h2 className="text-4xl">Loader...</h2>
        </div>
      )}
      {courseData?.coursById && (
        <Formik
          initialValues={{
            courseName: courseData?.coursById?.courseName,
            coursePrice: courseData?.coursById?.coursePrice,
            courseDuration:
              courseData?.coursById?.courseDuration === 3
                ? "3 oy"
                : courseData?.coursById?.courseDuration === 6
                ? "6 oy"
                : courseData?.coursById?.courseDuration === 9
                ? "9 oy"
                : "1 yil",
            courseLessonDuration: dayjs()
              .set("hours", time.h)
              .set("minutes", time.m),
          }}
          validationSchema={updateCourseScheme}
          onSubmit={async (values, { resetForm }) => {
            const timeMinutes =
              values.courseLessonDuration.$H * 60 +
              values.courseLessonDuration.$m;
            try {
              await updateCourse({
                variables: {
                  id: courseId,
                  name: values.courseName,
                  price: parseFloat(values.coursePrice),
                  duration: extractNumberFromString(values.courseDuration),
                  durationLesson: timeMinutes,
                },
              });
              resetForm();
              closeModal();
            } catch (error) {
              setShowToastWarning(true);
              console.log(error);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            setValues,
            handleBlur,
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
                  title={t.update}
                  loading={loading}
                  closeModal={closeModal}
                />
              </form>
            );
          }}
        </Formik>
      )}
    </AddFormWrapper>
  );
};

export default UpdateCourseForm;
