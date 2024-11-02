import FormSelect from "../form-components/FormSelect";
import FormInput from "../form-components/FormInput";
import AddFormButtons from "../AddFormButtons";
import AddFormWrapper from "../AddFormWrapper";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_GROUPS } from "@/adapters/Mutations/group/createGroups";
import { Formik } from "formik";
import { useRef, useState } from "react";
import { GET_ROOMS } from "../../adapters/Queries/room/rooms";
import { GET_COURSES } from "../../adapters/Queries/course/courses";
import { GET_GROUPS } from "../../adapters/Queries/group/groups";
import ToastWarning from "../ToastWarning";
import { GET_EMPLOYERS } from "@/adapters/Queries/employer/employers";
import FormTime from "../form-components/FormTime";
import FormDate from "../form-components/FormDate";
import { checkingTeacherAndRoomBusyness } from "../../CustomHooks/groups/checkingError";
import { convertingWeekdayNamesToOrdinalNumbers } from "../../CustomHooks/convertDayToNumber";
import { addGroupSchemaValidation } from "@/lib/validations/groupValidation";
import { useTranslation } from "@/hooks";

const AddingGroupForms = (props) => {
  const { showGroupsForm, setShowGroupsForm, groupPage, groupCount } = props;
  const groupFormRef = useRef();
  const t = useTranslation();
  // SHOW AND CLOSE TOAST STATE
  const [showWarningToast, setShowWarningToast] = useState(false);

  // POSTING DATA (MUTATION)
  const [
    createGroup,
    { loading: createGroupLoading, error: createGroupError },
  ] = useMutation(CREATE_GROUPS, {
    refetchQueries: [
      {
        query: GET_GROUPS,
        variables: {
          page: groupPage,
          count: groupCount,
          isArchive: false,
        },
      },
    ],
  });

  const { data: roomData } = useQuery(GET_ROOMS, {
    fetchPolicy: "cache-first", // RETRIEVE DATA FROM CACHE FIRST
  });
  const { data: courseData } = useQuery(GET_COURSES, {
    fetchPolicy: "cache-first", // RETRIEVE DATA FROM CACHE FIRST
  });
  const { data: employersData } = useQuery(GET_EMPLOYERS, {
    fetchPolicy: "cache-first", // RETRIEVE DATA FROM CACHE FIRST
  });

  // GROUP SELECT DATA TYPES
  const courseTypesData = courseData?.courses?.map(
    (course) => course.courseName
  );
  const teacherTypesData = employersData?.employers.map(
    (employer) => employer.employerName
  );
  const roomTypesData = roomData?.rooms?.map((room) => room.roomName);
  const dayTypes = ["Toq kunlar", "Juft kunlar", "Boshqa kunlar"];
  const paymentMethodsData = ["Plastik", "Naqd", "Online"];

  return (
    <AddFormWrapper showForm={showGroupsForm} formHeading={"Guruh yaratish"}>
      <ToastWarning
        showWarningToast={showWarningToast}
        setShowWarningToast={setShowWarningToast}
        errorChecking={checkingTeacherAndRoomBusyness(
          groupFormRef,
          createGroupError
        )}
      />

      {/* FORM */}
      <Formik
        initialValues={{
          groupName: "",
          courseTypes: "Tanlang",
          teacherTypes: "Tanlang",
          lessonStartTime: dayjs().set("hours", 0).set("minutes", 0),
          lessonEndTime: dayjs().set("hours", 0).set("minutes", 0),
          groupDateStart: dayjs(""),
          groupDateEnd: dayjs(""),
          dayTypes: "Tanlang",
          roomTypes: "Tanlang",
          // paymentMethods: "Tanlang",
        }}
        validationSchema={addGroupSchemaValidation}
        innerRef={groupFormRef}
        onSubmit={async (values, { resetForm }) => {
          let course = courseData?.courses.find(
            (course) => course.courseName === values.courseTypes
          );
          let room = roomData?.rooms.find(
            (room) => room.roomName === values.roomTypes
          );
          let employer = employersData?.employers.find(
            (employer) => employer.employerName === values.teacherTypes
          );

          // START TIME HOURS AND MINUTES
          let startHoursAndMinutes = `${
            values.lessonStartTime.$H < 10 ? "0" : ""
          }${values.lessonStartTime.$H}:${
            values.lessonStartTime.$m < 10 ? "0" : ""
          }${values.lessonStartTime.$m}`;

          // END TIME HOURS AND MINUTES
          let endHoursAndMinutes = `${values.lessonEndTime.$H < 10 ? "0" : ""}${
            values.lessonEndTime.$H
          }:${values.lessonEndTime.$m < 10 ? "0" : ""}${
            values.lessonEndTime.$m
          }`;

          try {
            await createGroup({
              variables: {
                groupName: values.groupName,
                courseId: course.courseId,
                employerId: employer.employerId,
                startTime: startHoursAndMinutes,
                endTime: endHoursAndMinutes,
                startDate: new Date(values.groupDateStart).toString(),
                endDate: new Date(values.groupDateEnd).toString(),
                roomId: room.roomId,
                lessonCount: 15,
                groupDays: convertingWeekdayNamesToOrdinalNumbers(
                  values.dayTypes
                ),
              },
            });
            resetForm();
            setShowGroupsForm(false);
          } catch (error) {
            if (error?.message) {
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
          handleChange,
          handleSubmit,
          setValues,
        }) => {
          // console.log(typeof values.dayTypes);
          return (
            <form onSubmit={handleSubmit}>
              <FormInput
                labelValue={t.groupName}
                type={"text"}
                name={"groupName"}
                autoComplete={"off"}
                inputValue={values.groupName}
                inputPlaceholder={"Enter group name"}
                onChange={handleChange}
                validationError={errors}
                validationTouch={touched}
                required
              />
              <FormSelect
                labelValue={t.selectCourse}
                name={"courseTypes"}
                selectOptionsData={courseTypesData}
                setSelectedOption={setValues}
                selectedOption={values.courseTypes}
                validationError={errors}
                validationTouch={touched}
                required
              />
              <FormSelect
                labelValue={t.selectTeacher}
                name={"teacherTypes"}
                selectedOption={values.teacherTypes}
                selectOptionsData={teacherTypesData}
                setSelectedOption={setValues}
                validationError={errors}
                validationTouch={touched}
                required
              />

              {/* TIME */}
              <div className="grid grid-cols-2">
                <FormTime
                  labelValue={t.lessonTime}
                  value={values.lessonStartTime}
                  name={"lessonStartTime"}
                  onChange={(newValue) => {
                    setValues({ ...values, lessonStartTime: newValue });
                  }}
                  validationErrors={errors}
                  validationTouched={touched}
                />
                <FormTime
                  value={values.lessonEndTime}
                  name={"lessonEndTime"}
                  onChange={(newValue) => {
                    setValues({ ...values, lessonEndTime: newValue });
                  }}
                  validationErrors={errors}
                  validationTouched={touched}
                />
              </div>

              {/* DATE */}
              <FormDate
                labelValue={t.groupStartDate}
                value={values.groupDateStart}
                name={"groupDateStart"}
                onChange={(newValue) =>
                  setValues({ ...values, groupDateStart: newValue })
                }
                minDate={dayjs("2000-01-01")}
                maxDate={dayjs("2100-01-01")}
                validationErrors={errors}
                validationTouched={touched}
                required
              />
              <FormDate
                labelValue={t.groupEndDate}
                value={values.groupDateEnd}
                name={"groupDateEnd"}
                onChange={(newValue) =>
                  setValues({ ...values, groupDateEnd: newValue })
                }
                minDate={dayjs("2000-01-01")}
                maxDate={dayjs("2100-01-01")}
                validationErrors={errors}
                validationTouched={touched}
                required
              />

              <FormSelect
                labelValue={t.selectDays}
                name={"dayTypes"}
                selectOptionsData={dayTypes}
                setSelectedOption={setValues}
                selectedOption={values.dayTypes}
                validationError={errors}
                validationTouch={touched}
                required
              />
              <FormSelect
                labelValue={t.selectRoom}
                name={"roomTypes"}
                selectOptionsData={roomTypesData}
                setSelectedOption={setValues}
                selectedOption={values.roomTypes}
                validationError={errors}
                validationTouch={touched}
                required
              />
              {/* <FormSelect
                labelValue={"To'lov usuli"}
                name={"paymentMethods"}
                selectOptionsData={paymentMethodsData}
                setSelectedOption={setValues}
                selectedOption={values.paymentMethods}
                validationError={errors}
                validationTouch={touched}
              /> */}

              {/* BUTTONS */}
              <AddFormButtons
                title={t.create}
                loading={createGroupLoading}
                closeModal={() => setShowGroupsForm(false)}
              />
            </form>
          );
        }}
      </Formik>
    </AddFormWrapper>
  );
};

AddingGroupForms.displayName = "AddingGroupForms";
export default AddingGroupForms;
