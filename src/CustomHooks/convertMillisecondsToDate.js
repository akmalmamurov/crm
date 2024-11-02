// CONVERTING MILLI SECONDS TO THE DAYS, MONTHS, YEARS

export const convertMillisecondsToDate = (milliseconds) => {
  if (!milliseconds) return null;
  const convertStringToNumber = parseInt(milliseconds);
  const date = new Date(convertStringToNumber);

  const dayMonthYear = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}.${
    date.getMonth() + 1 < 10 ? "0" : ""
  }${date.getMonth() + 1}.${date.getFullYear()}`;

  return dayMonthYear;
};

export const converMillisecondsToDateSecond = (milliseconds) => {
  const convertStringToNumber = parseInt(milliseconds);
  const date = new Date(convertStringToNumber);

  const dayMonthYear = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" : ""
  }${date.getMonth() + 1}-${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;

  return dayMonthYear;
};
