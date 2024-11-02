import FormInput from "../form-components/FormInput";
import FormSelectSearch from "../form-components/FormSelectSearch";
import AddFormWrapper from "../AddFormWrapper";
import AddFormButtons from "../AddFormButtons";
import { Formik } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import { GET_FUNNEL } from "../../adapters/Queries/funnel/funnel";
import { useRef, useState } from "react";
import ToastWarning from "../ToastWarning";
import { checkingTeacherAndRoomBusyness } from "../../CustomHooks/groups/checkingError";
import FormSelect from "../form-components/FormSelect";
import { UPDATE_FUNNEL_COLUMN } from "../../adapters/Mutations/funnel/updateFunnelColumn";
import { GET_FUNNEL_COLUMN_BY_ID } from "../../adapters/Queries/funnel/funnelColumnById";
import { GET_FUNNEL_COLUMNS } from "../../adapters/Queries/funnel/funnelColumn";
import { addFunnelColumnScheme } from "@/lib/validations/funnelColumnValidation";

const UpdateFunnelColumn = ({
  showAddForm,
  closeModal,
  funnelId,
  funnelColumnId,
}) => {
  const [showToastForm, setShowToastForm] = useState(false);
  const colors = ["Oq", "Qizil", "Sariq", "Qora", "Yashil"];

  const funnelColumnFormRef = useRef();
  const funnelType = useRef();

  //   get funnel
  const { data: funnelData } = useQuery(GET_FUNNEL);

  funnelType.current = funnelData?.funnels?.map((funnel) => funnel.funnelName);

  // get single funnel column
  const { data: funnelColumnData, loading: funnelColumnLoading } = useQuery(
    GET_FUNNEL_COLUMN_BY_ID,
    {
      variables: {
        id: funnelId,
      },
    }
  );
  // update funnel column
  const [updateFunnelColumn, { error: funnelColumnError, loading }] =
    useMutation(UPDATE_FUNNEL_COLUMN, {
      refetchQueries: [
        {
          query: GET_FUNNEL_COLUMNS,
          variables: { id: funnelColumnId },
        },
      ],
    });

  let funnelName = "";
  funnelData?.funnels?.forEach((funnel) => {
    if (funnel.funnelId === funnelColumnData?.funnelColumnById?.funnelId) {
      funnelName = funnel.funnelName;
    }
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

      {funnelColumnLoading && (
        <div className="w-full flex items-center justify-center h-full">
          <h2 className="text-4xl">Loader...</h2>
        </div>
      )}
      {funnelColumnData?.funnelColumnById && (
        <Formik
          initialValues={{
            name: funnelColumnData?.funnelColumnById?.funnelColumnName,
            funnelType: funnelName,
            colorType: funnelColumnData?.funnelColumnById?.funnelColumnColor,
          }}
          validationSchema={addFunnelColumnScheme}
          innerRef={funnelColumnFormRef}
          onSubmit={async (values, { resetForm }) => {
            const getFunnelId = funnelData?.funnels.find(
              (funnel) => funnel.funnelName === values.funnelType
            );
            try {
              await updateFunnelColumn({
                variables: {
                  columnId: funnelId,
                  name: values.name,
                  id: getFunnelId.funnelId,
                  color: values.colorType,
                  order: 3,
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

                <AddFormButtons
                  title={"Yangilash"}
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

export default UpdateFunnelColumn;
