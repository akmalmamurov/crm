// CHECKING THE DAYS EITHER EVEN OR ODD

export const checkingDaysEvenOrOdd = (days) => {
  const weekDays = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];
  let filteredDays;
  const daySunday = days.includes(0);
  if (daySunday) {
    filteredDays = days.filter((day) => day !== "0");
  } else {
    filteredDays = days;
  }

  const evenDays = filteredDays.filter((day) => day % 2 === 0);
  const oddDays = filteredDays.filter((day) => day % 2 !== 0);

  if (evenDays.length === 3 && oddDays.length === 3) {
    if (daySunday) {
      return "Juft kunlar, Toq kunlar va Yakshanba";
    } else {
      return "Juft kunlar va Toq kunlar";
    }
  } else if (evenDays.length === 3) {
    const arrWeekNames =
      oddDays.length > 0 ? oddDays.map((day) => weekDays[day]) : "";
    const strWeekNames = arrWeekNames ? arrWeekNames.join(", ") : "";
    if (daySunday) {
      return `Juft kunlar, ${strWeekNames}, Yakshanba`;
    } else {
      return `Juft kunlar, ${strWeekNames}`;
    }
  } else if (oddDays.length === 3) {
    const arrWeekNames =
      evenDays.length > 0 ? evenDays.map((day) => weekDays[day]) : "";
    const strWeekNames = arrWeekNames ? arrWeekNames.join(", ") : "";
    if (daySunday) {
      return `Toq kunlar, ${strWeekNames}, Yakshanba`;
    } else {
      return `Toq kunlar, ${strWeekNames}`;
    }
  } else {
    const arrWeekNames = filteredDays.map((day) => weekDays[day]);
    const strWeekNames = arrWeekNames.join(", ");
    if (daySunday) {
      return `${strWeekNames}, Yakshanba`;
    } else {
      return `${strWeekNames}`;
    }
  }
};
