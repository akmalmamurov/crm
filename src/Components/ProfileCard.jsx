import Dollar from "@/assets/icons/dollar-sign-circle.svg";
import { memo } from "react";
import ArrowClock from "@/assets/icons/arrow-clockwise.svg";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditProfileIcon } from "@/assets/icons";
import Shimmer from "./loading/Shimmer";

const ProfileCard = memo((props) => {
  // const [infoVisible, setInfoVisible] = useState(true);
  const navigate = useLocation().pathname;
  const { id } = useParams();
  const { sidenavType, theme } = useSelector((state) => state.theme);
  const currentColor = theme[sidenavType];
  const {
    loading,
    error,
    imageSource,
    imageAlt,
    informationAbout,
    cardTitle,
    cardSubtitle,
    cardListInfoTitle,
    neccessaryProfileCardInfo,
    profileInfo,
    visibleCheck,
    visibleReturnCashForm,
  } = props;
  const numbers = [...Array(8).keys()];

  return (
    <div
      className={`self-start px-[14px] xl:px-[20px] py-[14px] xl:py-[24px] ${
        sidenavType === "white" ? "bg-white" : "bg-darkBg"
      } rounded-[6px] shadow-md`}
    >
      <div className="flex items-center mb-4 xl:mb-10">
        <div className="w-[45px] h-[45px] xl:w-[50px] xl:h-[50px]  bg-blueTifany rounded-md py-[13px] mr-[10px]">
          <img
            src={imageSource}
            alt={imageAlt}
            className="w-[20px] h-[20px] xl:w-[25px] xl:h-[25px] mx-auto"
          />
        </div>
        <div className="flex-1 grid grid-cols-2">
          {loading && <Shimmer otherClasses={"h-4 my-2.5"} />}
          {!loading && !error && (
            <h3
              className={`text-base capitalize xl:text-[17px] font-medium leading-[22px] ${currentColor.text}`}
            >
              {cardTitle}
            </h3>
          )}
          <button className="justify-self-end">
            <EditProfileIcon className={`w-5 h-5  ${currentColor.text}`} />
          </button>
          {loading && <Shimmer otherClasses={"h-4 my-2.5"} />}
          {!loading && !error && (
            <span className="text-blueTifany text-[13px] leading-4">
              {cardSubtitle}
            </span>
          )}
        </div>
      </div>

      <div className="py-1 ">
        <div
          className={`${
            sidenavType === "white"
              ? "bg-white border-white"
              : "bg-borderWhite border-[#FFFFFF1A]"
          } rounded-[8px] border-[1.5px]`}
        >
          {/* TITLE */}
          <div className="flex items-center justify-between py-2 px-3">
            <h2
              className={`text-xs xl:text-[15px] font-semibold leading-[17px] ${currentColor.text}`}
            >
              {informationAbout}
            </h2>
          </div>

          {/* INFORMATION */}
          <ul className="transition-all duration-200 ease-linear mt-[15px] h-auto ">
            <div className="grid grid-cols-2 gap-x-4">
              {loading &&
                numbers.map((_, index) => (
                  <div
                    key={index}
                    className="h-[16px] my-[10px] rounded-md w-full bg-[#bab9ba] relative before:absolute  overflow-hidden before:top-0 before:left-0  before:inset-0 before:-translate-x-full before:bg-custom-gradient before:animate-[shimmer_1.5s_infinite]"
                  ></div>
                ))}
            </div>
            {!loading &&
              !error &&
              cardListInfoTitle.map((listInfo, index) => (
                <li
                  key={listInfo}
                  className={`flex items-center justify-between border-b ${
                    sidenavType === "white"
                      ? "border-white"
                      : "border-borderWhite"
                  } px-3 text-xs xl:text-[13px] leading-4 py-[8px]`}
                >
                  <p className={` font-semibold ${currentColor.text}`}>
                    {listInfo}
                  </p>
                  <p className={`${currentColor.text}`}>
                    {profileInfo[neccessaryProfileCardInfo[index]]}
                  </p>
                </li>
              ))}
          </ul>
        </div>
        {/* BUTTONS */}
        <div
          className={`grid grid-cols-2 gap-x-[10px] mt-10 ${
            navigate === `/students/${id}` ? "" : "hidden"
          }`}
        >
          <button
            onClick={visibleCheck}
            className="bg-greenThird h-[34px] text-white flex items-center justify-center py-[8px] 
             rounded-md text-xs xl:text-[15px] leading-[17px] hover:opacity-35"
          >
            <img
              src={Dollar}
              alt="dollar icon"
              className="mr-2 w-[15px h-[15px]"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            To'lov
          </button>
          <button
            onClick={visibleReturnCashForm}
            className="bg-red text-white flex items-center justify-center py-[8px] px-[10px]
             rounded-md text-xs xl:text-[15px] leading-[17px] hover:opacity-35"
          >
            <img
              src={ArrowClock}
              alt="arrow icon"
              className="mr-1 w-[15px h-[15px]"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            To'lovni qaytarish
          </button>
        </div>
      </div>
    </div>
  );
});

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
