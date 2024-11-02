import React from "react";
import AddFormWrapper from "../../AddFormWrapper";
import { Formik } from "formik";
import FormDate from "../../form-components/FormDate";
import AddFormButtons from "../../AddFormButtons";
import dayjs from "dayjs";
import * as Yup from "yup";
import { addStudentValidation } from "../../../CustomHooks/addStudentValidation";
import { useMutation } from "@apollo/client";
import { UPDATE_STUDENT_ADDED_DATE } from "../../../adapters/Mutations/group/updateStudentAddedDate";
import { GET_GROUPS_BY_ID } from "../../../adapters/Queries/group/groupsById";

const UpdateStudentAddedDate = ({
  setShowForm,
  showForm,
  minDate,
  maxDate,
  groupId,
  studentId,
}) => {
  const [updateAddedDate, { loading: updateAddedDateLoading }] = useMutation(
    UPDATE_STUDENT_ADDED_DATE,
    {
      refetchQueries: [
        {
          query: GET_GROUPS_BY_ID,
          variables: {
            Id: groupId,
          },
        },
      ],
    }
  );

  const updateStudentValidationSchema = Yup.object().shape({
    addedDate: Yup.date()
      .typeError("Select a valid date")
      .nullable()
      .test({
        name: "addedDate",
        test(value, ctx) {
          if (value === null) {
            return ctx.createError({ message: "Specify the date" });
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
    <AddFormWrapper
      showForm={showForm}
      formHeading={"Qo'shilgan sana o'zgartirish"}
    >
      <Formik
        initialValues={{
          addedDate: dayjs(""),
        }}
        validationSchema={updateStudentValidationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await updateAddedDate({
              variables: {
                studentId,
                groupId,
                addedDate: new Date(values.addedDate).toString(),
              },
            });
            resetForm();
            setShowForm(false);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values, errors, touched, setFieldValue, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormDate
                labelValue={"Guruhga qo'shilish sanasi o'zgartieish"}
                name={"addedDate"}
                value={values.addedDate}
                onChange={(newValue) => setFieldValue("addedDate", newValue)}
                minDate={dayjs(minDate)}
                maxDate={dayjs(maxDate)}
                validationErrors={errors}
                validationTouched={touched}
                required
              />
              <AddFormButtons title={"Yangilash"} loading={updateAddedDateLoading} />
            </form>
          );
        }}
      </Formik>
    </AddFormWrapper>
  );
};

export default UpdateStudentAddedDate;
