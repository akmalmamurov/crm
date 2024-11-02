import { Formik, useFormikContext } from "formik";
import AddFormButtons from "@/Components/AddFormButtons";
import FormSelectSearch from "@/Components/form-components/FormSelectSearch";
import FormDate from "@/Components/form-components/FormDate";
import AddFormWrapper from "@/Components/AddFormWrapper";
import ToastWarning from "@/Components/ToastWarning";
import { TRANSFER_STUDENT } from "@/adapters/Mutations/group/transferStudent";
import { GET_GROUPS } from "@/adapters/Queries/group/groups";
import { GET_GROUPS_BY_ID } from "@/adapters/Queries/group/groupsById";
import { useMutation, useQuery, useApolloClient } from "@apollo/client";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { addStudentValidation } from "@/CustomHooks/addStudentValidation";
import { useParams } from "react-router-dom";
import { checkingTeacherAndRoomBusyness } from "@/CustomHooks/groups/checkingError";

const TransferStudentForm = ({ showForm, closeModal, groupId, studentId }) => {
  const transferStudentRef = useRef();
  const groupsSelectData = useRef();
  const [maxDate, setMaxDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [dateDisabled, setDateDisabled] = useState(true)
  const [showToastWarnign, setShowToastWarning] = useState(false)
  // get groups
  const {
    data: groupsData,
    error: groupsError,
    loading: groupsLoading,
  } = useQuery(GET_GROUPS, {
    variables: {
      page: 1,
      count: 10,
      isArchive: false,
    },
  });
  
  groupsSelectData.current = groupsData?.groups?.map(
    (group) => group.groupName
  );

  // get max and min date
  const FindMaxAndMinDateGroup = () => {
    const {values} = useFormikContext()

    useEffect(() => {
      if(values.groupName !== "Tanlang") {
        groupsData?.groups.forEach((group) => {
          if (group.groupName === values.groupName) {
            setMinDate(new Date(parseInt(group.startDate)));
            setMaxDate(new Date(parseInt(group.endDate)));
            setNewGroupId(group.groupId)
            setDateDisabled(false);
          }
        });
      }
    }, [values.groupName])
  }
  // transfer student
  const [transferStudent, { loading, error: transferStudentError }] =
    useMutation(TRANSFER_STUDENT, {
      refetchQueries: [
        {
          query: GET_GROUPS_BY_ID,
          variables: { Id: groupId },
        },
      ],
    });

  const trnasferStudentScheme = Yup.object({
    groupName: Yup.string().test({
      name: "groupName",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),
    addedDate: Yup.date()
      .typeError()
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
  });
  return (
    <AddFormWrapper
      formHeading={"O'quvchini boshqa guruhga o'tkazish"}
      showForm={showForm}
    >
      <ToastWarning  showWarningToast={showToastWarnign}
          setShowWarningToast={setShowToastWarning}
          errorChecking={checkingTeacherAndRoomBusyness(
            transferStudentRef,
            transferStudentError
          )}/>
      <Formik
        initialValues={{
          groupName: "Tanlang",
          addedDate: dayjs(""),
        }}
        validationSchema={trnasferStudentScheme}
        onSubmit={async (values, {resetForm}) => {
           const newGroup = groupsData?.groups?.find((group) => group.groupName === values.groupName)
          try {
            await transferStudent({
              variables: {
                studentId,
                groupId: groupId,
                toGroupId:newGroup.groupId,
                addedDate: new Date(values.addedDate).toString()
              }
            })
            resetForm()
            closeModal()
          } catch (error) {
            console.log(error)
          }
        }}
      >
        {({ values, setValues, errors, touched, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <FormSelectSearch
              labelValue={"Guruh nomi"}
              name={"groupName"}
              selectOptionsData={groupsSelectData}
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
            <AddFormButtons title={"O'tkazish"} loading={loading} closeModal={closeModal} />
            <FindMaxAndMinDateGroup/>
          </form>
        )}
      </Formik>
    </AddFormWrapper>
  );
};

export default TransferStudentForm;
