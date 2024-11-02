import React from "react";

const FormCheckbox = ({
  labelValue,
  checkboxId,
  checkboxName,
  checkboxValue,
  setCheckboxValue,
}) => {
  return (
    <label
      htmlFor={checkboxId}
      className="relative flex justify-between items-center px-[6px] py-[8px] cursor-pointer text-[13px] leading-[16px] tracking-[0.12px] text-black select-none hover:bg-[#f0f0f0] duration-150"
    >
      {labelValue}
      <input
        type="checkbox"
        name={checkboxName}
        id={checkboxId}
        checked={checkboxValue?.includes(checkboxName)}
        onChange={(e) => {
          if (e.target.checked) {
            setCheckboxValue((prevState) => [...prevState, e.target.name]);
          } else {
            setCheckboxValue((prevState) =>
              prevState.filter((item) => item !== e.target.name)
            );
          }
        }}
        className="relative cursor-pointer shrink-0 appearance-none after:absolute after:h-[13px] after:w-[7px] after:border-[3px] after:border-white after:left-2/4 after:translate-x-[-50%] after:border-t-0 after:border-l-0 after:rotate-45 after:bg-tranparent rounded-[3px] w-[18px] h-[18px] bg-formRgba outline-none focus:border-0  focus:ring-formRgba checked:focus:ring-blueTifany focus:ring-2 checked:bg-checkBoxColor checked:border-0 checked:after:absolute checked:after:left-2/4 checked:after:translate-x-[-50%] checked:after:block checked:after:h-[13px] checked:after:w-[7px] checked:after:rotate-45 checked:after:border-[3px] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent"
      />
    </label>
  );
};

export default FormCheckbox;
