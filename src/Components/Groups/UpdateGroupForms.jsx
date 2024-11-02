import { Formik } from "formik";
import * as Yup from "yup";
import AddFormWrapper from "@/Components/AddFormWrapper";
import AddFormButtons from "@/Components/AddFormButtons";
import FormInput from "../form-components/FormInput";
import FormSelectSearch from "../form-components/FormSelectSearch";
import FormDate from "../form-components/FormDate";
import FormTime from "../form-components/FormTime";
import FormSelect from "../form-components/FormSelect";
import { useEffect, useRef, useState } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { GET_GROUPS_BY_ID } from "@/adapters/Queries/group/groupsById";
import dayjs from "dayjs";
import { GET_EMPLOYERS } from "@/adapters/Queries/employer/employers";
import { GET_ROOMS } from "@/adapters/Queries/room/rooms";
import { GET_COURSES } from "@/adapters/Queries/course/courses";
import { UPDATE_GROUP } from "@/adapters/Mutations/group/updateGroup";
import { GET_GROUPS } from "@/adapters/Queries/group/groups";
import ToastWarning from "../ToastWarning";
import { checkingTeacherAndRoomBusyness } from "@/CustomHooks/groups/checkingError";
import { convertingWeekdayNamesToOrdinalNumbers } from "@/CustomHooks/convertDayToNumber";
import { useTranslation } from "@/hooks";

const UpdateGroupForms = ({ showAddForm, closeModal, id }) => {
  const groupFormRef = useRef();
  const [showToastModal, setShowWarningToast] = useState();
  const client = useApolloClient();
  // get groups by id

  const {
    data: groupData,
    error: groupError,
    loading: groupLoading,
  } = useQuery(GET_GROUPS_BY_ID, {
    variables: { Id: id },
  });

  const { data: employers } = useQuery(GET_EMPLOYERS);
  const { data: rooms } = useQuery(GET_ROOMS);
  const { data: courses } = useQuery(GET_COURSES);
  const t = useTranslation();
  // selects data
  const employerSelectData = employers?.employers?.map(
    (employer) => employer.employerName
  );
  const courseSelectData = courses?.courses?.map((course) => course.courseName);
  const roomSelectData = rooms?.rooms?.map((room) => room.roomName);
  const dayTypes = ["Toq kunlar", "Juft kunlar", "Boshqa kunlar"];

  // update groups
  const [updateGroup, { loading, error: updateGroupError }] = useMutation(
    UPDATE_GROUP,
    {
      refetchQueries: [
        {
          query: GET_GROUPS,
          variables: {
            page: 1,
            count: 10,
            isArchive: false,
          },
        },
      ],
    }
  );

  // scheme validation
  const addGroupSchemaValidation = Yup.object({
    // GROUP NAME VALIDATION FORM
    groupName: Yup.string()
      .min(4, "It is too short, at least 4 characters")
      .max(50, "It is too long")
      .required("This field is required"),

    // COURSE TYPES VALIDATION FORM
    courseTypes: Yup.string().test({
      name: "courseTypes",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),

    // TEACHER TYPES VALIDATION FORM
    teacherTypes: Yup.string().test({
      name: "teacherTypes",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),

    // LESSON START TIME VALIDATION FORM
    lessonStartTime: Yup.date()
      .typeError("Select a valid time")
      .nullable()
      .test({
        name: "lessonStartTime",
        test(value, ctx) {
          const date = new Date(value);

          if (value === null) {
            return ctx.createError({ message: "Select a valid time" });
          }
          if (date.getHours() === 0 && date.getMinutes() === 0) {
            return ctx.createError({
              message: "Specify the time",
            });
          }
          return true;
        },
      }),

    // LESSON END TIME VALIDATION FORM
    lessonEndTime: Yup.date()
      .typeError("Select a valid time")
      .nullable()
      .test({
        name: "lessonEndTime",
        test(value, ctx) {
          const date = new Date(value);

          if (value === null) {
            return ctx.createError({ message: "Select a valid time" });
          }
          if (date.getHours() === 0 && date.getMinutes() === 0) {
            return ctx.createError({
              message: "Specify the time",
            });
          }
          return true;
        },
      }),

    // GROUP DATE START VALIDATION FORM
    groupDateStart: Yup.date()
      .typeError("Select a valid date")
      .nullable()
      .test({
        name: "groupDateStart",
        test(value, ctx) {
          if (value === null) {
            return ctx.createError({ message: "Specify the time" });
          }
          const date = new Date(value);
          if (date.getFullYear() > 2100 || date.getFullYear() < 2000) {
            return ctx.createError({
              message: "Select a year from 2000 to 2100",
            });
          }
          return true;
        },
      }),

    // GROUP DATE END VALIDATION FORM
    groupDateEnd: Yup.date()
      .typeError("Select a valid date")
      .nullable()
      .test({
        name: "groupDateEnd",
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

    // DAY TYPES VALIDATION FORM
    dayTypes: Yup.string().test({
      name: "dayTypes",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),

    // ROOM TYPES VALIDATION FORM
    roomTypes: Yup.string().test({
      name: "roomTypes",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),
  });
  return (
    <AddFormWrapper formHeading={"Guruhni yangilash"} showForm={showAddForm}>
      <ToastWarning
        showWarningToast={showToastModal}
        setShowWarningToast={setShowWarningToast}
        errorChecking={checkingTeacherAndRoomBusyness(
          groupFormRef,
          updateGroupError
        )}
      />
      {groupLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <h2 className="text-4xl">Loading...</h2>
        </div>
      )}
      {groupData?.groupByIdOrDate && (
        <Formik
          initialValues={{
            groupName: groupData?.groupByIdOrDate?.groupName,
            courseTypes: groupData?.groupByIdOrDate?.courseName,
            teacherTypes: groupData?.groupByIdOrDate?.employerName,
            lessonStartTime: dayjs()
              .set("hours", +groupData?.groupByIdOrDate?.startTime?.slice(0,2))
              .set("minutes", +groupData?.groupByIdOrDate?.startTime?.slice(3,5)),
            lessonEndTime: dayjs()
              .set("hours", +groupData?.groupByIdOrDate?.endTime?.slice(0,2))
              .set("minutes", +groupData?.groupByIdOrDate?.endTime?.slice(3,5)),
            groupDateStart: dayjs(
              new Date(parseInt(groupData?.groupByIdOrDate?.startDate))
            ),
            groupDateEnd: dayjs(
              new Date(parseInt(groupData?.groupByIdOrDate?.endDate))
            ),
            dayTypes:
              groupData?.groupByIdOrDate?.groupDays[0] === "1"
                ? "Toq kunlar"
                : "Juft kunlar",
            roomTypes: groupData?.groupByIdOrDate?.roomName,
          }}
          validationSchema={addGroupSchemaValidation}
          innerRef={groupFormRef}
          onSubmit={async (values, { resetForm }) => {
            let course = courses?.courses.find(
              (course) => course.courseName === values.courseTypes
            );
            let room = rooms?.rooms?.find(
              (room) => room.roomName === values.roomTypes
            );
            let employer = employers?.employers?.find(
              (employer) => employer.employerName === values.teacherTypes
            );

            // START TIME HOURS AND MINUTES
            let startHoursAndMinutes = `${
              values.lessonStartTime.$H < 10 ? "0" : ""
            }${values.lessonStartTime.$H}:${
              values.lessonStartTime.$m < 10 ? "0" : ""
            }${values.lessonStartTime.$m}`;

            // END TIME HOURS AND MINUTES
            let endHoursAndMinutes = `${
              values.lessonEndTime.$H < 10 ? "0" : ""
            }${values.lessonEndTime.$H}:${
              values.lessonEndTime.$m < 10 ? "0" : ""
            }${values.lessonEndTime.$m}`;

            try {
              await updateGroup({
                variables: {
                  id,
                  name: values.groupName,
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
              closeModal()
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
                  selectOptionsData={courseSelectData}
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
                  selectOptionsData={employerSelectData}
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
                  selectOptionsData={roomSelectData}
                  setSelectedOption={setValues}
                  selectedOption={values.roomTypes}
                  validationError={errors}
                  validationTouch={touched}
                  required
                />

                {/* BUTTONS */}
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

export default UpdateGroupForms;
