import { Formik } from "formik";
import AddFormButtons from "./AddFormButtons";
import FormInput from "./form-components/FormInput";
import FormPhone from "./form-components/FormPhone";
import FormSelect from "./form-components/FormSelect";
import AddFormWrapper from "./AddFormWrapper";
import * as Yup from "yup";
import FormUploadImg from "./form-components/FormUploadImg";

const EditFilialForm = ({ showModal, closeModal }) => {
  const modeType = ["Orange", "Light", "Dark"];
  const sidebarType = ["Open", "Close"];
  const phoneRegExp = /^(\+998|998)?\d{9}$/;

  const editScheme = Yup.object({
    logoLink: Yup.string()
      .min(4, "It is too short, at least 4 characters")
      .max(50, "It is too long")
      .required("This field is required"),

    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),

    modeType: Yup.string().test({
      name: "genderType",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),

    sidebarType: Yup.string().test({
      name: "sidebarType",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),
    subdomain: Yup.string()
      .min(4, "It is too short, at least 4 characters")
      .max(50, "It is too long")
      .required("This field is required"),
  });
  return (
    <>
      <AddFormWrapper showForm={showModal} formHeading={"Tahrirlash"}>
        <Formik
          initialValues={{
            logoLink: "",
            phoneNumber: "",
            modeType: "Tanlang",
            sidebarType: "Tanlang",
            subdomain: "",
          }}
          validationSchema={editScheme}
          onSubmit={async (values) => {
            console.log(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setValues,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <FormUploadImg
                  labelValue={"Logo image"}
                  inputPlaceholder={"upload your logo"}
                  name={"logoLink"}
                  type={"text"}
                  valueChange={handleChange}
                  validationError={errors}
                  validationTouch={touched}
                  inputValue={values.logoLink}
                />
                <FormPhone
                  labelValue={"Telefon raqami"}
                  name={"phoneNumber"}
                  inputValue={values.phoneNumber}
                  valueChange={(i) => {
                    values.phoneNumber = i;
                  }}
                  validatorError={errors}
                  validationTouch={touched}
                />
                <FormSelect
                  labelValue={"Mode"}
                  name={"modeType"}
                  selectedOption={values.modeType}
                  selectOptionsData={modeType}
                  setSelectedOption={setValues}
                  validationError={errors}
                  validationTouch={touched}
                />
                <FormSelect
                  labelValue={"Sidebar"}
                  name={"sidebarType"}
                  selectedOption={values.sidebarType}
                  selectOptionsData={sidebarType}
                  setSelectedOption={setValues}
                  validationError={errors}
                  validationTouch={touched}
                />
                <FormInput
                  labelValue={"Subdomain"}
                  type={"text"}
                  name={"subdomain"}
                  autoComplete={"off"}
                  inputValue={values.subdomain}
                  inputPlaceholder={"inter-nation"}
                  onChange={handleChange}
                  validationError={errors}
                  validationTouch={touched}
                />

                <AddFormButtons closeModal={closeModal} />
              </form>
            );
          }}
        </Formik>
      </AddFormWrapper>
    </>
  );
};

export default EditFilialForm;
