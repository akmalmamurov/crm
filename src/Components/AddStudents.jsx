import FormSelect from "./form-components/FormSelect";
import FormInput from "./form-components/FormInput";
import FormDate from "./form-components/FormDate";
import AddFormWrapper from "./AddFormWrapper";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_STUDENTS } from "../adapters/Mutations/student/createStudents";
import { GET_GROUPS } from "../adapters/Queries/group/groups";
import { GET_STUDENTS } from "../adapters/Queries/student/students";
import AddFormButtons from "./AddFormButtons";
import * as Yup from "yup";
import { Formik, useFormikContext } from "formik";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import FormPhoneNumber from "./form-components/FormPhoneNumber";
import FormSelectSearch from "./form-components/FormSelectSearch";
import ToastWarning from "./ToastWarning";
import { checkingTeacherAndRoomBusyness } from "../CustomHooks/groups/checkingError";
import { GET_STUDENTS_COUNT } from "../adapters/Queries/student/studentCount";
import { addStudentValidation } from "../CustomHooks/addStudentValidation";
import useCurrentColor from "@/hooks/useCurrentColor";
import { useSelector } from "react-redux";
import { useTranslation } from "@/hooks";

const AddStudents = ({
  addStudentModal,
  closeModal,
  studentPage,
  studentCount,
  payments,
}) => {
  const groupTypeData = useRef(null);
  const studentFormRef = useRef();

  const [showWarningToast, setShowWarningToast] = useState(false);
  const [dateDisabled, setDateDisabled] = useState(true);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const currentColor = useCurrentColor();
  const t = useTranslation();
  // Get group name
  const { data: groupData } = useQuery(GET_GROUPS, {
    variables: {
      page: 1,
      count: 10,
      isArchive: false,
    },
  });

  const [
    createStudent,
    { data: studentData, loading, error: studentCreateError },
  ] = useMutation(CREATE_STUDENTS, {
    refetchQueries: [
      {
        query: GET_STUDENTS,
        variables: {
          page: studentPage,
          count: studentCount,
        },
      },
      {
        query: GET_STUDENTS_COUNT,
      },
    ],
  });

  // Select Types
  groupTypeData.current = groupData?.groups?.map((group) => group.groupName);

  // SELECT OPTIONS DATA
  const genderTypeData = [t.male, t.female];

  const [parentForm, setParentForm] = useState(false);
  const [secondParentForm, setSecondParentForm] = useState(false);
  const [parentInfo, setParentInfo] = useState({
    parentName: "",
    parentPhone: "",
  });
  const [secondParentInfo, setSecondParentInfo] = useState({
    parentName: "",
    parentPhone: "",
  });

  const FindMinAndMaxDateLimit = () => {
    const { values } = useFormikContext();

    useEffect(() => {
      if (values.groupType !== "Tanlang") {
        groupData?.groups.forEach((group) => {
          if (group.groupName === values.groupType) {
            setMinDate(new Date(parseInt(group.startDate)));
            setMaxDate(new Date(parseInt(group.endDate)));
            setDateDisabled(false);
          }
        });
      }

      // eslint-disable-next-line
    }, [values.groupType]);
  };

  const visibleForm = () => {
    if (!parentForm) {
      setParentForm(true);
    } else {
      setSecondParentForm(true);
    }
  };

  // Student form schema
  const addStudentScheme = Yup.object({
    // STUDENT NAME
    studentName: Yup.string()
      .min(4, "It is too short, at least 4 characters")
      .max(50, "It is too long")
      .required("This field is required"),

    // STUDENT PHONE NUMBER
    studentPhone: Yup.string()
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
    studentBirthday: Yup.date()
      .typeError(null)
      .optional()
      .nullable()
      .test({
        name: "studentBirthday",
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

    // STUDENT ADDED DATE
    addedDate: Yup.date()
      .typeError(null)
      .optional()
      .nullable()
      .test({
        name: "addedDate",
        test(value, ctx) {
          if (value === null) {
            return true;
          }

          const date = new Date(value);
          const validationError = addStudentValidation(date, minDate, maxDate);
          if (validationError) {
            return ctx.createError({ message: validationError });
          }

          return true;
        },
      }),

    // Group type validation
    groupType: Yup.string().test({
      name: "groupType",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),
  });

  return (
    <>
      <AddFormWrapper showForm={addStudentModal} formHeading={t.addStudent}>
        <ToastWarning
          showWarningToast={showWarningToast}
          setShowWarningToast={setShowWarningToast}
          errorChecking={checkingTeacherAndRoomBusyness(
            studentFormRef,
            studentCreateError
          )}
        />
        <Formik
          initialValues={{
            studentName: "",
            studentPhone: "",
            genderType: "Tanlang",
            studentBirthday: dayjs(""),
            groupType: "Tanlang",
            addedDate: dayjs(""),
          }}
          validationSchema={addStudentScheme}
          innerRef={studentFormRef}
          onSubmit={async (values, { resetForm }) => {
            console.log(values);
            const selectedGroup = groupData?.groups?.find(
              (group) => group.groupName === values.groupType
            );

            const parents = [];

            if (parentInfo.parentName !== "") {
              parents.push(parentInfo);
            }
            if (secondParentInfo.parentName !== "") {
              parents.push(secondParentInfo);
            }

            try {
              await createStudent({
                variables: {
                  name: values.studentName,
                  phone: `998${values.studentPhone}`,
                  gender: values.genderType === "Erkak" ? 2 : 1,
                  birthday:
                    values.studentBirthday === null ||
                    values.studentBirthday?.$d == "Invalid Date"
                      ? null
                      : new Date(values.studentBirthday).toString(),
                  groupId: selectedGroup.groupId,
                  date: new Date(values.addedDate).toString(),
                  parent: parents,
                },
              });
              resetForm();
              closeModal();
              parentInfo.parentName = "";
              parentInfo.parentPhone = "";
              secondParentInfo.parentName = "";
              secondParentInfo.parentPhone = "";
            } catch (error) {
              console.log(error.message);
              setShowWarningToast(true);
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
            setFieldValue,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <FormInput
                  labelValue={t.studentName}
                  type={"text"}
                  name={"studentName"}
                  autoComplete={"off"}
                  inputValue={values.studentName}
                  inputPlaceholder={"Enter student name"}
                  onChange={handleChange}
                  validationError={errors}
                  validationTouch={touched}
                  required
                />

                <FormPhoneNumber
                  labelValue={t.phoneNumber}
                  name={"studentPhone"}
                  inputValue={values.studentPhone}
                  numberFormat={"+998 ## ### ## ##"}
                  onChange={(onChangeValues) =>
                    setValues({ ...values, studentPhone: onChangeValues.value })
                  }
                  validationError={errors}
                  validationTouch={touched}
                  className={`border ${currentColor.inputBorder} ${currentColor.bg}  rounded-[7px] h-[32px] outline-none px-[10px] py-[7px] 
                   ${currentColor.inputText} text-[13px] leading-[16px] tracking-[0.12px]`}
                  required
                />

                <FormSelect
                  labelValue={t.genderType}
                  name={"genderType"}
                  selectedOption={values.genderType}
                  selectOptionsData={genderTypeData}
                  setSelectedOption={setValues}
                  validationError={errors}
                  validationTouch={touched}
                  required
                />

                <FormDate
                  labelValue={t.studentBirthDate}
                  value={values.studentBirthday}
                  name={"studentBirthday"}
                  onChange={(newValue) =>
                    setValues({ ...values, studentBirthday: newValue })
                  }
                  minDate={dayjs("1900-01-01")}
                  maxDate={dayjs("2024-01-01")}
                  validationErrors={errors}
                  validationTouched={touched}
                />

                <FormSelectSearch
                  labelValue={t.selectGroup}
                  name={"groupType"}
                  selectOptionsData={groupTypeData.current}
                  setSelectedOption={setValues}
                  selectedOption={values.groupType}
                  validationError={errors}
                  validationTouch={touched}
                  required
                />

                <FormDate
                  disabled={dateDisabled}
                  labelValue={t.addedDate}
                  name={"addedDate"}
                  value={values.addedDate}
                  onChange={(newValue) => setFieldValue("addedDate", newValue)}
                  minDate={dayjs(minDate)}
                  maxDate={dayjs(maxDate)}
                  validationErrors={errors}
                  validationTouched={touched}
                  required
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
                    inputValue={parentInfo.parentName}
                    inputPlaceholder={t.parentName}
                    onChange={(e) => {
                      setParentInfo({
                        ...parentInfo,
                        parentName: e.target.value,
                      });
                    }}
                    validationError={errors}
                    validationTouch={touched}
                  />
                  <FormPhoneNumber
                    labelValue={t.phoneNumber}
                    name={"parentPhone"}
                    inputValue={parentInfo.parentPhone}
                    numberFormat={"+998 ## ### ## ##"}
                    onChange={(onChangeValues) =>
                      setParentInfo({
                        ...values,
                        parentPhone: onChangeValues.value,
                      })
                    }
                    validationError={errors}
                    validationTouch={touched}
                    className={`border ${currentColor.inputBorder} rounded-[7px] h-[32px] outline-none px-[10px] py-[7px] ${currentColor.inputText} ${currentColor.bg} text-[13px] leading-[16px] tracking-[0.12px]`}
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
                    inputValue={secondParentInfo.parentName}
                    inputPlaceholder={t.parentName}
                    onChange={(e) => {
                      setParentInfo({
                        ...secondParentInfo,
                        parentName: e.target.value,
                      });
                    }}
                    validationError={errors}
                    validationTouch={touched}
                  />

                  <FormPhoneNumber
                    labelValue={t.phoneNumber}
                    name={"parentPhone"}
                    inputValue={secondParentInfo.parentPhone}
                    numberFormat={"+998 ## ### ## ##"}
                    onChange={(onChangeValues) =>
                      setSecondParentForm({
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
                  title={t.create}
                  loading={loading}
                  closeModal={closeModal}
                />
                <FindMinAndMaxDateLimit />
              </form>
            );
          }}
        </Formik>
      </AddFormWrapper>
    </>
  );
};

export default AddStudents;
