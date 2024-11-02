import { memo, useState } from "react";
import Chevron from "../../assets/icons/chevron-down.svg";
import ChevronWhite from "../../assets/icons/chevron-down-white.svg";
import SelectDaysConfiguration from "../Groups/SelectDaysConfiguration";
import useCurrentColor from "@/hooks/useCurrentColor";
import { useSelector } from "react-redux";
import { useTranslation } from "@/hooks";

const FormSelect = memo(
  ({
    labelValue,
    name,
    selectedOption,
    setSelectedOption,
    selectOptionsData,
    validationError,
    validationTouch,
    required,
  }) => {
    const [openSelectOptions, setOpenSelectOptions] = useState(false);
    const [openDaysConfigurationModal, setOpenDaysConfigurationModal] =
      useState(false);
    const [checkboxValue, setCheckboxValue] = useState([]);
    const { sidenavType, theme } = useSelector((state) => state.theme);
    const currentColor = theme[sidenavType];
    const t = useTranslation();
    const handleClick = (item) => {
      setSelectedOption((prevState) => ({
        ...prevState,
        [name]: item,
      }));
      setCheckboxValue([]);
      setOpenSelectOptions(false);
      setOpenDaysConfigurationModal(false);
    };

    return (
      <div
        className={`relative px-[13px] flex flex-col mb-[10px] ${currentColor.bg}`}
      >
        <SelectDaysConfiguration
          showConfigurationModal={openDaysConfigurationModal}
          setOpenDaysConfigurationModal={setOpenDaysConfigurationModal}
          checkboxValue={checkboxValue}
          setCheckboxValue={setCheckboxValue}
          setSelectedOption={setSelectedOption}
        />

        <label
          className={`text-[13px] leading-[16px] tracking-[0.12px] ${currentColor.inputText} mb-[4px]`}
        >
          {labelValue}
          <span
            className={`${
              required ? "inline" : "hidden"
            } ml-[2px] text-formRed`}
          >
            *
          </span>
        </label>

        <button
          type="button"
          name={name}
          onClick={() => setOpenSelectOptions(!openSelectOptions)}
          className={`${
            openSelectOptions
              ? `rounded-b-none ${currentColor.selectBorder}` /* Boolean(validationError[name])
            ? "border-red"
            : */
              : `${currentColor.inputBorder}`
          } flex justify-between items-center px-[10px] py-[7px] duration-200 bg-transparent border border-solid rounded-[7px]`}
        >
          <span
            className={`${
              openSelectOptions
                ? `${currentColor.inputText}`
                : `${currentColor.inputText}`
            } text-[13px] leading-[16px] tracking-[0.12px]`}
          >
            {selectedOption === checkboxValue
              ? checkboxValue.join(", ")
              : selectedOption}
          </span>
          <img
            className={`${
              openSelectOptions ? "rotate-[-180deg]" : "rotate-0"
            } duration-200`}
            src={`${sidenavType === "white" ? Chevron : ChevronWhite}`}
            alt="Accordion icon"
            width={"17px"}
            height={"17px"}
          />
        </button>

        {openSelectOptions ? (
          <ul
            className={`flex ${currentColor.selectBorder} flex-col items-start border border-solid max-h-[105px] overflow-y-auto border-t-0 rounded-b-[7px] last:rounded-b-[7px]`}
          >
            {selectOptionsData.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    if (item === "Boshqa kunlar") {
                      setOpenDaysConfigurationModal(true);
                      setOpenSelectOptions(false);
                    } else {
                      handleClick(item);
                    }
                  }}
                  className={`block w-full py-[5px] px-[10px] text-[13px] leading-[16px] tracking-[0.12px] cursor-pointer hover:bg-lightestBlack last:rounded-b-[7px] ${currentColor.text}`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        ) : (
          ""
        )}

        {Boolean(!openSelectOptions) ? (
          Boolean(validationError[name]) && Boolean(validationTouch[name]) ? (
            <span className="text-red text-[13px] leading-[16px] tracking-[0.12px]">
              {validationError[name]}
            </span>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
export default FormSelect;
