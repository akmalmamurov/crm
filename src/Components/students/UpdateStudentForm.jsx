import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../form-components/FormInput";
import FormDate from "../form-components/FormDate";
import FormPhoneNumber from "../form-components/FormPhoneNumber";
import FormSelect from "../form-components/FormSelect";
import AddFormWrapper from "../AddFormWrapper";
import AddFormButtons from "../AddFormButtons";

import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_STUDENT } from "../../adapters/Mutations/student/updateStudent";
import { GET_STUDENTS } from "../../adapters/Queries/student/students";
import { GET_STUDENT_BY_ID } from "../../adapters/Queries/student/studentById";
import dayjs from "dayjs";
import { converMillisecondsToDateSecond } from "../../CustomHooks/convertMillisecondsToDate";
import { useEffect, useRef, useState } from "react";
import ToastWarning from "../ToastWarning";
import { checkingTeacherAndRoomBusyness } from "../../CustomHooks/groups/checkingError";
import { useTranslation } from "@/hooks";

const UpdateStudentForm = ({ showUpdateForm, closeModal, studentId }) => {
  const [showToastModal, setShowToasModal] = useState(false);
  const studentUpdateRef = useRef();
  const t = useTranslation();
  // get single student
  const { data: studentData, loading: studentLoading } = useQuery(
    GET_STUDENT_BY_ID,
    {
      variables: {
        Id: studentId,
      },
    }
  );

  console.log(studentId);
  // update student function
  const [updateStudent, { loading, error: studentUpdateError }] = useMutation(
    UPDATE_STUDENT,
    {
      refetchQueries: [
        {
          query: GET_STUDENTS,
          variables: {
            count: 10,
            page: 1,
          },
        },
      ],
    }
  );

  // student gender type
  const genderType = [t.male, t.female];

  // get student parents
  const [parentForm, setParentForm] = useState(false);
  const [secondParentForm, setSecondParentForm] = useState(false);
  const [firstParent, setFirstParent] = useState({
    parentName: "",
    parentPhone: "",
  });
  const [secondParent, setSecondParent] = useState({
    parentName: "",
    parentPhone: "",
  });

  useEffect(() => {
    if (studentData?.studentById?.parentsInfo) {
      setFirstParent(studentData?.studentById?.parentsInfo[0]);
      setSecondParent(studentData?.studentById?.parentsInfo[1]);
    }
  }, [studentData?.studentById?.parentsInfo]);

  const visibleForm = () => {
    if (!parentForm) {
      setParentForm(true);
    } else {
      setSecondParentForm(true);
    }
  };
  // update student scheme
  const updateStudentScheme = Yup.object({
    // STUDENT NAME
    name: Yup.string()
      .min(4, "It is too short, at least 4 characters")
      .max(50, "It is too long")
      .required("This field is required"),

    // STUDENT PHONE NUMBER
    phone: Yup.string()
      .min(9, "Phone number is incorrect")
      .required("Phone number is required"),

    // STUDENT GENDER TYPE
    genderType: Yup.string().test({
      name: "genderType",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),

    // STUDENT BIRTHDAY DATE
    bithday: Yup.date()
      .typeError(null)
      .optional()
      .nullable()
      .test({
        name: "bithday",
        test(value, ctx) {
          const date = new Date(value);

          if (value === null) {
            return true;
          }
          if (date.getFullYear() > 2024 || date.getFullYear() < 1900) {
            return ctx.createError({
              message: "Select a year till 2024",
            });
          }
          return true;
        },
      }),
  });
  return (
    <AddFormWrapper
      formHeading={t.updateStudent}
      showForm={showUpdateForm}
    >
      <ToastWarning
        showWarningToast={showToastModal}
        setShowWarningToast={setShowToasModal}
        errorChecking={checkingTeacherAndRoomBusyness(
          studentUpdateRef,
          studentUpdateError
        )}
      />
      {studentLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <h2 className="text-4xl">Loading...</h2>
        </div>
      )}
      {studentData?.studentById && (
        <Formik
          initialValues={{
            name: studentData?.studentById?.studentName,
            phone: studentData?.studentById?.studentPhone?.substring(3),
            bithday: dayjs(
              converMillisecondsToDateSecond(
                studentData?.studentById?.studentBithday
              )
            ),
            genderType:
              studentData?.studentById?.studentGender === 2 ? t.male : t.female,
          }}
          innerRef={studentUpdateRef}
          validationSchema={updateStudentScheme}
          onSubmit={async (values, { resetForm }) => {
            const parents = [];

            if (firstParent?.parentName !== "") {
              parents.push(firstParent);
            }
            if (secondParent?.parentName !== "") {
              parents.push(secondParent);
            }

            try {
              await updateStudent({
                variables: {
                  id: studentId,
                  name: values.name,
                  phone: `998${values.phone}`,
                  bithday: new Date(values.bithday).toString(),
                  gender: values.gender === t.male ? 2 : 1,
                  parentsInfo: parents,
                },
              });
              resetForm();
              closeModal();
            } catch (error) {
              setShowToasModal(true);
              console.log(error);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setValues,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <FormInput
                  labelValue={t.studentName}
                  type={"text"}
                  name={"name"}
                  autoComplete={"off"}
                  inputValue={values.name}
                  inputPlaceholder={"Enter student name"}
                  onChange={handleChange}
                  validationError={errors}
                  validationTouch={touched}
                  required
                />

                <FormPhoneNumber
                  labelValue={t.phoneNumber}
                  name={"phone"}
                  inputValue={values.phone}
                  numberFormat={"+998 ## ### ## ##"}
                  onChange={(onChangeValues) =>
                    setValues({ ...values, phone: onChangeValues.value })
                  }
                  validationError={errors}
                  validationTouch={touched}
                  className={`border border-formRgba  rounded-[7px] h-[32px] outline-none px-[10px] py-[7px] text-formRgba text-[13px] leading-[16px] tracking-[0.12px]`}
                  required
                />

                <FormSelect
                  labelValue={t.genderType}
                  name={"genderType"}
                  selectedOption={values.genderType}
                  selectOptionsData={genderType}
                  setSelectedOption={setValues}
                  validationError={errors}
                  validationTouch={touched}
                  required
                />

                <FormDate
                  labelValue={t.studentBirthDate}
                  value={values.bithday}
                  name={"bithday"}
                  onChange={(newValue) =>
                    setValues({ ...values, bithday: newValue })
                  }
                  minDate={dayjs("1900-01-01")}
                  maxDate={dayjs("2024-01-01")}
                  validationErrors={errors}
                  validationTouched={touched}
                />

                <div className={parentForm ? "block relative pt-2" : "hidden"}>
                  <button
                    type="button"
                    onClick={() => setParentForm(false)}
                    className="absolute top-0 right-[13px] text-xl"
                  >
                    &times;
                  </button>
                  <FormInput
                    labelValue={t.ism}
                    type={"text"}
                    name={"parentName"}
                    autoComplete={"off"}
                    inputValue={firstParent?.parentName}
                    inputPlaceholder={t.parentName}
                    onChange={(e) => {
                      setFirstParent({
                        ...firstParent,
                        parentName: e.target.value,
                      });
                    }}
                    validationError={errors}
                    validationTouch={touched}
                  />
                  <FormPhoneNumber
                    labelValue={t.phoneNumber}
                    name={"parentPhone"}
                    inputValue={firstParent?.parentPhone}
                    numberFormat={"+998 ## ### ## ##"}
                    onChange={(onChangeValues) =>
                      setFirstParent({
                        ...firstParent,
                        parentPhone: onChangeValues.value,
                      })
                    }
                    validationError={errors}
                    validationTouch={touched}
                    className={`border border-formRgba  rounded-[7px] h-[32px] outline-none px-[10px] py-[7px] text-formRgba text-[13px] leading-[16px] tracking-[0.12px]`}
                    required
                  />
                </div>

                <div
                  className={
                    secondParentForm ? "block relative pt-2" : "hidden"
                  }
                >
                  <button
                    type="button"
                    onClick={() => setSecondParentForm(false)}
                    className="absolute top-0 right-[13px] text-xl"
                  >
                    &times;
                  </button>

                  <FormInput
                    labelValue={t.ism}
                    type={"text"}
                    name={"parentName"}
                    autoComplete={"off"}
                    inputValue={secondParent?.parentName}
                    inputPlaceholder={t.parentName}
                    onChange={(e) => {
                      setSecondParent({
                        ...secondParent,
                        parentName: e.target.value,
                      });
                    }}
                    validationError={errors}
                    validationTouch={touched}
                  />

                  <FormPhoneNumber
                    labelValue={t.phoneNumber}
                    name={"parentPhone"}
                    inputValue={secondParent?.parentPhone}
                    numberFormat={"+998 ## ### ## ##"}
                    onChange={(onChangeValues) =>
                      setSecondParent({
                        ...values,
                        parentPhone: onChangeValues.value,
                      })
                    }
                    validationError={errors}
                    validationTouch={touched}
                    className={`border border-formRgba  rounded-[7px] h-[32px] outline-none px-[10px] py-[7px] text-formRgba text-[13px] leading-[16px] tracking-[0.12px]`}
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={visibleForm}
                  className={`flex items-center text-blueTifany text-[13px] px-[13px] mb-4 
                 ${parentForm && secondParentForm ? "hidden" : "block"} }`}
                >
                  <span className="rotate-45 inline-block">&times;</span>
                  {t.additionalPhoneNumber}
                </button>

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

export default UpdateStudentForm;
