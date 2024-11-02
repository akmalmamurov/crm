import { useState } from "react";
import Chevron from "../assets/icons/chevron.svg";

const NotificationAccardion = ({ item: { title, text, date, time } }) => {
  const [accardionOpen, setAccardionOpen] = useState(false);
  return (
    <div className="flex items-start">
      <span className="inline-block h-[28px] w-[28px] bg-blueTifany rounded-full mr-2"></span>
      <div className="w-[90%] text-black mb-1 relative group">
        <h4 className="text-[15px] font-semibold p-0 m-0">{title}</h4>
        <div>
          {!accardionOpen ? (
            <p className="text-[10px] leading-[12px] tracking-[0.12px] mb-1 transition-all duration-300">
              {text.slice(0, 50)}...
            </p>
          ) : (
            <p className="h-auto text-[10px] leading-[12px] tracking-[0.12px] mb-3 transition-all duration-300">
              {text}
            </p>
          )}

          <div className="w-full flex items-center justify-between">
            <button className="transition-all duration-150 group-focus:-rotate-180">
              <img
                src={Chevron}
                alt="chevron icon"
                onClick={() =>
                  accardionOpen
                    ? setAccardionOpen(false)
                    : setAccardionOpen(true)
                }
                className={
                  accardionOpen
                    ? "-rotate-90 h-[14px] w-[14px] duration-300"
                    : "rotate-90 h-[14px] w-[14px] duration-300"
                }
              />
              <h2>fasdfsaasdfasdfasdfasdfasdfasdf</h2>
            </button>
            <h6 className="text-[10px] inline-block ml-auto leading-3 tracking-[0.12px] text-black font-semibold">
              {date} <span>{time}</span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationAccardion;
