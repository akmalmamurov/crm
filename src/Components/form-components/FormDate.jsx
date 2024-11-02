import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector } from "react-redux";

const FormDate = (props) => {
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

  const { sidenavType, theme } = useSelector((state) => state.theme);
  const currentColor = theme[sidenavType];

  return (
    <div className="px-[13px] mb-[10px]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex flex-col mb-[10px]">
          <label className={`text-[13px] leading-[16px] tracking-[0.12px] ${currentColor.inputText} mb-[4px]`}>
            {labelValue}{" "}
            <span
              className={`${
                required ? "inline" : "hidden"
              } ml-[2px] text-formRed`}
            >
              *
            </span>
          </label>
          <DatePicker
            value={value}
            name={name}
            onChange={onChange}
            format="DD-MM-YYYY"
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            slotProps={{
              textField: {
                error: false,
                focused: false,
                sx: {
                  "& .MuiOutlinedInput-root,MuiOutlinedInput-notchedOutline" : {
                    color: sidenavType === "white" ? "#3C3C3C" : "#fff",
                    "& fieldset": {
                      borderColor:
                        sidenavType === "white"
                          ? "#rgba(153, 153, 153, 1)"
                          : "#fff",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: sidenavType === "white" ? "#3C3C3C" : "#fff",
                  },
                  "& .MuiSvgIcon-root": {
                    color: sidenavType === "white" ? "#3C3C3C" : "#fff",
                  },
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

export default FormDate;
