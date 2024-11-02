import { PatternFormat } from "react-number-format";


const FormPhone = ({labelValue, name, inputValue, validatorError, validationTouch, valueChange}) => {
  return (
    <div className="px-[13px] mb-[10px]">
      <label
        htmlFor={name}
        className="text-[13px] leading-[16px] tracking-[0.12px] text-formRgba mb-[4px] block"
      >
        {labelValue}
      </label>
      <PatternFormat
        autoComplete="off"
        type="text"
        name={name}
        id={name}
        format="+998 (##) ###-##-##"
        allowEmptyFormatting
        mask="_"
        value={inputValue}
        onValueChange={(values) => valueChange(values.value)}
        className="border border-formRgba w-full  rounded-[7px] h-[32px] outline-none px-[10px] py-[7px] text-formRgba text-[13px] leading-[16px] tracking-[0.12px]"
        required
      />
      {Boolean(validatorError[name]) && Boolean(validationTouch[name]) ? (
        <span className="text-red text-[13px] leading-[16px] tracking-[0.12px]">
          {validatorError[name]}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default FormPhone;
