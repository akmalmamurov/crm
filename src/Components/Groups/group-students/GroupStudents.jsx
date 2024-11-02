import { memo, useState, useCallback, useMemo, useEffect } from "react";
import TablesTemplate from "../../TablesTemplate";
import AddStudentToGroup from "./AddStudentToGroup";
import UpdateStudentAddedDate from "./UpdateStudentAddedDate";
import TransferStudentForm from "./TransferStudentForm";
// import FrozingIcon from "@/assets/icons/group-frozing.svg";
// import DollarSign from "@/assets/icons/dollar-sign-circle.svg";
// import ArrowForward from "@/assets/icons/group-arrow-forward.svg";
// import GroupPerson from "@/assets/icons/group-person.svg";
import Plus from "@/assets/icons/plus.svg";
import PlusWhite from "@/assets/icons/plus-white.svg";
import PersonCheckmark from "@/assets/icons/person-checkmark.svg";

import AddStudentPayment from "@/Components/students/AddStudentPayment";
import Check from "@/Components/Check";
import RemoveModal from "@/Components/RemoveModal";
import { useSelector } from "react-redux";
import FrozingIcon from "@/assets/icons/FrozingIcon";
import DollarSignIcon from "@/assets/icons/DollarSignIcon";
import {
  ArrowForwardIcon,
  CalendarBudgeIcon,
  GroupPersonIcon,
} from "@/assets/icons";
import { useTranslation } from "@/hooks";
const GroupStudents = ({
  loading,
  error,
  changeStudentStatus,
  startDate,
  removeStudent,
  removeStudentLoading,
  freezeStudent,
  freezeLoading,
  endDate,
  id,
  createPayment,
  paymentLoading,
  paymentError,
  cashData,
  closeCheck,
  check,
}) => {
  const t = useTranslation();
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [showUpdateDateForm, setShowUpdateDateForm] = useState(false);
  const [showAddCashForm, setShowAddCashForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [freezeModal, setFreezeModal] = useState(false);
  const [showTransferStudentForm, setShowTransferStudentForm] = useState(false);
  const [studentId, setStudentId] = useState("");
  const { sidenavType } = useSelector((state) => state.theme);
  const groupProfileHeadings = [
    "№",
    t.status,
    t.fio,
    t.balance,
    t.dateStudentJoined,
  ];

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
  const handleFreezeStudent = (item) => {
    setFreezeModal(true);
    setStudentId(item);
  };
  const handleAddCash = useCallback((item) => {
    setShowAddCashForm(true);
    setStudentId(item);
  }, []);

  const handleUpdateDate = useCallback((item) => {
    setShowUpdateDateForm(true);
    setStudentId(item);
  }, []);

  const handleTransferStudent = useCallback((item) => {
    setShowTransferStudentForm(true);
    setStudentId(item);
  }, []);

  const handleRemoveStudent = useCallback((item) => {
    setDeleteModal(true);
    setStudentId(item);
  }, []);

  const moreBtnData = [
    {
      src: <FrozingIcon />,
      alt: "Frozing the student course",
      text: "Muzlatish",
      click: handleFreezeStudent,
    },
    {
      src: <DollarSignIcon />,
      alt: "Dollar",
      text: "To'lov",
      click: handleAddCash,
    },
    {
      src: <CalendarBudgeIcon />,
      alt: "Calendar",
      text: "Qo'shilgan sana o'zgartirish",
      click: handleUpdateDate,
    },
    {
      src: <ArrowForwardIcon />,
      alt: "Arrow forward icon",
      text: "O'quvchilarni boshqa guruhga o'tkazish",
      click: handleTransferStudent,
    },
    {
      src: <GroupPersonIcon />,
      alt: "Person being deleted",
      text: "Guruhdan chiqarish",
      click: handleRemoveStudent,
    },
  ];

  const tableButtons = useMemo(
    () => [
      {
        buttonName: t.addStudentGroup,
        icon: `${sidenavType === "white" ? Plus : PlusWhite}`,
        click: () => setShowAddStudentForm(true),
      },
      {
        buttonName: "Active",
        icon: PersonCheckmark,
      },
    ],
    []
  );

  useEffect(() => {
    const handleClick = (e) => {
      const el = e.target.getAttribute("data-name");
      if (el === "overlay") {
        setShowAddStudentForm(false);
        setShowUpdateDateForm(false);
        setShowTransferStudentForm(false);
        setShowAddCashForm(false);
        setShowCashCheck(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <TablesTemplate
        loading={loading}
        error={error}
        headings={groupProfileHeadings}
        sections={changeStudentStatus}
        tableButtons={tableButtons}
        moreBtnData={moreBtnData}
        idFieldName={"studentId"}
        moreBtnExist={true}
      />
      <AddStudentToGroup
        groupId={id}
        showAddStudentForm={showAddStudentForm}
        setShowAddStudentForm={setShowAddStudentForm}
        minDate={startDate}
        maxDate={endDate}
      />

      <UpdateStudentAddedDate
        setShowForm={setShowUpdateDateForm}
        showForm={showUpdateDateForm}
        minDate={startDate}
        maxDate={endDate}
        groupId={id}
        studentId={studentId}
      />
      <AddStudentPayment
        createPayment={getPayment}
        paymentLoading={paymentLoading}
        paymentError={paymentError}
        showAddForm={showAddCashForm}
        closeModal={() => setShowAddCashForm(false)}
        studentId={studentId}
      />
      <RemoveModal
        returnModal={deleteModal}
        setReturnModal={setDeleteModal}
        returnItem={removeStudent}
        returnLoading={removeStudentLoading}
        itemId={studentId}
        groupId={id}
        text={"guruhdan chiqarishni istaysizmi"}
        closeMoreModal={() => setStudentId("")}
      />
      <RemoveModal
        returnModal={freezeModal}
        setReturnModal={setFreezeModal}
        returnItem={freezeStudent}
        returnLoading={freezeLoading}
        itemId={studentId}
        groupId={id}
        text={"muzlatishni istaysizmi"}
        closeMoreModal={() => setStudentId("")}
      />
      <Check visibelModal={check} closeModal={closeCheck} data={cashData} />
      <TransferStudentForm
        closeModal={() => setShowTransferStudentForm(false)}
        showForm={showTransferStudentForm}
        groupId={id}
        studentId={studentId}
      />
    </>
  );
};
export default GroupStudents;
