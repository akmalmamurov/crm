import React from "react";
import { STUDENT_PAYMENTS } from "../../adapters/Queries/student/studentPayments";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import TablesTemplate from "../TablesTemplate";

const StudentTransaction = ({ studentId }) => {
  const headings = [
    "№",
    "Kurs nomi",
    "Xodim",
    "Tolov usuli",
    "Qayd etilgan sana",
    "Summa",
  ];

  const {
    data: studentPaymentsData,
    loading: studentPaymentsLoading,
    error: studentPaymentsError,
  } = useQuery(STUDENT_PAYMENTS, {
    variables: {
      id: studentId,
      type: 2,
    },
  });

    return (
      <TablesTemplate  />
    )
};

export default StudentTransaction;
