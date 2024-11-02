import AddFormWrapper from "../AddFormWrapper";
import FormInput from "../form-components/FormInput";
import ToastWarning from "../ToastWarning";
import { Formik } from "formik";
import { CREATE_FUNNEL } from "../../adapters/Mutations/funnel/createFunnel";
import { useMutation } from "@apollo/client";
import { GET_FUNNEL } from "../../adapters/Queries/funnel/funnel";
import { memo, useRef, useState } from "react";
import AddFormButtons from "../AddFormButtons";
import { checkingTeacherAndRoomBusyness } from "../../CustomHooks/groups/checkingError";
import { addFunnelValidationScheme } from "@/lib/validations/funnelValidation";

const AddingFunnel = memo(({ addShowForm, closeModal }) => {
  const [showToastWarning, setToastWarning] = useState(false);
  const funnelFormRef = useRef();
  const [createFunnel, { error, loading }] = useMutation(CREATE_FUNNEL, {
    refetchQueries: [
      {
        query: GET_FUNNEL,
      },
    ],
  });

  return (
    <AddFormWrapper formHeading={"Voronka qo'shish"} showForm={addShowForm}>
      <ToastWarning
        showWarningToast={showToastWarning}
        setShowWarningToast={setToastWarning}
        teacherAndRoomBusyness={checkingTeacherAndRoomBusyness(
          funnelFormRef,
          error
        )}
      />
      <ToastWarning
        showWarningToast={showToastWarning}
        setShowWarningToast={setToastWarning}
        teacherAndRoomBusyness={checkingTeacherAndRoomBusyness(
          funnelFormRef,
          error
        )}
      />
      <Formik
        initialValues={{
          funnelName: "",
        }}
        validationSchema={addFunnelValidationScheme}
        innerRef={funnelFormRef}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createFunnel({
              variables: {
                name: values.funnelName,
              },
            });
            closeModal();
            resetForm();
          } catch (error) {
            console.log(error.message);
            setToastWarning(true);
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormInput
                labelValue={"Voronka nomi"}
                type={"text"}
                name={"funnelName"}
                autoComplete={"off"}
                inputValue={values.funnelName}
                inputPlaceholder={"Enter funnel name"}
                onChange={handleChange}
                validationError={errors}
                validationTouch={touched}
                required
              />
              <AddFormButtons
                title={"Yaratish"}
                loading={loading}
                closeModal={closeModal}
              />
            </form>
          );
        }}
      </Formik>
    </AddFormWrapper>
  );
});

AddingFunnel.displayName = "AddingFunnel";
export default AddingFunnel;
