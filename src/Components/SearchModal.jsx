import { useSelector } from "react-redux";
import { ChevronBottomIcon, CloseIcon, SearchIcon } from "@/assets/icons";
const SearchModal = ({ searchModal, setSearchModal }) => {
  const { sidenavType, theme } = useSelector((state) => state.theme);
  const currentColor = theme[sidenavType];
  return (
    <>
      <div
        data-name="overlay"
        className={`fixed top-0 left-0 w-full h-full z-20 ${
          searchModal ? "block" : "hidden"
        }`}
      ></div>

      <div
        className={`fixed z-30 top-[2%]  left-[21%] w-[70%] shadow-md transition-all duration-150 ${
          searchModal ? "visible" : "invisible opacity-0"
        }`}
      >
        <div
          className={`w-full h-[48px] ${
            sidenavType === "white" ? "bg-white" : "bg-darkBg"
          } rounded-t-[10px] border border-grayLight flex items-center py-[13px] px-[15px]`}
        >
          <SearchIcon className={currentColor.text} />
          <input
            type="text"
            className={`w-full bg-transparent ${
              currentColor.text
            } text-[17px] outline-none border-none ${
              sidenavType === "white"
                ? "placeholder:text-grayLight"
                : "placeholder:text-white"
            }`}
            placeholder="Search"
          />

          <span
            className="cursor-pointer"
            onClick={() => setSearchModal(false)}
          >
            <CloseIcon className={currentColor.text} />
          </span>
        </div>
        <div
          className={`w-full h-[512px] rounded-b-[10px] ${
            sidenavType === "white" ? "bg-white" : "bg-darkBg"
          } p-5 flex items-start gap-x-[30px]`}
        >
          <div
            className={`border  ${
              sidenavType === "white"
                ? "bg-grayFive border-grayThird"
                : "bg-darkBg text-white border-grayLight"
            } w-[220px] rounded-[10px] text-[13px] `}
          >
            <h2
              className={`px-[21px] py-[10px] rounded-t-[10px] font-medium w-full text-left border-b ${
                sidenavType === "white"
                  ? "border-grayThird"
                  : "border-borderWhite"
              }`}
            >
              Active xolatdagi o'quvchilar
            </h2>
            <h2
              className={`px-[21px] py-[10px] rounded-t-[10px] font-normal w-full text-left border-b ${
                sidenavType === "white"
                  ? "border-grayThird"
                  : "border-borderWhite"
              }`}
            >
              Dars qoldirgan o'quvchilar
            </h2>
            <h2 className="px-[21px] py-[10px]">Tolov qilmagan o'quvchilar</h2>
          </div>

          <div>
            <h4
              className={`text-[13px] font-semibold leading-[16px] ${currentColor.text} mb-[19px]`}
            >
              Свойства сделок
            </h4>

            <div className="grid grid-cols-1 gap-y-2">
              <input
                type="text"
                className={`${
                  sidenavType === "white"
                    ? "bg-grayFive placeholder:text-black"
                    : "bg-borderWhite placeholder:text-white"
                } ${
                  currentColor.text
                } border border-grayThird px-[10px] py-[6px] rounded-md text-[13px] leading-4  outline-none `}
                placeholder="Имя"
              />
              <div
                className={`flex items-center justify-between ${
                  sidenavType === "white" ? "bg-grayFive" : "bg-borderWhite"
                } ${
                  currentColor.text
                } border border-grayThird px-[10px] py-[8px] rounded-md text-[13px] leading-4 placeholder:text-black outline-none`}
              >
                <h2>Курсы</h2>
                <button>
                  <ChevronBottomIcon className={currentColor.text} />
                </button>
              </div>
              <div
                className={`flex items-center justify-between ${
                  sidenavType === "white" ? "bg-grayFive" : "bg-borderWhite"
                } ${
                  currentColor.text
                } border border-grayThird px-[10px] py-[8px] rounded-md text-[13px] leading-4 placeholder:text-black outline-none`}
              >
                <h2>Преподаватель</h2>
                <button>
                  <ChevronBottomIcon className={currentColor.text} />
                </button>
              </div>
              <input
                type="Телефон"
                className={`${
                  sidenavType === "white"
                    ? "bg-grayFive placeholder:text-black"
                    : "bg-borderWhite placeholder:text-white"
                } ${
                  currentColor.text
                } border border-grayThird px-[10px] py-[6px] rounded-md text-[13px] leading-4 outline-none `}
                placeholder="Телефон"
              />
              <input
                type="text"
                className={`${
                  sidenavType === "white"
                    ? "bg-grayFive placeholder:text-black"
                    : "bg-borderWhite placeholder:text-white"
                } ${
                  currentColor.text
                } border border-grayThird px-[10px] py-[6px] rounded-md text-[13px] leading-4 outline-none `}
                placeholder="Адрес"
              />
              <div
                className={`flex items-center justify-between ${
                  sidenavType === "white" ? "bg-grayFive" : "bg-borderWhite"
                } ${
                  currentColor.text
                } border border-grayThird px-[10px] py-[8px] rounded-md text-[13px] leading-4 placeholder:text-black outline-none`}
              >
                <h2>Группа</h2>
                <button>
                  <ChevronBottomIcon className={currentColor.text} />
                </button>
              </div>
              <div
                className={`flex items-center justify-between ${
                  sidenavType === "white" ? "bg-grayFive" : "bg-borderWhite"
                } ${
                  currentColor.text
                } border border-grayThird px-[10px] py-[8px] rounded-md text-[13px] leading-4 placeholder:text-black outline-none`}
              >
                <h2>Пол</h2>
                <button>
                  <ChevronBottomIcon className={currentColor.text} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-x-10 mb-4">
              <h2 className={`text-[13px] leading-4 ${currentColor.text}`}>
                Теги
              </h2>
              <button className="text-blueTifany text-[13px] leading-4">
                Управления
              </button>
            </div>
            <input
              type="Адрес"
              className={`${
                sidenavType === "white"
                  ? "bg-grayFive placeholder:text-black"
                  : "bg-borderWhite placeholder:text-white"
              } ${
                currentColor.text
              } border border-grayThird px-[10px] py-[6px] rounded-md text-[13px] leading-4  outline-none mb-[10px]`}
              placeholder="Найти тег"
            />
            <div className="flex flex-wrap gap-x-1">
              <div className="text-[10px] bg-blueTifany px-1 py-[2] text-white font-semibold rounded">
                Teg1
              </div>
              <div className="text-[10px] bg-blueTifany px-1 py-[2] text-white font-semibold rounded">
                Teg2
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
