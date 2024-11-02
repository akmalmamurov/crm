import { Formik } from "formik";
import AddFormWrapper from "../AddFormWrapper";
import ToastWarning from "../ToastWarning";
import { useRef, useState } from "react";
import AddFormButtons from "../AddFormButtons";
import FormInput from "../form-components/FormInput";
import FormSelect from "../form-components/FormSelect";
import * as Yup from "yup";
import { checkingTeacherAndRoomBusyness } from "../../CustomHooks/groups/checkingError";
import { useTranslation } from "@/hooks";

const AddStudentPayment = ({
  showAddForm,
  closeModal,
  studentId,
  paymentError,
  createPayment,
  paymentLoading,
}) => {
  const [showToastWarning, setShowToastWarning] = useState(false);
  const addStudentPaymentRef = useRef();
  const t = useTranslation();
  // payment type data
  const financeTypeData = [t.bankCard, t.cash, "Bank hisobi"];

  // create payment
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
    <AddFormWrapper formHeading={t.paymentFee} showForm={showAddForm}>
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
            createPayment({
              id: studentId,
              amount: parseFloat(values.payment),
              type:
                values.type === "Plastik"
                  ? "card"
                  : values.type === "Naqd"
                  ? "cash"
                  : "bankaccount",
            });
            resetForm();
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
              labelValue={t.paymentAmount}
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
              labelValue={t.selectPaymentType}
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
              loading={paymentLoading}
              closeModal={closeModal}
            />
          </form>
        )}
      </Formik>
    </AddFormWrapper>
  );
};

export default AddStudentPayment;
