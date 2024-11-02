import { useRef, useState } from "react";
import FormInput from "../form-components/FormInput";
import FormSelect from "../form-components/FormSelect";
import FormDate from "../form-components/FormDate";
import AddFormWrapper from "../AddFormWrapper";
import AddFormButtons from "../AddFormButtons";
import ToastWarning from "../ToastWarning";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { CREATE_COST } from "../../adapters/Mutations/cost/createCost";
import { GET_COST } from "../../adapters/Queries/cost/cost";
import dayjs from "dayjs";
import { checkingTeacherAndRoomBusyness } from "../../CustomHooks/groups/checkingError";

const AddingCostsForms = ({ addingCostsForm, closeModal }) => {
  const [showToastWarnign, setShowToasWarning] = useState(false);
  const addCostFormRef = useRef();
  // create cost
  const [createCost, { loadign, error: costError }] = useMutation(CREATE_COST, {
    refetchQueries: [
      {
        query: GET_COST,
        variables: {
          startDate: "",
          endDate: "",
        },
      },
    ],
  });

  // cost scheme
  const addCostScheme = Yup.object({
    // STUDENT NAME
    name: Yup.string()
      .min(4, "It is too short, at least 4 characters")
      .max(50, "It is too long")
      .required("This field is required"),

    // STUDENT GENDER TYPE
    costType: Yup.string().test({
      name: "costType",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Please, select one of them" });
        }
        return true;
      },
    }),

    // Payment validation
    price: Yup.string()
      .min(4, "Please, at least 4 numbers")
      .required("The field is required"),
    // STUDENT BIRTHDAY DATE
    slectedDate: Yup.date()
      .typeError(null)
      .optional()
      .nullable()
      .test({
        name: "slectedDate",
        test(value, ctx) {
          const date = new Date(value);

          if (value === null) {
            return true;
          }
          if (date.getFullYear() > 2024 || date.getFullYear() < 1900) {
            return ctx.createError({
              message: "Select a year till 2024",
            });
          }
          return true;
        },
      }),
  });
  const categorySelect = [
    "marketing",
    "arenda",
    "oyliklar",
    "jihozlar",
    "others",
  ];
  return (
    <AddFormWrapper formHeading={"Xarajat qo'shish"} showForm={addingCostsForm}>
      <ToastWarning
        showWarningToast={showToastWarnign}
        setShowWarningToast={setShowToasWarning}
        errorChecking={checkingTeacherAndRoomBusyness(
          addCostFormRef,
          costError
        )}
      />
      <Formik
        initialValues={{
          name: "",
          costType: "Tanlang",
          price: "",
          selectedDate: dayjs(""),
        }}
        validationSchema={addCostScheme}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createCost({
              variables: {
                name: values.name,
                type: values.costType,
                price: parseFloat(values.price),
                payedAt: new Date(values.selectedDate).toString(),
                colleagueId: "8304c34d-fa80-4c63-97a3-61a2c590bd3a",
              },
            });
            resetForm();
            closeModal();
          } catch (error) {
            setShowToasWarning(true);
            console.log(error);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setValues,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormInput
                labelValue={"Nomi"}
                type={"text"}
                name={"name"}
                autoComplete={"off"}
                inputValue={values.name}
                inputPlaceholder={"Enter cost name"}
                onChange={handleChange}
                validationError={errors}
                validationTouch={touched}
                required
              />
              <FormSelect
                labelValue={"Turkum"}
                name={"costType"}
                selectedOption={values.costType}
                selectOptionsData={categorySelect}
                setSelectedOption={setValues}
                validationError={errors}
                validationTouch={touched}
                required
              />
              <FormInput
                labelValue={"Summa"}
                type={"text"}
                name={"price"}
                autoComplete={"off"}
                inputValue={values.price}
                inputPlaceholder={"Enter cost price"}
                onChange={handleChange}
                validationError={errors}
                validationTouch={touched}
                required
              />
              <FormDate
                labelValue={"O'quvchini tug'ilgan sanasi"}
                value={values.selectedDate}
                name={"selectedDate"}
                onChange={(newValue) =>
                  setValues({ ...values, selectedDate: newValue })
                }
                minDate={dayjs("1900-01-01")}
                maxDate={dayjs("2024-01-01")}
                validationErrors={errors}
                validationTouched={touched}
              />

              <AddFormButtons
                title={"Yaratish"}
                loading={loadign}
                closeModal={closeModal}
              />
            </form>
          );
        }}
      </Formik>
    </AddFormWrapper>
  );
};

export default AddingCostsForms;
