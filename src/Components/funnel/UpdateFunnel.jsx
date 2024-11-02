import { Formik } from "formik";
import AddFormWrapper from "../AddFormWrapper";
import FormInput from "../form-components/FormInput";
import AddFormButtons from "../AddFormButtons";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FUNNEL_BY_ID } from "../../adapters/Queries/funnel/funnelById";
import { UPDATE_FUNNEL } from "../../adapters/Mutations/funnel/updateFunnel";
import { GET_FUNNEL } from "../../adapters/Queries/funnel/funnel";
import { addFunnelValidationScheme } from "@/lib/validations/funnelValidation";
const UpdateFunnel = ({ showAddForm, closeModal, funnelId }) => {
  // get single funnel
  const { data: funnelData, loading: funnelLoading } = useQuery(
    GET_FUNNEL_BY_ID,
    {
      variables: {
        id: funnelId,
      },
    }
  );

  // update funnel function
  const [updateFunnel, { loading }] = useMutation(UPDATE_FUNNEL, {
    refetchQueries: [
      {
        query: GET_FUNNEL,
      },
    ],
  });

  return (
    <AddFormWrapper formHeading={"Voronkani yangilash"} showForm={showAddForm}>
      {funnelLoading && (
        <div className="w-full flex items-center justify-center h-full">
          <h2 className="text-4xl">Loader...</h2>
        </div>
      )}
      {funnelData?.funnelById && (
        <Formik
          initialValues={{
            funnelName: funnelData?.funnelById?.funnelName,
          }}
          validationSchema={addFunnelValidationScheme}
          onSubmit={async (values, resetForm) => {
            try {
              await updateFunnel({
                variables: {
                  id: funnelId,
                  name: values.funnelName,
                },
              });
              closeModal();
              resetForm();
            } catch (error) {
              console.log(error);
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
                  title={"Yangilash"}
                  loading={loading}
                  closeModal={closeModal}
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

UpdateFunnel.displayName = "UpdateFunnel";
export default UpdateFunnel;
