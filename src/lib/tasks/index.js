export const identifyStatus = (endDate) => {
  const current = new Date();

  const intEndDate = new Date(parseInt(endDate));

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;

  if (intEndDate - current < 0) {
    return "undone";
  }
  if (intEndDate - current < oneDayInMilliseconds) {
    return "today";
  }
  if (intEndDate - current < sevenDaysInMilliseconds) {
    return "inweek";
  }
  return "outweek";
};

export const convertDateToHoursAndMins = (date) => {
  if (!date) return null;
  const parsedDate = new Date(parseInt(date));
  const hours = parsedDate.getHours().toString().padStart(2, "0");
  const minutes = parsedDate.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
  return time;
};
