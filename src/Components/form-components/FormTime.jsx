import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";

const FormTime = (props) => {
  const {
    labelValue,
    value,
    name,
    onChange,
    validationErrors,
    validationTouched,
  } = props;
  const {sidenavType, theme} = useSelector((state)=> state.theme)
const currentColor = theme[sidenavType];
  return (
    <div className="px-[13px] mb-[10px] flex flex-col">
      {labelValue ? (
        <label className={`text-[13px] leading-[16px] tracking-[0.12px] ${currentColor.inputText} mb-[4px]`}>
          {labelValue} <span className="text-formRed">*</span>
        </label>
      ) : (
        <span className="mb-[19px]"></span>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex flex-col">
          <TimeField
            value={value}
            name={name}
            onChange={onChange}
            format="HH:mm"
            slotProps={{
              textField: {
                error: false,
                focused: false,
                sx: {
                  "& .MuiOutlinedInput-root": {
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

export default FormTime;
