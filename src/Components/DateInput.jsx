import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useSelector } from "react-redux";

const DateInput = (props) => {
  const { labelValue, value, name, onChange, minDate, maxDate } = props;
  const {sidenavType,theme} = useSelector((state)=> state.theme);
  const currentColor = theme[sidenavType]
  return (
    <div className="min-w-[240px] xl:min-w-[390px] mr-[10px]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex flex-col items-start">
          <label className={`text-[14px] ${currentColor.text} mb-1`}>{labelValue}</label>
          <DatePicker
            value={value}
            name={name}
            onChange={onChange}
            format="DD-MM-YYYY"
            minDate={minDate}
            maxDate={maxDate}
            slotProps={{
              openPickerIcon: { fontSize: "small" },
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
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default DateInput;
