const FormTextarea = (props) => {
  const {
    labelValue,
    inputValue,
    name,
    inputPlaceholder,
    validationError,
    validationTouch,
    required,
    ...args
  } = props;

  return (
    <div className="px-[13px] flex flex-col mb-[10px]">
      <label
        htmlFor={name}
        className="text-[13px] leading-[16px] tracking-[0.12px] text-formRgba mb-[4px]"
      >
        {labelValue}
        <span
          className={`${required ? "inline" : "hidden"} ml-[2px] text-formRed`}
        >
          *
        </span>
      </label>
      <textarea
        cols="30"
        rows="10"
        id={name}
        name={name}
        value={inputValue}
        // className={`${
        //   Boolean(validationError[name]) ? "border-red" : "border-formRgba"
        // } border border-formRgba  rounded-[7px] h-[32px] outline-none px-[10px] py-[7px] text-black text-[13px] leading-[16px] tracking-[0.12px]`}
        className="border border-formRgba rounded-[7px] h-[70px] outline-none px-[10px] py-[7px] text-formRgba text-[13px] leading-[16px] tracking-[0.12px] focus-within:ring-2 focus-within:ring-inset focus:border-blueTifany focus:outline-none focus:text-black"
        placeholder={inputPlaceholder}
        {...args}
      ></textarea>
      {Boolean(validationError[name]) && Boolean(validationTouch[name]) ? (
        <span className="text-red text-[13px] leading-[16px] tracking-[0.12px]">
          {validationError[name]}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default FormTextarea;
