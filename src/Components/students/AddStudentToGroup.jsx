import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { GET_GROUPS } from "../../adapters/Queries/group/groups";
import { GET_STUDENT_BY_ID } from "../../adapters/Queries/student/studentById";
import { ADD_STUDENT_GROUP } from "../../adapters/Mutations/group/addStudentToGroup";
import FormSelectSearch from "../form-components/FormSelectSearch";
import FormDate from "../form-components/FormDate";
import AddFormWrapper from "../AddFormWrapper";
import AddFormButtons from "../AddFormButtons";
import ToastWarning from "../ToastWarning";
import { checkingTeacherAndRoomBusyness } from "../../CustomHooks/groups/checkingError";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { addStudentValidation } from "../../CustomHooks/addStudentValidation";

const AddStudentToGroup = ({ showAddForm, closeModal, studentId }) => {
  const groupDataName = useRef();
  const addStudentGroupRef = useRef();

  const [dateDisabled, setDateDisabled] = useState(true);
  const [showToastWarning, setShowToastWarnign] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  // get group
  const {
    data: groupData,
    error: groupError,
    loading: groupLoading,
  } = useQuery(GET_GROUPS, {
    variables: {
      page: 1,
      count: 10,
      isArchive: false,
    },
  });

  groupDataName.current = groupData?.groups?.map((group) => group.groupName);
  const FindMinAndMaxDateLimit = () => {
    const { values } = useFormikContext();

    useEffect(() => {
      if (values.groupName !== "Tanlang") {
        groupData?.groups.forEach((group) => {
          if (group.groupName === values.groupName) {
            setMinDate(new Date(parseInt(group.startDate)));
            setMaxDate(new Date(parseInt(group.endDate)));
            setDateDisabled(false);
          }
        });
      }

      // eslint-disable-next-line
    }, [values.groupName]);
  };
  // add studetn to group
  const [addStudentGroup, { loading, error: addStudentGroupError }] =
    useMutation(ADD_STUDENT_GROUP, {
      refetchQueries: [
        {
          query: GET_STUDENT_BY_ID,
          variables: { Id: studentId },
        },
      ],
    });
  // add student to group scheme
  const addStudentToGroupSchema = Yup.object().shape({
    groupName: Yup.string().test({
      name: "groupName",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Studentlardan birini tanlang" });
        }
        return true;
      },
    }),
    addedDate: Yup.date()
      .typeError("Select a valid date")
      .nullable()
      .test({
        name: "addedDate",
        test(value, ctx) {
          if (value === null) {
            return ctx.createError({
              message: "Specify the date",
            });
          }
          const date = new Date(value);
          const validationStr = addStudentValidation(date, minDate, maxDate);

          if (validationStr) {
            return ctx.createError({ message: validationStr });
          }
          return true;
        },
      }),
  });

  return (
    <AddFormWrapper formHeading={"Guruhga qo'shish"} showForm={showAddForm}>
      <ToastWarning
        showWarningToast={showToastWarning}
        setShowWarningToast={setShowToastWarnign}
        errorChecking={checkingTeacherAndRoomBusyness(
          addStudentGroupRef,
          addStudentGroupError
        )}
      />
      <Formik
        initialValues={{
          groupName: "Tanlang",
          addedDate: dayjs(""),
        }}
        validationSchema={addStudentToGroupSchema}
        onSubmit={async (values, { resetForm }) => {
          const selectGroupData = groupData?.groups?.find(
            (group) => group.groupName === values.groupName
          );
          try {
            await addStudentGroup({
              variables: {
                studentId,
                groupId: selectGroupData?.groupId,
                addedDate: new Date(values.addedDate).toString(),
              },
            });
            resetForm();
            closeModal();
          } catch (error) {
            setShowToastWarnign(true);
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
          setFieldValue,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormSelectSearch
                labelValue={"Guruh tanlang"}
                name={"groupName"}
                selectOptionsData={groupDataName.current}
                setSelectedOption={setValues}
                selectedOption={values.groupName}
                validationError={errors}
                validationTouch={touched}
                required
              />

              <FormDate
                disabled={dateDisabled}
                labelValue={"Guruhga qo'shilish sanasi"}
                name={"addedDate"}
                value={values.addedDate}
                onChange={(newValue) => setFieldValue("addedDate", newValue)}
                minDate={dayjs(minDate)}
                maxDate={dayjs(maxDate)}
                validationErrors={errors}
                validationTouched={touched}
                required
              />

              <AddFormButtons
                title={"Qo'shish"}
                loading={loading}
                closeModal={closeModal}
              />
              <FindMinAndMaxDateLimit />
            </form>
          );
        }}
      </Formik>
    </AddFormWrapper>
  );
};

export default AddStudentToGroup;
