import { useRef } from "react";
import AddFormWrapper from "../../AddFormWrapper";
import { Formik } from "formik";
import FormSelectSearch from "@/Components/form-components/FormSelectSearch";
import FormDate from "@/Components/form-components/FormDate";
import dayjs from "dayjs";
import AddFormButtons from "../../AddFormButtons";
import { GET_STUDENTS } from "../../../adapters/Queries/student/students";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_STUDENT_GROUP } from "../../../adapters/Mutations/group/addStudentToGroup";
import { GET_GROUPS_BY_ID } from "../../../adapters/Queries/group/groupsById";
import { addStudentToGroupSchema } from "@/lib/validations/studentToGroupValidation";

const AddStudentToGroup = ({
  showAddStudentForm,
  setShowAddStudentForm,
  minDate,
  maxDate,
  groupId,
}) => {
  const studentNameData = useRef(null);

  const { data: studentsData } = useQuery(GET_STUDENTS, {
    variables: {
      page: 1,
      count: 10,
    },
  });
  const [addStudentGroup, { loading }] = useMutation(ADD_STUDENT_GROUP, {
    refetchQueries: [
      {
        query: GET_GROUPS_BY_ID,
        variables: { Id: groupId },
      },
    ],
  });

  studentNameData.current = studentsData?.students.map(
    (student) => student.studentName
  );

  const studentToGroupValidation = addStudentToGroupSchema(minDate, maxDate);

  return (
    <AddFormWrapper
      showForm={showAddStudentForm}
      formHeading={"Guruhga qo'shish"}
    >
      <Formik
        initialValues={{
          studentName: "Tanlang",
          addedDate: dayjs(""),
        }}
        validationSchema={studentToGroupValidation}
        onSubmit={async (values, { resetForm }) => {
          const selectedStudentObject = studentsData?.students.find(
            (student) => student.studentName === values.studentName
          );
          try {
            await addStudentGroup({
              variables: {
                studentId: selectedStudentObject.studentId,
                groupId,
                addedDate: new Date(values.addedDate).toString(),
              },
            });
            resetForm();
            setShowAddStudentForm(false);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          setValues,
          setFieldValue,
          handleSubmit,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormSelectSearch
                labelValue={"O'quvchini tanlang"}
                name={"studentName"}
                selectOptionsData={studentNameData}
                setSelectedOption={setValues}
                selectedOption={values.studentName}
                validationError={errors}
                validationTouch={touched}
                required
              />
              <FormDate
                labelValue={"Guruhga qo'shilish sanasi"}
                name={"addedDate"}
                value={values.addedDate}
                onChange={(newValue) => setFieldValue("addedDate", newValue)}
                minDate={dayjs(minDate)}
                maxDate={dayjs(maxDate)}
                validationErrors={errors}
                validationTouched={touched}
                required
              />
              <AddFormButtons loading={loading} />
            </form>
          );
        }}
      </Formik>
    </AddFormWrapper>
  );
};

export default AddStudentToGroup;
