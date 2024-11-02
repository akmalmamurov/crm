import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";

const FormDateTime = (props) => {
  const {
    labelValue,
    value,
    name,
    onChange,
    minDate,
    maxDate,
    disabled,
    validationErrors,
    validationTouched,
    required,
  } = props;
  return (
    <div className="px-[13px] mb-[10px]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex flex-col mb-[10px]">
          <label className="text-[13px] leading-[16px] tracking-[0.12px] text-formRgba mb-[4px]">
            {labelValue}{" "}
            <span
              className={`${
                required ? "inline" : "hidden"
              } ml-[2px] text-formRed`}
            >
              *
            </span>
          </label>

          <DateTimePicker
            value={value}
            name={name}
            onChange={onChange}
            format="DD-MM-YYYY HH-mm"
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            ampm={false}
            slotProps={{
              popper: { placement: "auto" },
              openPickerIcon: { fontSize: "small" },
              textField: {
                error: false,
                focused: false,
                sx: {
                  "&:hover .MuiSvgIcon-root": {
                    color: "#116DE1",
                  },
                },
              },
            }}
          />
          {Boolean(validationErrors[name]) &&
          Boolean(validationTouched[name]) ? (
            <span className="text-red text-[13px] leading-[16px] tracking-[0.12px]">
              {validationErrors[name]}
            </span>
          ) : (
            ""
          )}
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default FormDateTime;
