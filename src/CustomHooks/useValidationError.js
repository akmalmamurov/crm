const useValidateInputErrors = (
  inputValues,
  inputValuesErrors,
  selectValues,
  selectValuesErrors
) => {
  let errors = {};

  const inputObjectKeys = Object.keys(inputValues);
  const selectObjectKeys = Object.keys(selectValues);

  const inputErrorObjectKeys = Object.keys(inputValuesErrors);
  const selectErrorObjectKeys = Object.keys(selectValuesErrors);

  for (let i = 0; i < inputObjectKeys.length; i++) {
    if (inputValues[inputObjectKeys[i]].length < 4) {
      errors[inputObjectKeys[i]] = inputValuesErrors[inputErrorObjectKeys[i]];
    }
  }

  for (let i = 0; i < selectObjectKeys.length; i++) {
    if (selectValues[selectObjectKeys[i]] === "Tanlang") {
      errors[selectObjectKeys[i]] =
        selectValuesErrors[selectErrorObjectKeys[i]];
    }
  }

  return errors;
};

export default useValidateInputErrors;
