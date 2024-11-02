import { useEffect, useRef, useState } from "react";
import Navbar from "@/layout/Navbar";
import TablesPagination from "@/Components/TablesPagination";
import { useMutation, useQuery } from "@apollo/client";
import { GET_STUDENTS } from "@/adapters/Queries/student/students";
import TablesTemplate from "@/Components/TablesTemplate";
import AddStudents from "@/Components/AddStudents";
import { DELETE_STUDENT } from "@/adapters/Mutations/student/deleteStudent";
import { GET_STUDENTS_COUNT } from "@/adapters/Queries/student/studentCount";
import UpdateStudentForm from "@/Components/students/UpdateStudentForm";
import Check from "@/Components/Check";
import ConfirmModal from "@/Components/modal/ConfirmModal";
import { moreBtnDataConfig } from "@/constants/moreModalData";
import { CREATE_STUDENT_PAYMENT } from "@/adapters/Mutations/studentPayments/createStudentPayments";
import AddStudentPayment from "@/Components/students/AddStudentPayment";
import { useTranslation } from "@/hooks";

const Students = () => {
  const [addStudentModal, setAddStudentModal] = useState(false);
  const [studentPage, setStudentPage] = useState(1);
  const [studentCount, setStudentCount] = useState(10);
  const [checkModal, setCheckModal] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [showAddCashForm, setShowAddCashForm] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const t = useTranslation();
  const selectedStudentId = useRef(null);
  const [showUpdateStudentForm, setShowUpdateStudentForm] = useState("");
  const headings = ["№", "F.I.O", t.phoneNumber, t.group];
  const {
    data: studentsData,
    error: studentsError,
    loading: studentsLoading,
  } = useQuery(GET_STUDENTS, {
    variables: {
      page: studentPage,
      count: studentCount,
    },
  });

  const { data: studentCountData } = useQuery(GET_STUDENTS_COUNT);

  const [deleteStudent, { loading: studentDeleteLoading }] = useMutation(
    DELETE_STUDENT,
    {
      update(cache, { data: { deleteStudent } }) {
        cache.modify({
          fields: {
            students(existingStudents = []) {
              return existingStudents.filter(
                (student) => student.studentId !== deleteStudent.studentId
              );
            },
          },
        });
      },
      refetchQueries: [
        {
          query: GET_STUDENTS_COUNT,
        },
      ],
    }
  );
  const handleDeleteStudent = async () => {
    try {
      await deleteStudent({
        variables: {
          id: selectedStudentId.current,
        },
      });
      setIsDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const studentMoreBtnData = moreBtnDataConfig.lead(
    setShowUpdateStudentForm,
    setShowAddCashForm,
    setIsDeleteModal,
    t
  );

  const [
    createStudentCash,
    {
      data: studentCashData,
      error: studentCashError,
      loading: studentCashLoading,
    },
  ] = useMutation(CREATE_STUDENT_PAYMENT);

  useEffect(() => {
    if (studentCashData?.addStudentCash) {
      setPaymentData(studentCashData?.addStudentCash);
      setCheckModal(true);
    }
  }, [studentCashData]);

  const fetchPayment = async (student) => {
    try {
      await createStudentCash({
        variables: {
          ...student,
        },
      });
      setShowAddCashForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  // close modal
  window.addEventListener("click", (e) => {
    const el = e.target.getAttribute("data-name");
    if (el === "overlay") {
      setAddStudentModal(false);
      setCheckModal(false);
      setShowAddCashForm(false);
      setShowUpdateStudentForm(false);
    }
  });

  return (
    <>
      <Navbar
        navHeading={t.students}
        buttonContent={t.addStudent}
        setShowForm={() =>
          addStudentModal ? setAddStudentModal(false) : setAddStudentModal(true)
        }
        searchIcon={true}
        docIcon={true}
      />

      <AddStudents
        addStudentModal={addStudentModal}
        closeModal={() => setAddStudentModal(false)}
        studentPage={studentPage}
        studentCount={studentCount}
      />
      <AddStudentPayment
        createPayment={fetchPayment}
        paymentLoading={studentCashLoading}
        paymentError={studentCashError}
        showAddForm={showAddCashForm}
        closeModal={() => setShowAddCashForm(false)}
        studentId={selectedStudentId.current}
      />
      <UpdateStudentForm
        showUpdateForm={showUpdateStudentForm}
        closeModal={() => setShowUpdateStudentForm(false)}
        studentId={selectedStudentId.current}
      />
      <Check
        visibelModal={checkModal}
        closeModal={() => setCheckModal(false)}
        data={paymentData}
      />
      <section>
        <TablesTemplate
          loading={studentsLoading}
          headings={headings}
          sections={studentsData?.students}
          error={studentsError}
          selectedId={selectedStudentId}
          moreBtnData={studentMoreBtnData}
          idFieldName={"studentId"}
          dataException1={"colleagueId"}
          dataException2={"studentBalance"}
          dataException3={"studentBithday"}
          dataException4={"parentsInfo"}
          dataException5={"studentStatus"}
          moreBtnExist
          // setShowUpdateFrom={(e) => {
          //   setStudentId(e);
          //   setShowUpdateStudentForm(true);
          // }}
        />

        <TablesPagination
          totalCount={studentCountData?.studentCount}
          page={studentPage}
          setPage={setStudentPage}
          count={studentCount}
          setCount={setStudentCount}
        />
      </section>
      <ConfirmModal
        title={"Rostan ham o'chirmoqchimisiz ?"}
        subtitle={
          "This action cannot be undone. This will permanently delete your account and remove your data from our servers"
        }
        deleteModal
        isOpen={isDeleteModal}
        handleCancel={() => setIsDeleteModal(false)}
        handleClick={handleDeleteStudent}
        loading={studentDeleteLoading}
      />
    </>
  );
};

export default Students;
