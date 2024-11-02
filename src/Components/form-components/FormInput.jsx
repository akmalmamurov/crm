import useCurrentColor from "@/hooks/useCurrentColor";

const FormInput = (props) => {
  const currentColor = useCurrentColor();
  const {
    type,
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
        className={`text-[13px] leading-[16px] tracking-[0.12px] ${currentColor.inputText} mb-[4px]`}
      >
        {labelValue}
        <span
          className={`${required ? "inline" : "hidden"} ml-[2px] text-formRed`}
        >
          *
        </span>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={inputValue}
        // className={`${
        //   Boolean(validationError[name]) ? "border-red" : "border-formRgba"
        // } border border-formRgba  rounded-[7px] h-[32px] outline-none px-[10px] py-[7px] text-black text-[13px] leading-[16px] tracking-[0.12px]`}
        className={`border ${currentColor.inputBorder} ${currentColor.bg} rounded-[7px] h-[32px] outline-none px-[10px] py-[7px] placeholder:${currentColor.inputText} text-[13px] ${currentColor.inputText} leading-[16px] tracking-[0.12px] focus-within:ring-2 focus-within:ring-inset focus:border-blueTifany focus:outline-none focus:${currentColor.text} `}
        placeholder={inputPlaceholder}
        {...args}
      />
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
export default FormInput;
