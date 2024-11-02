import { useApolloClient } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";

import Chart from "@/Components/Chart";
import TablesTemplate from "@/Components/TablesTemplate";
import FinanceHeader from "@/Components/FinanceHeader";
import Navbar from "@/layout/Navbar";
import NavbarIcons from "@/Components/navbar-components/NavbarIcons";
import { STUDENT_PAYMENTS } from "@/adapters/Queries/student/studentPayments";
import { converMillisecondsToDateSecond } from "@/CustomHooks/convertMillisecondsToDate";
import { SearchIcon } from "@/assets/icons";

const Payments = () => {
  const [paymentsData, setPaymentsData] = useState([]);
  const [paymentsError, setPaymentsError] = useState();
  const [paymentsLoading, setPaymentsLoading] = useState();
  const client = useApolloClient();

  const heading = useMemo(
    () => ["№", "F.I.O", "Yaratilgan", "To'lov turi", "Summa"],
    []
  );

  const filterDate = useCallback(
    async (start, end) => {
      try {
        const { data, error, loading } = await client.query({
          query: STUDENT_PAYMENTS,
          variables: {
            id: " ",
            type: 1,
            startDate: start,
            endDate: end,
          },
        });

        const changeDate = data?.studentPayments?.studentCash.map((student) => {
          return {
            studentName: student.studentName,
            createdAt: converMillisecondsToDateSecond(student.createdAt),
            paymentType: student?.paymentType === "1" ? "Naqt pul" : "Plastik",
            cashAmount: student.cashAmount,
          };
        });

        setPaymentsData(changeDate);
        setPaymentsError(error);
        setPaymentsLoading(loading);
      } catch (error) {
        console.log(error);
      }
    },
    [setPaymentsData, setPaymentsError, setPaymentsLoading, client]
  );

  let today = new Date();

  // 30 kunlik davrning birinchi kuni (bugungi kun)
  useEffect(() => {
    let firstDay = new Date(today);

    // 30 kunlik davrning oxirgi kuni (bugundan boshlab 30-kun)
    let lastDay = new Date(today);
    lastDay.setDate(today.getDate() - 30); // bugun kirdi hisoblanib 30-kun
    filterDate(firstDay, lastDay);
  }, []);
  return (
    <>
      <Navbar>
        <h2 className="text-[26px] leading-8 font-medium text-black ">
          Moliya
        </h2>
        <div className="flex items-center">
          <NavbarIcons>
            <li className="mr-[15px]">
              <SearchIcon />
            </li>
          </NavbarIcons>
        </div>
      </Navbar>
      <div className="w-full bg-white pl-[10px] pr-[47px] rounded-[8px]">
        <FinanceHeader filterDatePayments={filterDate} />
        <div className="w-full h-[600px]">
          <Chart />
        </div>
      </div>
      <div className="mt-[57px]">
        <TablesTemplate
          headings={heading}
          sections={paymentsData}
          error={paymentsError}
          loading={paymentsLoading}
          idFieldName={"studentCashId"}
          dataException1={"studentId"}
          dataException2={"employerName"}
          dataException3={"checkNumber"}
          dataException4={"payedAT"}
        />
      </div>
    </>
  );
};

export default Payments;
