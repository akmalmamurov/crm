import { memo, useEffect, useState } from "react";
import Chevron from "@/assets/icons/chevron-down.svg";
import useCurrentColor from "@/hooks/useCurrentColor";

const FormSelectSearch = memo(
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
    const [selectSearch, setSelectSearch] = useState("");
    const [filteredGroupItems, setFilteredGroupItems] = useState("");
    const currentColor = useCurrentColor();
    const handleClick = (item) => {
      setSelectedOption((prevState) => ({
        ...prevState,
        [name]: item,
      }));
      setOpenSelectOptions(false);
    };

    const handleKeyEnter = (e) => {
      if (e.key === "Enter") {
        setSelectedOption((prevState) => ({
          ...prevState,
          [name]: e.target.value,
        }));
        setOpenSelectOptions(false);
      }
    };

    useEffect(() => {
      if (selectSearch === "") {
        setFilteredGroupItems(selectOptionsData);
      } else {
        setFilteredGroupItems(
          selectOptionsData.filter(
            (item) =>
              item.toLowerCase().slice(0, selectSearch.length) ===
              selectSearch.toLowerCase()
          )
        );
      }

      // eslint-disable-next-line
    }, [selectSearch, selectOptionsData]);

    return (
      <div className="relative px-[13px] flex flex-col mb-2.5">
        <label className={`text-[13px] leading-[16px] tracking-[0.12px] ${currentColor.text} mb-1`}>
          {labelValue}
          <span
            className={`${
              required ? "inline" : "hidden"
            } ml-[2px] text-formRed`}
          >
            *
          </span>
        </label>

        <div
          className={`${
            openSelectOptions
              ? `rounded-b-none ${currentColor.selectBorder}`
              : `${currentColor.inputBorder}`
          } flex justify-between items-center px-[10px] py-[7px] duration-200 bg-transparent border border-solid rounded-[7px] cursor-pointer`}
          onClick={() => setOpenSelectOptions(!openSelectOptions)}
        >
          <input
            type="text"
            name={name}
            readOnly={openSelectOptions ? "" : "readonly"}
            placeholder={openSelectOptions ? "Search..." : selectedOption}
            value={openSelectOptions ? selectSearch : selectedOption}
            onChange={(e) => setSelectSearch(e.target.value)}
            onKeyDown={handleKeyEnter}
            className={`${
              openSelectOptions ? currentColor.text : `${currentColor.inputText} cursor-pointer`
            } w-full text-[13px] leading-[16px] tracking-[0.12px] outline-none border-none bg-transparent`}
            autoComplete="off"
          />
          <img
            className={`${
              openSelectOptions ? "rotate-[-180deg]" : "rotate-0"
            } duration-200`}
            src={Chevron}
            alt="Accordion icon"
            width={"17px"}
            height={"17px"}
          />
        </div>

        {openSelectOptions ? (
          <ul className="flex flex-col items-start border border-solid max-h-[105px] overflow-y-auto border-t-0 rounded-b-[7px] last:rounded-b-[7px]">
            {filteredGroupItems?.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleClick(item)}
                  className="block w-full py-[5px] px-[10px] text-[13px] leading-[16px] tracking-[0.12px] cursor-pointer hover:bg-lightestBlack last:rounded-b-[7px]"
                >
                  <span className="bg-yellow">
                    {item.slice(0, selectSearch.length)}
                  </span>
                  {item.slice(selectSearch.length)}
                </li>
              );
            })}
          </ul>
        ) : (
          ""
        )}

        {!openSelectOptions ? (
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

FormSelectSearch.displayName = "FormSelectSearch";
export default FormSelectSearch;
