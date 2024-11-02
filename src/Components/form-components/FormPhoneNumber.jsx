import useCurrentColor from "@/hooks/useCurrentColor";
import { PatternFormat } from "react-number-format";

const FormPhoneNumber = (props) => {
  const {
    labelValue,
    name,
    inputValue,
    numberFormat,
    onChange,
    validationError,
    validationTouch,
    className,
    required,
    ...args
  } = props;
const currentColor = useCurrentColor();
  return (
    <div className="px-[13px] flex flex-col mb-[10px]">
      <label
        htmlFor={name}
        className={`text-[13px] leading-[16px] tracking-[0.12px] ${currentColor.text} mb-[4px]`}
      >
        {labelValue}
        <span
          className={`${required ? "inline" : "hidden"} ml-[2px] text-formRed`}
        >
          *
        </span>
      </label>
      <PatternFormat
        type="text"
        id={name}
        name={name}
        value={inputValue}
        onValueChange={onChange}
        format={numberFormat}
        allowEmptyFormatting
        autoComplete="off"
        className={` rounded-md focus-within:ring-2 focus-within:ring-inset focus:border-blueTifany focus:outline-none w-full ${className}`}
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

export default FormPhoneNumber;
