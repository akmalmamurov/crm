// EXTRACT NUMBERS FROM STRINGS
export const extractNumberFromString = (str) => {
  const numberStr = str.replace(/\D/g, "");
  return parseInt(numberStr);
};

//REMOVE SPACES FROM STRING, CONVERT IT TO NUMBER AND FORMAT FOR READABILITY
export const removeSpaceCommaAndConvertStringToFloat = (str) => {
  const stringWithoutSpaces = str.replace(/[\s,]/g, "");
  const number = parseFloat(stringWithoutSpaces);

  return number;
};
