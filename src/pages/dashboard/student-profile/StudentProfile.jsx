import Navbar from "@/layout/Navbar";
import ProfileCard from "@/Components/ProfileCard";
import TablesTemplate from "@/Components/TablesTemplate";
import { useMutation, useQuery } from "@apollo/client";
import { GET_STUDENT_BY_ID } from "@/adapters/Queries/student/studentById";
import { STUDENT_PAYMENTS } from "@/adapters/Queries/student/studentPayments";
import { convertMillisecondsToDate } from "@/CustomHooks/convertMillisecondsToDate";
import ProfileImg from "@/assets/images/person.fill.png";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Check from "@/Components/Check";
import AddStudentPayment from "@/Components/students/AddStudentPayment";
import { CREATE_STUDENT_PAYMENT } from "@/adapters/Mutations/studentPayments/createStudentPayments";
import ReturnStudentPayment from "@/Components/students/ReturnStudentPayment";
import AddStudentToGroup from "@/Components/students/AddStudentToGroup";
import useCurrentColor from "@/hooks/useCurrentColor";
import { useTranslation } from "@/hooks";
const StudentProfile = () => {
  const [studentCheck, setStudentCheck] = useState(false);
  const [showAddCashForm, setShowAddCashForm] = useState(false);
  const [showAddStudentGroupForm, setShowAddStudentGroupForm] = useState(false);
  const [studentCashData, setStudentCashData] = useState({});
  const [activeButton, setActiveButton] = useState("Tranzaksiya");
  const [showReturnCashForm, setShowReturnCashForm] = useState(false);
  const t = useTranslation();
  // const [paymentError, setPaymentError] = useState(null)
  // const [paymentLoading, setPaymentLoading] = useState(null)
  const { id } = useParams();

  const {
    data: studentPaymentsData,
    loading: studentPaymentsLoading,
    error: studentPaymentsError,
  } = useQuery(STUDENT_PAYMENTS, {
    variables: {
      id: id,
      type: 2,
    },
  });

  // create payment
  const [
    createPayment,
    { data, loading: paymentLoading, error: paymentError },
  ] = useMutation(CREATE_STUDENT_PAYMENT, {
    refetchQueries: [
      {
        query: STUDENT_PAYMENTS,
        variables: {
          id,
          type: 2,
        },
      },
    ],
  });

  useEffect(() => {
    if (data?.addStudentCash) {
      setStudentCashData(data?.addStudentCash);
      setStudentCheck(true);
    }
  }, [data?.addStudentCash]);

  const getPayment = async (item) => {
    try {
      await createPayment({
        variables: {
          ...item,
        },
      });
      setShowAddCashForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  const headings = [
    "№",
    t.courseName,
    t.employee,
    t.paymentType,
    t.date,
    t.sum,
  ];

  const priceType = (firstPrice, secondPrice) => {
    let result = "";
    if (firstPrice) {
      result = firstPrice;
    } else {
      result = `-${secondPrice}`;
    }
    return result;
  };
  const currentColor = useCurrentColor();
  const studentPayment =
    studentPaymentsData?.studentPayments?.PaymentHistory.map((item) => {
      const newObj = {
        paymentHistoryId: item.paymentHistoryId,
        paymentHistoryGroupName: "Undefined",
        paymentHistoryColleagueName: item.paymentHistoryColleagueName,
        paymentHistoryPaymentType: "Naqt pul",
        paymentHistoryCreateAt: "createdAt",
        paymentHistoryPrice: priceType(
          item.paymentHistoryDebit,
          item.paymentHistoryCredit
        ),
      };
      return newObj;
    });
  const headings2 = useMemo(
    () => [["ID"], t["groupName"], t["teacher"], t["courses"]],
    [t]
  );
  const studentProfileButtons = [t.transaction, t.groups];
  const dataException = [
    {
      dataException1: "",
      dataException2: "",
      dataException3: "",
      dataException4: "",
      dataException5: "",
      dataException6: "",
    },
  ];
  const {
    data: studentData,
    error: studentError,
    loading: studentLoading,
  } = useQuery(GET_STUDENT_BY_ID, {
    variables: { Id: id },
  });

  // console.log(studentData)
  let studentInfo = studentData?.studentById;
  let studenGen = "";

  if (studentInfo?.studentGender === 2) {
    studenGen = t.male;
  } else {
    studenGen = t.female;
  }

  studentInfo = {
    ...studentInfo,
    studentBithday:
      studentInfo?.studentBithday === null
        ? "__.__.____"
        : convertMillisecondsToDate(studentInfo?.studentBithday),
    studentGender: studenGen,
    rol: t.student,
  };

  console.log(studentInfo);
  const studentProfileCardListInfo = [t.phoneNumber, t.dateBirth, t.sex, t.rol];

  const necessaryStudentProfileCardInfo = useMemo(
    () => ["studentPhone", "studentBithday", "studentGender", "rol"],
    []
  );

  window.addEventListener("click", (e) => {
    const el = e.target.getAttribute("data-name");
    if (el === "overlay") {
      setShowAddCashForm(false);
      setStudentCheck(false);
    }
  });
  return (
    <>
      <Navbar navHeading={t.studentProfile} />
      <section className="student-profile-body relative">
        <AddStudentPayment
          createPayment={getPayment}
          paymentLoading={paymentLoading}
          paymentError={paymentError}
          showAddForm={showAddCashForm}
          closeModal={() => setShowAddCashForm(false)}
          studentId={id}
        />
        <AddStudentToGroup
          showAddForm={showAddStudentGroupForm}
          closeModal={() => setShowAddStudentGroupForm(false)}
          studentId={id}
        />
        <ReturnStudentPayment
          showAddForm={showReturnCashForm}
          closeModal={() => setShowReturnCashForm(false)}
          studentId={id}
        />
        <Check
          data={studentCashData}
          visibelModal={studentCheck}
          closeModal={() => setStudentCheck(false)}
        />
        <div className="flex items-start gap-[13px] xl:gap-[30px]">
          <ProfileCard
            loading={studentLoading}
            error={studentError}
            imageSource={ProfileImg}
            imageAlt={"Student profile image"}
            informationAbout={t.studentInformation}
            cardTitle={studentInfo?.studentName}
            cardListInfoTitle={studentProfileCardListInfo}
            neccessaryProfileCardInfo={necessaryStudentProfileCardInfo}
            profileInfo={studentInfo}
            visibleCheck={() => setShowAddCashForm(true)}
            visibleReturnCashForm={() => setShowReturnCashForm(true)}
          />

          <div className="w-2/3">
            <div className="mb-5">
              {studentProfileButtons.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveButton(item);
                  }}
                  className={`text-[15px] leading-[17px] rounded-md  px-[12px] py-[8px] mr-[7px] ${
                    activeButton === item
                      ? "text-white bg-blueTifany"
                      : `${currentColor.bg} ${currentColor.text}`
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            {activeButton === t.transaction ? (
              <TablesTemplate
                loading={studentPaymentsLoading}
                headings={headings}
                sections={studentPayment}
                error={studentPaymentsError}
                idFieldName={"paymentHistoryId"}
                {...dataException}
              />
            ) : (
              <div>
                <button
                  onClick={() => setShowAddStudentGroupForm(true)}
                  className="px-[12px] py-[8px] mb-4  w-auto text-[15px] leading-[17px] tracking-[0.12px]  bg-blueTifany rounded-[7px] text-white duration-200 hover:opacity-85 disabled:opacity-75"
                >
                  {t.addToGroup}
                </button>
                <TablesTemplate
                  loading={studentLoading}
                  headings={headings2}
                  sections={studentInfo?.studentGroup}
                  error={studentError}
                  idFieldName={"groupId"}
                  {...dataException}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentProfile;
