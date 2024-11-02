import FormInput from "../form-components/FormInput";
import FormSelectSearch from "../form-components/FormSelectSearch";
import AddFormWrapper from "../AddFormWrapper";
import AddFormButtons from "../AddFormButtons";
import { Formik } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import { GET_FUNNEL } from "@/adapters/Queries/funnel/funnel";
import { CREATE_FUNNEL_COLUMN } from "@/adapters/Mutations/funnel/createFunnelColumn";
import { memo, useRef, useState } from "react";
import ToastWarning from "../ToastWarning";
import { checkingTeacherAndRoomBusyness } from "@/CustomHooks/groups/checkingError";
import FormSelect from "../form-components/FormSelect";
import { GET_FUNNEL_COLUMNS } from "../../adapters/Queries/funnel/funnelColumn";
import { addFunnelColumnScheme } from "@/lib/validations/funnelColumnValidation";

const AddingFunnelColumn = memo(({ showAddForm, closeModal, funnelId }) => {
  const [showToastForm, setShowToastForm] = useState(false);
  const colors = ["Oq", "Qizil", "Sariq", "Qora", "Yashil"];

  const funnelColumnFormRef = useRef();
  const funnelType = useRef();

  const { data: funnelData } = useQuery(GET_FUNNEL);
  console.log(funnelId);
  funnelType.current = funnelData?.funnels?.map((funnel) => funnel.funnelName);
  const [createFunnelColumn, { error: funnelColumnError, loading }] =
    useMutation(CREATE_FUNNEL_COLUMN, {
      refetchQueries: [
        {
          query: GET_FUNNEL_COLUMNS,
          variables: { id: funnelId },
        },
      ],
    });

  return (
    <AddFormWrapper formHeading={"Ustun qo'shish"} showForm={showAddForm}>
      <ToastWarning
        setShowWarningToast={setShowToastForm}
        showWarningToast={showToastForm}
        teacherAndRoomBusyness={checkingTeacherAndRoomBusyness(
          funnelColumnFormRef,
          funnelColumnError
        )}
      />
      <Formik
        initialValues={{
          name: "",
          funnelType: "Tanlang",
          colorType: "Tanlang",
        }}
        validationSchema={addFunnelColumnScheme}
        innerRef={funnelColumnFormRef}
        onSubmit={async (values, { resetForm }) => {
          const getFunnelId = funnelData?.funnels.find(
            (funnel) => funnel.funnelName === values.funnelType
          );

          try {
            await createFunnelColumn({
              variables: {
                name: values.name,
                id: getFunnelId.funnelId,
                color: values.colorType,
              },
            });
            resetForm();
            closeModal();
          } catch (error) {
            console.log(error);
            setShowToastForm(true);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          setValues,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormInput
                labelValue={"Nomi"}
                type={"text"}
                name={"name"}
                inputValue={values.name}
                onChange={handleChange}
                validationError={errors}
                validationTouch={touched}
                required
              />
              <FormSelectSearch
                labelValue={"Voronka"}
                name={"funnelType"}
                selectedOption={values.funnelType}
                selectOptionsData={funnelType}
                setSelectedOption={setValues}
                validationError={errors}
                validationTouch={touched}
                required
              />
              <FormSelect
                labelValue={"Rang"}
                name={"colorType"}
                selectedOption={values.colorType}
                selectOptionsData={colors}
                setSelectedOption={setValues}
                validationError={errors}
                validationTouch={touched}
                required
              />

              <AddFormButtons loading={loading} closeModal={closeModal} />
            </form>
          );
        }}
      </Formik>
    </AddFormWrapper>
  );
});
AddingFunnelColumn.displayName = "AddingFunnelColumn";
export default AddingFunnelColumn;
