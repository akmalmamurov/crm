import UploadImg from "@/assets/icons/upload.svg";
import { LogoIcon } from "@/assets/icons";

const FormUploadImg = ({
  labelValue,
  type,
  name,
  inputValue,
  valueChange,
  validationError,
  validationTouch,
  inputPlaceholder,
}) => {
  return (
    <div className="px-[13px] flex flex-col mb-[10px]">
      <label
        htmlFor={name}
        className="text-[13px] leading-[16px] tracking-[0.12px] text-formRgba mb-[4px]"
      >
        {labelValue}
        <span className={`ml-[2px] text-formRed`}>*</span>
      </label>
      <div className="flex items-center justify-between">
        <div className="border flex items-center justify-between w-[75%] border-formRgba  rounded-[7px] h-[32px] outline-none px-[10px] py-[7px] text-formRgba text-[13px] leading-[16px] tracking-[0.12px]">
          <input
            type={type}
            id={name}
            name={name}
            value={inputValue}
            placeholder={inputPlaceholder}
            onChange={valueChange}
            className="w-[80%]"
          />
          <img src={UploadImg} alt="upload image" className="" />
        </div>
        <div className="w-[54px] h-[54px] bg-graySecond rounded-full flex items-center justify-center">
         <LogoIcon/>
        </div>
      </div>
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

export default FormUploadImg;
