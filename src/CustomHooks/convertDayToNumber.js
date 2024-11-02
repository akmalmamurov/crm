// CONVERTING WEEKDAY NAMES INTO THEIR ORDINAL NUMBERS

export const convertingWeekdayNamesToOrdinalNumbers = (weekdayNames) => {
  const daysWithIndexes = {
    Yakshanba: 0,
    Dushanba: 1,
    Seshanba: 2,
    Chorshanba: 3,
    Payshanba: 4,
    Juma: 5,
    Shanba: 6,
  };
  if (weekdayNames === "Toq kunlar") {
    return [1, 3, 5];
  }
  if (weekdayNames === "Juft kunlar") {
    return [2, 4, 6];
  }

  const makeWeekdayNamesArray = weekdayNames.split(", ");
  return makeWeekdayNamesArray.map((weekName) => daysWithIndexes[weekName]);
};
