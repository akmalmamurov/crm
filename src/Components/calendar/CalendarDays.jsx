import { calendarDataProps } from "../../propTypes/calendarProps";
import MiniCalendarDays from "./MiniCalendarDays";

const CalendarDays = ({ calendarData,currentColor }) => {
  const days = ["Du", "Se", "Chor", "Pay", "Ju", "Sha", "Yak"];

  return (
    <>
      <div className="grid grid-cols-8 gap-[10px]">
        {days.map((item, idx) => {
          let firstDate = new Date(
            parseInt(calendarData && calendarData[0]?.date)
          ).getDay();
          firstDate = firstDate === 0 ? 7 : firstDate;
          const initialDays = firstDate && [...Array(firstDate - 1).keys()];
          return (
            <div key={idx} className="col-span-1">
              <div
                key={idx}
                className={`${currentColor.bg}  rounded-[4px] ${currentColor.text} text-[16px] leading-[19px] h-[30px] flex items-center justify-center mb-3`}
              >
                {item}
              </div>
              {initialDays
                ? initialDays.map((_, index) => {
                    return (
                      idx === index && (
                        <div
                          key={index}
                          className="bg-transparent [4px] w-[190px] h-[130px] mb-3"
                        ></div>
                      )
                    );
                  })
                : ""}
              {calendarData?.map((data) => {
                const calendarDate = new Date(parseInt(data.date));
                const calendarDay = calendarDate.getDate();
                const updatedCalendarDate = `${
                  calendarDay < 10 ? "0" : ""
                }${calendarDay}`;
                const firstGroupsData = data?.groups[0];

                return (
                  (calendarDate.getDay() === 0
                    ? 6
                    : calendarDate.getDay() - 1) === idx && (
                    <MiniCalendarDays
                      key={data.date}
                      firstGroupsData={firstGroupsData}
                      data={data}
                      updatedCalendarDate={updatedCalendarDate}
                    />
                  )
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
CalendarDays.propTypes = calendarDataProps;

export default CalendarDays;
