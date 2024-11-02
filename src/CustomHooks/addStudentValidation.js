export const addStudentValidation = (currentDate, minDate, maxDate) => {
  const minFullYear = minDate.getFullYear();
  const minMonth = minDate.getMonth();
  const minDay = minDate.getDate();

  const maxFullYear = maxDate.getFullYear();
  const maxMonth = maxDate.getMonth();
  const maxDay = maxDate.getDate();

  if (
    currentDate.getFullYear() < minFullYear ||
    (maxMonth >= minMonth
      ? currentDate.getMonth() < minMonth || currentDate.getMonth() > maxMonth
      : (currentDate.getMonth() < minMonth &&
          currentDate.getFullYear() === minFullYear) ||
        (currentDate.getMonth() > maxMonth &&
          currentDate.getFullYear() === maxFullYear)) ||
    (currentDate.getMonth() === minMonth && currentDate.getDate() < minDay) ||
    currentDate.getFullYear() > maxFullYear ||
    (currentDate.getMonth() === maxMonth && currentDate.getDate() > maxDay)
  ) {
    return "Select a valid day, month, year";
  }
};
