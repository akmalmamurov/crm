import AddFormWrapper from "../AddFormWrapper";
import ToastWarning from "../ToastWarning";
import { Formik } from "formik";
import FormSelect from "../form-components/FormSelect";
import FormInput from "../form-components/FormInput";
import { checkingTeacherAndRoomBusyness } from "@/CustomHooks/groups/checkingError";
import { useMutation } from "@apollo/client";
import { RETURN_STUDENT_PAYMENT } from "@/adapters/Mutations/studentPayments/returnStudentPayments";
import { useRef, useState } from "react";
import * as Yup from "yup";
import AddFormButtons from "../AddFormButtons";
const ReturnStudentPayment = ({ showAddForm, closeModal, studentId }) => {
  const [showToastWarning, setShowToastWarning] = useState(false);
  const addStudentPaymentRef = useRef();

  const [returnPayment, { loading, error: paymentError }] = useMutation(
    RETURN_STUDENT_PAYMENT
  );
  // payment type data
  const financeTypeData = ["Plastik", "Naqd", "Bank hisobi"];
  const addStudentPaymentScheme = Yup.object({
    // Payment validation
    payment: Yup.string()
      .min(4, "Please, at least 4 numbers")
      .required("The field is required"),

    // Finance type validation
    financeType: Yup.string().test({
      name: "financeType",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),
  });
  return (
    <AddFormWrapper formHeading={"To'lovni qaytarish"} showForm={showAddForm}>
      <ToastWarning
        showWarningToast={showToastWarning}
        setShowWarningToast={setShowToastWarning}
        errorChecking={checkingTeacherAndRoomBusyness(
          addStudentPaymentRef,
          paymentError
        )}
      />
      <Formik
        initialValues={{
          payment: "",
          type: "Tanlang",
        }}
        validationSchema={addStudentPaymentScheme}
        onSubmit={async (values, { resetForm }) => {
          try {
            returnPayment({
              variables: {
                id: studentId,
                amount: parseFloat(values.payment),
                type: values.type,
              },
            });
            closeModal()
            resetForm()
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
          setFieldValue,
          setValues,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormInput
              labelValue={"To'lov miqdori"}
              type={"text"}
              name={"payment"}
              autoComplete={"off"}
              inputValue={values.payment}
              inputPlaceholder={"Enter course price"}
              onChange={(e) => setFieldValue("payment", e.target.value)}
              validationError={errors}
              validationTouch={touched}
              required
            />

            <FormSelect
              labelValue={"To'lov turini tanlang"}
              name={"type"}
              selectOptionsData={financeTypeData}
              setSelectedOption={setValues}
              selectedOption={values.type}
              validationError={errors}
              validationTouch={touched}
              required
            />
            <AddFormButtons
              title={"To'lov"}
              loading={loading}
              closeModal={closeModal}
            />
          </form>
        )}
      </Formik>
    </AddFormWrapper>
  );
};

export default ReturnStudentPayment;
