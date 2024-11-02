import { useState } from "react";
import Filter from "../assets/icons/filter-2.svg";
import DateInput from "./DateInput";
import dayjs from "dayjs";
import useCurrentColor from "@/hooks/useCurrentColor";

const FinanceHeader = ({ filterDatePayments}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [startDate, setStartDate] = useState(dayjs(""));
  const [endDate, setEndDate] = useState(dayjs(""));
const currentColor = useCurrentColor();
  const filterDate = () => {
    if (startDate && endDate) {
      const newStartDate = new Date(startDate).toDateString();
      const newEndaDate = new Date(endDate).toString();
      filterDatePayments(newStartDate, newEndaDate);
      console.log(newStartDate);
      console.log(newEndaDate);
    }
  };
  return (
    <div className="py-[19px] flex items-end flex-wrap">
      
      <DateInput
        labelValue={"Sanadan boshlanadi"}
        value={startDate}
        name={"startDate"}
        minDate={dayjs("1900-01-01")}
        maxDate={dayjs("2025-01-01")}
        onChange={(value) => {
          setStartDate(value);
        }}
      />

      <DateInput
        labelValue={"Sanagacha"}
        value={endDate}
        name={"endDate"}
        minDate={dayjs("1900-01-01")}
        maxDate={dayjs("2025-01-01")}
        onChange={(value) => {
          setEndDate(value);
        }}
      />
      <div className="relative w-[10%]">
        <button
          type="button"
          className="bg-blueTifany px-[10px] py-[9px] flex rounded-[6px] h-[34px]"
          onClick={() => {
            filterDate();
            setShowFilter(!showFilter);
          }}
        >
          <img src={Filter} alt="filter icon" className="w-[15px] h-[16px]" />
          <span className="ml-[4px] text-[14px] text-white font-normal text-center leading-[18px] tracking-[-0.23px]">
            Filter
          </span>
        </button>
      </div>
      <h3 className={`text-[24px]  leading-[28px] xl:text-right w-1/3`}>
        <span className={currentColor.text}>To'lovlar: 12 000 000 so'm</span>
      </h3>
    </div>
  );
};
export default FinanceHeader;
