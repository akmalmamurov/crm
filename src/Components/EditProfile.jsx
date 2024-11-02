import { Formik } from "formik";
import AddFormWrapper from "./AddFormWrapper";
import * as Yup from "yup";
import dayjs from "dayjs";
import FormInput from "./form-components/FormInput";
import AddFormButtons from "./AddFormButtons";
import FormDate from "./form-components/FormDate";
import FormSelect from "./form-components/FormSelect";
import FormPhone from "./form-components/FormPhone";
const EditProfile = ({ showModal, closeModal }) => {
  const genderType = ["Erkak", "Ayol"];
  const languageType = ["O'zbek", "Rus"];
  const phoneRegExp = /^(\+998|998)?\d{9}$/;

  const editScheme = Yup.object({
    personName: Yup.string()
      .min(4, "It is too short, at least 4 characters")
      .max(50, "It is too long")
      .required("This field is required"),

    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),

    genderType: Yup.string().test({
      name: "genderType",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),

    language: Yup.string().test({
      name: "genderType",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),

    bothDate: Yup.date()
      .typeError("Select a valid date")
      .nullable()
      .test({
        name: "student both date",
        test(value, ctx) {
          const date = new Date(value);
          if (value === null) {
            return ctx.createError({ message: "Specify the time" });
          }
          if (date.getFullYear() > 2100 || date.getFullYear() < 1990) {
            return ctx.createError({
              message: "Select a year from 1990 to 2100",
            });
          }
          return true;
        },
      }),
  });
  return (
    <>
      <AddFormWrapper showForm={showModal} formHeading={"Tahrirlash"}>
        <Formik
          initialValues={{
            personName: "",
            phoneNumber: "",
            genderType: "Tanlang",
            language: "Tanlang",
            bothDate: dayjs(""),
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
                <FormInput
                  labelValue={"Ism"}
                  type={"text"}
                  name={"pesonName"}
                  autoComplete={"off"}
                  inputValue={values.pesonName}
                  inputPlaceholder={"Enter person name"}
                  onChange={handleChange}
                  validationError={errors}
                  validationTouch={touched}
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
                  labelValue={"Gender"}
                  name={"genderType"}
                  selectedOption={values.genderType}
                  selectOptionsData={genderType}
                  setSelectedOption={setValues}
                  validationError={errors}
                  validationTouch={touched}
                />
                <FormSelect
                  labelValue={"Til"}
                  name={"language"}
                  selectedOption={values.language}
                  selectOptionsData={languageType}
                  setSelectedOption={setValues}
                  validationError={errors}
                  validationTouch={touched}
                />
                <FormDate
                  labelValue={"Tug'ilgan sanasi"}
                  value={values.studentBothDate}
                  name={"studentBothDate"}
                  onChange={(newValue) =>
                    setValues({ ...values, studentBothDate: newValue })
                  }
                  minDate={dayjs("2000-01-01")}
                  maxDate={dayjs("2100-01-01")}
                  validationErrors={errors}
                  validationTouched={touched}
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

export default EditProfile;
