import Payment from "../../assets/icons/payment.svg";
import Edit from "../../assets/icons/edit.svg";
import SMS from "../../assets/icons/SMS.svg";
import Trash from "../../assets/icons/trash.svg";

const ChangingData = () => {
  return (
    <ul className="flex flex-col gap-1 bg-white rounded-md max-w-[177px] absolute top-4 right-11 z-20 shadow-dropLight">
      <li className="flex items-center gap-2 rounded-t-md px-2 pt-2 cursor-pointer hover:bg-whiteThird">
        <img
          src={Edit}
          alt="edit"
          width={20}
          height={20}
          className="w-5 h-5  object-contain"
        />
        <span className="font-medium text-[15px] leading-[14px] tracking-[0.06px">
          Tahrirlash
        </span>
      </li>
      <li className="flex items-center gap-2 px-2 pt-2 cursor-pointer hover:bg-whiteThird ">
        <img
          src={Payment}
          alt="payment"
          width={20}
          height={20}
          className="w-5 h-5  object-contain"
        />
        <span className="font-medium text-[15px] leading-[14px] tracking-[0.06px]">
          To'lov
        </span>
      </li>
      <li className="flex items-center gap-2 px-2 pt-2 cursor-pointer hover:bg-whiteThird">
        <img
          src={SMS}
          alt="SMS"
          width={20}
          height={20}
          className="w-5 h-5  object-contain"
        />
        <span className="font-medium text-[15px] leading-[14px] tracking-[0.06px">
          SMS Yuborish
        </span>
      </li>
      <li className="flex items-center gap-2 p-2 cursor-pointer hover:bg-whiteThird rounded-b-[6px]">
        <img
          src={Trash}
          alt="trash"
          width={20}
          height={20}
          className="w-5 h-5  object-contain"
        />
        <span className="text-redFourth font-medium">O'chirish</span>
      </li>
    </ul>
  );
};

export default ChangingData;
