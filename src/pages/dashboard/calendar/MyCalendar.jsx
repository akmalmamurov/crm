import Navbar from "@/layout/Navbar";
import CalendarDays from "@/Components/calendar/CalendarDays";
import { useQuery } from "@apollo/client";
import { GET_CALENDAR } from "@/adapters/Queries/calendar/calendar";
import { useCallback, useEffect, useMemo, useState } from "react";
import ChevronButton from "@/Components/ChevronButton";
import { findMonthNameFromIndex } from "@/CustomHooks/findMonthNameFromIndex";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar, {
  ViewNamesGroup,
} from "@/Components/calendar/CustomToolbar";
import { findDayFromIndex } from "@/utils/findDayFromIndex";
import useCurrentColor from "@/hooks/useCurrentColor";

const calculateNewDate = (currentDate, direction, view) => {
  switch (view) {
    case "day":
      return direction === "PREV"
        ? localizer.add(currentDate, -1, "day")
        : localizer.add(currentDate, 1, "day");
    case "week":
      return direction === "PREV"
        ? localizer.add(currentDate, -1, "week")
        : localizer.add(currentDate, 1, "week");
    default:
      return currentDate;
  }
};

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = () => {
  const messages = {
    date: "Date",
    time: "Time",
    event: "Event",
    allDay: "All Day",
    week: "Week",
    work_week: "Work Week",
    day: "Day",
    month: "Month",
    previous: "Back",
    next: "Next",
    yesterday: "Yesterday",
    tomorrow: "Tomorrow",
    today: "Today",
    agenda: "Agenda",

    noEventsInRange: "There are no events in this range.",

    // showMore: (total, remainingEvents, events) => `+${total} más`,
  };

  const [view, setView] = useState("");

  const onView = useCallback((newView) => setView(newView), [setView]);
  const currentColor = useCurrentColor();
  const { views } = useMemo(
    () => ({
      views: ["week", "day"],
    }),
    []
  );

  const currentDate = new Date();
  const newStartDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const newEndDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const [startDate, setStartDate] = useState(newStartDate);
  const [endDate, setEndDate] = useState(newEndDate);
  const [activeDateButton, setActiveDateButton] = useState("Oy");
  const [date, setDate] = useState(new Date());
  const onNavigate = useCallback(
    (direction) => {
      setDate((currentDate) => calculateNewDate(currentDate, direction, view));
    },
    [view]
  );

  useEffect(() => {
    if (date.getMonth() !== startDate.getMonth()) {
      const updatedMonth = startDate.setMonth(date.getMonth());
      setStartDate(dayjs(updatedMonth).startOf("month").toDate());
      setEndDate(dayjs(updatedMonth).endOf("month").toDate());
    }
  }, [date, startDate]);
  console.log(startDate.getMonth());

  const { data: calendarData } = useQuery(GET_CALENDAR, {
    variables: {
      startDate: startDate,
      endDate: endDate,
    },
  });

  const handleRightClick = () => {
    const newStartDate = dayjs(startDate)
      .add(1, "month")
      .startOf("month")
      .toDate();
    const newEndDate = dayjs(newStartDate).endOf("month").toDate();
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setDate(newStartDate);
  };

  const handleLeftClick = () => {
    const newStartDate = dayjs(startDate)
      .subtract(1, "month")
      .startOf("month")
      .toDate();
    const newEndDate = dayjs(newStartDate).endOf("month").toDate();
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setDate(newStartDate);
  };

  const customizeLabel = (activeButton) => {
    let weekStart = dayjs(date).startOf("week").toDate();
    let weekEnd = dayjs(date).endOf("week").toDate();
    switch (activeButton) {
      case "Oy":
        return `${findMonthNameFromIndex(
          startDate.getMonth()
        )} - ${startDate.getFullYear()}`;
      case "week":
        return `${weekStart.getDate()} - ${weekEnd.getDate()} ${findMonthNameFromIndex(
          date.getMonth()
        )} ${date.getFullYear()}`;
      case "day":
        return `${findDayFromIndex(
          date.getDay()
        )} - ${date.getDate()} ${findMonthNameFromIndex(
          date.getMonth()
        )} ${date.getFullYear()}`;
      default:
        return;
    }
  };
  let updatedCalendarData = calendarData?.findCalendar;

  return (
    <>
      <Navbar navHeading={"Calendar"} />

      <section>
        <div className="flex items-center justify-end mb-8 ">
          <h2 className={`${currentColor.text} text-[35px] mx-auto leading-[42px]`}>
            {customizeLabel(activeDateButton)}
          </h2>
          <div className="flex items-end gap-3  ">
            <div className="flex flex-col items-center">
              <span className={`${currentColor.text}`}>
                {findMonthNameFromIndex(startDate.getMonth() - 1).slice(0, 3)}
              </span>
              <ChevronButton
                handleClick={() => {
                  if (
                    activeDateButton === "day" ||
                    activeDateButton === "week"
                  ) {
                    onNavigate("PREV");
                  } else {
                    handleLeftClick();
                  }
                }}
                ariaLabel={messages.previous}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className={currentColor.text}>
                {findMonthNameFromIndex(endDate.getMonth() + 1).slice(0, 3)}
              </span>
              <ChevronButton
                imgClassname={"rotate-180"}
                handleClick={() => {
                  if (
                    activeDateButton === "day" ||
                    activeDateButton === "week"
                  ) {
                    onNavigate("NEXT");
                  } else {
                    handleRightClick();
                  }
                }}
                ariaLabel={messages.next}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveDateButton("Oy");
                onView("");
              }}
              className={`py-2.5 px-5 rounded text-[16px] leading-4 duration-150 ${
                activeDateButton === "Oy"
                  ? "bg-blueTifany text-white"
                  : `${currentColor.bg} ${currentColor.text}`
              }`}
            >
              Oy
            </button>
            <ViewNamesGroup
              view={view}
              views={views}
              messages={messages}
              onView={onView}
              setMonthButton={setActiveDateButton}
              currentColor={currentColor}
            />
          </div>
        </div>

        {activeDateButton === "Oy" && (
          <CalendarDays currentColor={currentColor} calendarData={updatedCalendarData} />
        )}

        {(activeDateButton === "week" || activeDateButton === "day") && (
          <Calendar
            date={date}
            localizer={localizer}
            views={views}
            view={view}
            components={{ toolbar: CustomToolbar }}
            onView={onView}
            onNavigate={onNavigate}
            className={`${currentColor.text} ${currentColor.bg}`}
          />
        )}
      </section>
    </>
  );
};

export default MyCalendar;
