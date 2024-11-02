import { useEffect, useRef, useState } from "react";
import Chevron from "../assets/icons/chevron.svg";
import CheckBtn from "../assets/icons/check-btn.svg";
import { extractNumberFromString } from "../CustomHooks/regexFunctions";
import { useSelector } from "react-redux";

const TablesPagination = (props) => {
  const { totalCount, page, setPage, count, setCount } = props;

  const additionalPagesData = useRef(["10 pages"]);
  const currentPagesData = useRef([]);

  const [visibleSelect, setVisibleSelect] = useState(false);
  const [showAdditionalPages, setShowAdditionalPages] = useState(false);
  const [additionalPages, setAdditionalPages] = useState("10 pages");
  const { sidenavType, theme } = useSelector((state) => state.theme);
  const currentColor = theme[sidenavType];
  const totalPages = totalCount && Math.ceil(totalCount / count);
  const arrayTotalPages =
    totalPages && [...Array(totalPages + 1).keys()].slice(1);

  let extractedNumber = extractNumberFromString(additionalPages);

  const handlePrevious = () => {
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    switch (true) {
      case totalCount > 50:
        additionalPagesData.current = [
          "10 pages",
          "20 pages",
          "50 pages",
          "100 pages",
        ];
        break;
      case totalCount > 20:
        additionalPagesData.current = ["10 pages", "20 pages", "50 pages"];
        break;
      case totalCount > 10:
        additionalPagesData.current = ["10 pages", "20 pages"];
        break;
      default:
        additionalPagesData.current = ["10 pages"];
    }
  }, [totalCount]);

  useEffect(() => {
    // let extractedNumber = extractNumberFromString(additionalPages);
    let number = Math.ceil(totalCount / extractedNumber);
    for (let i = 0; i < number; i++) {
      if (
        currentPagesData.current[i] !==
        `${i === 0 ? "0" : ""}${extractedNumber * i + 1}/${
          (i + 1) * extractedNumber
        }-Page`
      )
        currentPagesData.current.push(
          `${i === 0 ? "0" : ""}${extractedNumber * i + 1}/${
            (i + 1) * extractedNumber
          }-Page`
        );
    }

    // eslint-disable-next-line
  }, [additionalPages, totalCount]);

  const selectPaginationData = [
    {
      page: `${page === 1 ? "0" : ""}${extractedNumber * (page - 1) + 1}/${
        page * extractedNumber
      }-Page`,
      showOptions: visibleSelect,
      setShowOptions: () => setVisibleSelect(!visibleSelect),
      handleClick: (item) => {
        // let extractedNumber = extractNumberFromString(additionalPages);
        let match = parseInt(item.match(/\/(\d+)/)[1]);
        setPage(match / extractedNumber);
        setVisibleSelect(false);
      },
      selectData: currentPagesData.current,
    },
    {
      page: additionalPages,
      showOptions: showAdditionalPages,
      setShowOptions: () => setShowAdditionalPages(!showAdditionalPages),
      handleClick: (item) => {
        let extractedNumber = parseInt(item.match(/\d+/)[0]);
        setCount(extractedNumber);
        setAdditionalPages(item);
        setPage(1);
        currentPagesData.current = [];
        setShowAdditionalPages(false);
      },
      selectData: additionalPagesData.current,
    },
  ];

  return (
    <div
      className={`${
        totalCount === 0 ? "hidden" : "flex"
      } justify-center items-center mt-5 gap-x-[15px]`}
    >
      {/* pagination */}
      <div className="flex items-center gap-x-[15px]">
        <button
          onClick={handlePrevious}
          className={`${
            sidenavType === "dark" ? "bg-white" : "bg-darkBg"
          } h-[34px]  w-[34px] pt-[8px] pb-[9px] pl-[11px] pr-[13px] rounded-md disabled:bg-lightestBlack chevron-button`}
          disabled={page === 1}
        >
          <svg width="9" height="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M.349 8.654c0 .308.114.572.36.8l6.838 6.697c.193.194.44.3.73.3.58 0 1.045-.458 1.045-1.047 0-.29-.123-.545-.316-.747L2.845 8.654l6.16-6.003a1.09 1.09 0 0 0 .317-.747c0-.589-.466-1.046-1.046-1.046-.29 0-.536.106-.73.3L.71 7.845c-.246.237-.36.5-.36.808Z" />
          </svg>
        </button>
        {arrayTotalPages &&
          arrayTotalPages?.map((totalPage, index) => {
            return (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={` h-[34px] w-[34px] py-[8px] px-[13px] text-[15px] leading-4 rounded-md duration-200 ${
                  page === index + 1
                    ? "bg-blueTifany text-white"
                    : "bg-white text-black"
                }`}
              >
                {totalPage}
              </button>
            );
          })}

        <button
          onClick={handleNext}
          className="bg-white h-[34px] dark:bg-darkSecondary w-[34px] pt-[8px] pb-[9px] pr-[11px] pl-[13px] rounded-md disabled:bg-lightestBlack chevron-button"
          disabled={page === totalPages}
        >
          <svg
            width="9"
            height="16"
            className="rotate-180"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.349 8.654c0 .308.114.572.36.8l6.838 6.697c.193.194.44.3.73.3.58 0 1.045-.458 1.045-1.047 0-.29-.123-.545-.316-.747L2.845 8.654l6.16-6.003a1.09 1.09 0 0 0 .317-.747c0-.589-.466-1.046-1.046-1.046-.29 0-.536.106-.73.3L.71 7.845c-.246.237-.36.5-.36.808Z" />
          </svg>
        </button>
      </div>

      {/* Select option */}
      {selectPaginationData.map((data, index) => {
        return (
          <div
            key={index}
            className={`relative ${sidenavType === "white" ? "bg-white" : "bg-darkBg"} dark:bg-darkSecondary w-[150px] h-[34px] py-[6px] px-[10px] flex items-center justify-between`}
          >
            <h3 className={`text-[13px] leading-4 ${currentColor.text}`}>
              {data.page}
            </h3>
            <button
              onClick={data.setShowOptions}
              className="w-[18px] h-[18px] pl-[4px]"
            >
              <img
                src={Chevron}
                alt="chevron icon"
                className={`w-[10px] rounded-md object-cover transition-all duration-200 ease-linear delay-75 ${
                  data.showOptions ? "-rotate-90" : "rotate-90"
                }`}
              />
            </button>

            <ul
              className={`${
                data.showOptions
                  ? "visible bottom-[39px]"
                  : "invisible bottom-0 opacity-0"
              } absolute z-[1] right-0 w-[150px] transition-all duration-200 delay-100 rounded-md bg-white dark:bg-darkSecondary dark:text-white text-[13px] leading-4`}
            >
              {data.selectData.map((selectInfo) => {
                return (
                  <li
                    key={selectInfo}
                    onClick={() => data.handleClick(selectInfo)}
                    className="flex justify-between items-center py-[6px] px-[10px] rounded-md hover:bg-lightestBlack cursor-pointer"
                  >
                    {selectInfo}
                    {selectInfo === data.page && (
                      <img
                        src={CheckBtn}
                        alt="check tick"
                        width={18}
                        height={14}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default TablesPagination;
