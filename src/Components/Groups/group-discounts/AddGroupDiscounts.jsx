import AddFormWrapper from "../../AddFormWrapper";
import { Formik } from "formik";
import FormInput from "../../form-components/FormInput";
import FormSelect from "../../form-components/FormSelect";
import dayjs from "dayjs";
import FormDate from "../../form-components/FormDate";
import AddFormButtons from "../../AddFormButtons";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_GROUP_DISCOUNTS } from "../../../adapters/Mutations/group/createGroupDiscount";
import { useParams } from "react-router-dom";
import { GET_GROUP_DISCOUNTS } from "../../../adapters/Queries/group/groupDiscount";

const AddGroupDiscounts = ({
  showGroupDiscount,
  studentId,
  setShowGroupDiscount,
}) => {
  const discountTypeData = ["super", "affordable", "course"];

  const { id } = useParams();

  const [addGroupDiscount, { loading: addDiscountLoading }] = useMutation(
    CREATE_GROUP_DISCOUNTS,
    {
      refetchQueries: [
        {
          query: GET_GROUP_DISCOUNTS,
          variables: {
            id,
          },
        },
      ],
    }
  );

  const discountValidationSchema = Yup.object().shape({
    discountType: Yup.string().test({
      name: "discountType",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Ulardan birini tanlang" });
        }
        return true;
      },
    }),
    discountAmount: Yup.number()
      .typeError("Raqam kiriting")
      .required("The field is required"),

    discountStartDate: Yup.date()
      .typeError("Select a valid date")
      .nullable()
      .test({
        name: "discountStartDate",
        test(value, ctx) {
          if (value === null) {
            return ctx.createError({ message: "Specify the time" });
          }
          const date = new Date(value);
          if (date.getFullYear() > 2100 || date.getFullYear() < 2000) {
            return ctx.createError({
              message: "Select a year from 2000 to 2100",
            });
          }
          return true;
        },
      }),
    discountEndDate: Yup.date()
      .typeError("Select a valid date")
      .nullable()
      .test({
        name: "discountEndDate",
        test(value, ctx) {
          if (value === null) {
            return ctx.createError({ message: "Specify the time" });
          }
          const date = new Date(value);
          if (date.getFullYear() > 2100 || date.getFullYear() < 2000) {
            return ctx.createError({
              message: "Select a year from 2000 to 2100",
            });
          }
          return true;
        },
      }),
  });

  return (
    <AddFormWrapper
      showForm={showGroupDiscount}
      formHeading={"Chegirma berish"}
    >
      <Formik
        initialValues={{
          discountType: "Tanlang",
          discountAmount: "",
          discountStartDate: dayjs(""),
          discountEndDate: dayjs(""),
        }}
        validationSchema={discountValidationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await addGroupDiscount({
              variables: {
                studentId,
                groupId: id,
                discountAmount: parseFloat(values.discountAmount),
                discountType: 1,
                discountStartDate: values.discountStartDate,
                discountEndDate: values.discountEndDate,
              },
            });
            resetForm();
            setShowGroupDiscount(false);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          setValues,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormSelect
                labelValue={"Chegirma turi"}
                name={"discountType"}
                selectedOption={values.discountType}
                selectOptionsData={discountTypeData}
                setSelectedOption={setValues}
                validationError={errors}
                validationTouch={touched}
                required
              />

              <FormInput
                labelValue={"Chegirma qiymati"}
                type={"text"}
                name={"discountAmount"}
                autoComplete={"off"}
                inputValue={values.discountAmount}
                inputPlaceholder={"Enter discount amount"}
                onChange={handleChange}
                validationError={errors}
                validationTouch={touched}
                required
              />

              <FormDate
                labelValue={"Chegirma boshlanish vaqtini kiriting"}
                value={values.discountStartDate}
                name={"discountStartDate"}
                onChange={(newValue) =>
                  setValues({ ...values, discountStartDate: newValue })
                }
                validationErrors={errors}
                validationTouched={touched}
              />

              <FormDate
                labelValue={"Chegirma tugash vaqtini kiriting"}
                value={values.discountEndDate}
                name={"discountEndDate"}
                onChange={(newValue) =>
                  setValues({ ...values, discountEndDate: newValue })
                }
                validationErrors={errors}
                validationTouched={touched}
              />

              <AddFormButtons loading={addDiscountLoading} />
            </form>
          );
        }}
      </Formik>
    </AddFormWrapper>
  );
};

export default AddGroupDiscounts;
