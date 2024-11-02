export const findMonthNameFromIndex = (number) => {
  number = number < 0 ? 11 : number % 12;

  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return allMonths[number];
};
