import { useState } from "react";

const useForm = (initialValues) => {
  const [inputValues, setInputValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValues({ ...inputValues, [name]: value });
  };

  const resetForm = () => {
    setInputValues(initialValues);
  };

  return [inputValues, handleChange, resetForm, setInputValues];
};

export default useForm;
