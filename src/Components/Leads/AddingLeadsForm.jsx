import { useRef } from "react";
import FormInput from "../form-components/FormInput";
import AddFormWrapper from "../AddFormWrapper";
import { Formik } from "formik";
import FormPhoneNumber from "../form-components/FormPhoneNumber";
import FormSelectSearch from "../form-components/FormSelectSearch";
import { GET_COURSES } from "../../adapters/Queries/course/courses";
import { useMutation, useQuery } from "@apollo/client";
import AddFormButtons from "../AddFormButtons";
import { CREATE_LEAD } from "../../adapters/Mutations/leads/createLead";
import { GET_LEADS } from "../../adapters/Queries/leads/leads";
import PropTypes from "prop-types";
import { addingLeadValidationSchema } from "@/lib/validations/leadValidation";

const AddingLeadsForm = ({
  setAddingLeadsForm,
  addingLeadsForm,
  funnelId,
  firstColumnId,
}) => {
  const courseNameData = useRef();

  const { data: coursesData } = useQuery(GET_COURSES);

  const [createLead, { loading: creatingLeadLoading }] = useMutation(
    CREATE_LEAD,
    {
      refetchQueries: [
        {
          query: GET_LEADS,
          variables: {
            id: funnelId,
          },
        },
      ],
    }
  );

  courseNameData.current = coursesData?.courses?.map(
    (course) => course.courseName
  );

  return (
    <AddFormWrapper
      formHeading={"Leadga o'quvchi qo'shish"}
      showForm={addingLeadsForm}
    >
      <Formik
        initialValues={{
          leadName: "",
          leadPhone: "",
          courseName: "Tanlang",
        }}
        validationSchema={addingLeadValidationSchema}
        onSubmit={async (values, { resetForm }) => {
          const selectedCourse = coursesData?.courses?.find(
            (course) => course.courseName === values.courseName
          );

          try {
            await createLead({
              variables: {
                leadName: values.leadName,
                leadPhone: values.leadPhone,
                columnId: firstColumnId,
                courseId: selectedCourse?.courseId,
              },
            });
            setAddingLeadsForm(false);
            resetForm();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({
          values,
          touched,
          errors,
          setValues,
          handleChange,
          handleSubmit,
          resetForm,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormInput
                labelValue={"Lead ismi"}
                type={"text"}
                name={"leadName"}
                autoComplete={"off"}
                inputValue={values.leadName}
                inputPlaceholder={"Enter lead name"}
                onChange={handleChange}
                validationError={errors}
                validationTouch={touched}
                required
              />

              <FormPhoneNumber
                labelValue={"Lead telefon raqami"}
                name={"leadPhone"}
                inputValue={values.studentPhone}
                numberFormat={"+998 (##) ### ## ##"}
                onChange={(onChangeValues) =>
                  setValues({ ...values, leadPhone: onChangeValues.value })
                }
                validationError={errors}
                validationTouch={touched}
                className={`border border-formRgba  rounded-[7px] h-[32px] outline-none px-[10px] py-[7px] text-formRgba text-[13px] leading-[16px] tracking-[0.12px]`}
                required
              />

              <FormSelectSearch
                labelValue={"Kursni tanlang"}
                name={"courseName"}
                selectOptionsData={courseNameData}
                setSelectedOption={setValues}
                selectedOption={values.courseName}
                validationError={errors}
                validationTouch={touched}
                required
              />

              <AddFormButtons
                title={"Yaratish"}
                closeModal={() => {
                  setAddingLeadsForm(false);
                  resetForm();
                }}
                loading={creatingLeadLoading}
              />
            </form>
          );
        }}
      </Formik>
    </AddFormWrapper>
  );
};

AddingLeadsForm.propTypes = {
  setAddingLeadsForm: PropTypes.func.isRequired,
  addingLeadsForm: PropTypes.bool.isRequired,
  funnelId: PropTypes.string.isRequired,
  firstColumnId: PropTypes.string,
};

export default AddingLeadsForm;
