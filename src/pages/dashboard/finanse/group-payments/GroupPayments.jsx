import Navbar from "@/layout/Navbar";
import FinanceHeader from "@/Components/FinanceHeader";
import TablesTemplate from "@/Components/TablesTemplate";
import { useMemo } from "react";
import useCurrentColor from "@/hooks/useCurrentColor";

const GroupPayments = () => {
  const currentColor = useCurrentColor();
  const heading = useMemo(
    () => [
      "№",
      "Guruhlar",
      "O'qituvchilar",
      "Kurslar",
      "Oquvchilar soni",
      "Summa",
      "Chegirma",
      "Ummumiy summa",
    ],
    []
  );
  const table = [
    {
      id: "1",
      group: "Ing tili guruhi-2",
      teachers: "Odilov Qodirjon",
      course: "Ingliz tili",
      studetnCount: "12",
      price: "140 000",
      discount: "15 000",
      all: "140 000 000",
    },
    {
      id: "2",
      group: "Ing tili guruhi-2",
      teachers: "Odilov Qodirjon",
      course: "Ingliz tili",
      studetnCount: "12",
      price: "14 000 000",
      discount: "2 000 000",
      all: "140 000 000",
    },
    {
      id: "3",
      group: "Rus tili guruhi-2",
      teachers: "Odilov Qodirjon",
      course: "Rus tili",
      studetnCount: "30",
      price: "14 000 000",
      discount: "2 000 000",
      all: "140 000 000",
    },
    {
      id: "4",
      group: "Matematika guruhi-2",
      teachers: "Odilov Qodirjon",
      course: "Matematika",
      studetnCount: "12",
      price: "14 000 000",
      discount: "2 000 000",
      all: "140 000 000",
    },
    {
      id: "5",
      group: "Ing tili guruhi-2",
      teachers: "Odilov Qodirjon",
      course: "Ingliz tili",
      studetnCount: "12",
      price: "14 000 000",
      discount: "2 000 000",
      all: "140 000 000",
    },

    {
      id: "6",
      group: "Ing tili guruhi-2",
      teachers: "Odilov Qodirjon",
      course: "Ingliz tili",
      studetnCount: "12",
      price: "14 000 000",
      discount: "2 000 000",
      all: "140 000 000",
    },
    {
      id: "7",
      group: "Ing tili guruhi-2",
      teachers: "Odilov Qodirjon",
      course: "Ingliz tili",
      studetnCount: "12",
      price: "14 000 000",
      discount: "2 000 000",
      all: "140 000 000",
    },
    {
      id: "8",
      group: "Ing tili guruhi-2",
      teachers: "Odilov Qodirjon",
      course: "Ingliz tili",
      studetnCount: "12",
      price: "14 000 000",
      discount: "2 000 000",
      all: "140 000 000",
    },
    {
      id: "9",
      group: "Ing tili guruhi-2",
      teachers: "Odilov Qodirjon",
      course: "Ingliz tili",
      studetnCount: "12",
      price: "14 000 000",
      discount: "2 000 000",
      all: "140 000 000",
    },
    {
      id: "10",
      group: "Ing tili guruhi-2",
      teachers: "Odilov Qodirjon",
      course: "Ingliz tili",
      studetnCount: "12",
      price: "14 000 000",
      discount: "2 000 000",
      all: "140 000 000",
    },
  ];

  return (
    <>
      <Navbar navHeading={"Guruh to'lovlari"} searchIcon={true} docIcon={true} />

      <div className={`w-full ${currentColor.bg} pt-[10px] pl-[10px] pr-[55px]`}>
        <FinanceHeader />

        <TablesTemplate
          headings={heading}
          sections={table}
          visibleMore={true}
        />
      </div>
    </>
  );
};

export default GroupPayments;
