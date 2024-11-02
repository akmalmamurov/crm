import FormCheckbox from "../form-components/FormCheckbox";

const SelectDaysConfiguration = ({
  showConfigurationModal,
  setOpenDaysConfigurationModal,
  checkboxValue,
  setCheckboxValue,
  setSelectedOption,
}) => {
  const weekDays = [
    {
      id: "Sunday",
      day: "Yakshanba",
      name: "Yakshanba",
    },
    {
      id: "Monday",
      day: "Dushanba",
      name: "Dushanba",
    },
    {
      id: "Tuesday",
      day: "Seshanba",
      name: "Seshanba",
    },
    {
      id: "Wednesday",
      day: "Chorshanba",
      name: "Chorshanba",
    },
    {
      id: "Thursday",
      day: "Payshanba",
      name: "Payshanba",
    },
    {
      id: "Friday",
      day: "Juma",
      name: "Juma",
    },
    {
      id: "Saturday",
      day: "Shanba",
      name: "Shanba",
    },
  ];

  return showConfigurationModal ? (
    <div className="absolute z-20 top-[-270px] flex flex-col w-[200px] p-[3px] bg-white border border-formRgba rounded-[6px]">
      {weekDays.map((weekDay) => {
        return (
          <FormCheckbox
            key={weekDay.id}
            checkboxId={weekDay.id}
            checkboxName={weekDay.name}
            labelValue={weekDay.day}
            checkboxValue={checkboxValue}
            setCheckboxValue={setCheckboxValue}
          />
        );
      })}
      <div className="flex justify-between p-2 gap-4 ">
        <button
          type="button"
          className="px-[10px] py-[5px] text-[13px] leading-4 tracking-[0.12px]  bg-whiteBtn rounded-[7px] text-black duration-200 hover:bg-lightestBlack"
          onClick={() => {
            setCheckboxValue([]);
            setSelectedOption((prevState) => ({
              ...prevState,
              dayTypes: "Tanlang",
            }));
            setOpenDaysConfigurationModal(false);
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          className=" px-[10px] text-[13px] leading-4 tracking-[0.12px]  bg-blueTifany rounded-[7px] text-white duration-200 hover:opacity-85 disabled:opacity-75"
          disabled={!checkboxValue.length}
          onClick={() => {
            setSelectedOption((prevState) => ({
              ...prevState,
              dayTypes: checkboxValue.join(", "),
            }));
            setOpenDaysConfigurationModal(false);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default SelectDaysConfiguration;
