import React from "react";
import Trash from "../../assets/icons/trash.svg";

const EditingOffcanvas = ({ addClassName }) => {
  return (
    <div
      className={`fixed z-30 bottom-0 right-0 w-full ${
        addClassName ? "translate-y-0" : "translate-y-[51px]"
      } duration-200 flex justify-end gap-[14px] px-[80px] bg-white text-black`}
    >
      <p className="relative flex justify-center py-[12px] px-[5px] text-[15px] font-semibold leading-[22.5px] tracking-[1.22px] uppercase cursor-pointer before:absolute before:top-0 before:bg-leadEditingColor1 before:h-[5px] before:w-full before:rounded-t-[0] before:rounded-b-[8px]">
        не реализована
      </p>
      <p className="relative flex justify-center py-[12px] px-[5px] text-[15px] font-semibold leading-[22.5px] tracking-[1.22px] uppercase cursor-pointer before:absolute before:top-0 before:bg-leadEditingColor2 before:h-[5px] before:w-full before:rounded-t-[0] before:rounded-b-[8px]">
        успешно завершена
      </p>
      <span className="relative flex justify-center order-[-1] w-[87px] py-[12px] px-[5px] cursor-pointer before:rounded-t-[0] before:rounded-b-[8px] before:absolute before:top-0 before:bg-red before:h-[5px] before:w-full">
        <img
          className="w-[23px] h-[27px]"
          src={Trash}
          alt="Trash for unnecessary leads"
        />
      </span>
    </div>
  );
};

export default EditingOffcanvas;
