import CheckLogo from "../assets/icons/check-logo-icon.svg";
import { converMillisecondsToDateSecond } from "../CustomHooks/convertMillisecondsToDate";
const Check = ({ visibelModal, closeModal, data }) => {
  const createdDate = converMillisecondsToDateSecond(data?.createdAt);
  const paymentType = data?.paymentType === 1 ? "Plastik" : "Naqt Pul";
  return (
    <>
      <div
        data-name="overlay"
        className={`fixed top-[70px] bg-grayThird left-[80px] w-full h-screen z-20 ${
          visibelModal ? "fixed" : "hidden"
        }`}
      ></div>
      <div
        className={`fixed top-[15%] left-[35%] z-30 w-[414px] h-auto py-[36px] px-[32px] bg-white rounded-[6px] flex flex-col transition-all duration-150 ${
          visibelModal ? "visible" : "invisible opacity-0"
        }`}
      >
        <img
          src={CheckLogo}
          alt="check logo"
          className="w-[153px] h-[32px] mb-[20px] mx-auto"
        />
        <h4 className="text-center text-[15px] font-semibold leading-[18px] mb-[41px] uppercase">
          Payment
        </h4>
        <ul className="mb-[20vh]">
          <li className="flex items-center justify-between mb-[8px] last:mb-0 text-[15px] leading-[18px] font-medium">
            <span>Check number</span>
            <span>{data?.checkNumber}</span>
          </li>
          <li className="flex items-center justify-between mb-[8px] last:mb-0 text-[15px] leading-[18px] font-medium">
            <span>Full name</span>
            <span>{data?.studentName}</span>
          </li>
          <li className="flex items-center justify-between mb-[8px] last:mb-0 text-[15px] leading-[18px] font-medium">
            <span>Payment type</span>
            <span>{paymentType}</span>
          </li>
          <li className="flex items-center justify-between mb-[8px] last:mb-0 text-[15px] leading-[18px] font-medium">
            <span>Cashier</span>
            <span>{data?.employerName}</span>
          </li>
          <li className="flex items-center justify-between mb-[8px] last:mb-0 text-[15px] leading-[18px] font-medium">
            <span>Date</span>
            <span>{createdDate}</span>
          </li>
        </ul>
        <div className="grid grid-cols-2 gap-5">
          <button className="py-[22px] bg-graySecond border border-gray rounded-lg shadow-btnShadow text-[15px] font-medium leading-[18px] text-black">
            Chop etish
          </button>
          <button
            onClick={closeModal}
            className="py-[22px] bg-graySecond border border-gray rounded-lg shadow-btnShadow text-[15px] font-medium leading-[18px] text-black"
          >
            Berkitish
          </button>
        </div>
      </div>
    </>
  );
};

export default Check;
