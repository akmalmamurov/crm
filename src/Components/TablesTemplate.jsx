import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import MoreModal from "./MoreModal";
import Shimmer from "./loading/Shimmer";
import { useSelector } from "react-redux";
import { MoreBtnIcon } from "@/assets/icons";
import { Link } from "react-router-dom";

const TablesTemplate = (props) => {
  const {
    loading,
    dataQueryError,
    headings,
    sections,
    moreBtnData,
    tableButtons,
    idFieldName,
    moreBtnExist,
    selectedId,
  } = props;

  const [isMoreBtnState, setIsMoreBtnState] = useState("");

  const pathname = useLocation().pathname;
  const navigation = useNavigate();
  const { sidenavType, theme } = useSelector((state) => state.theme);
  const currentColor = theme[sidenavType];
  const navigateToGroupProfile = (direction) => {
    navigation(direction);
  };

  let columns =
    sections?.length &&
    Object.keys(sections[0]).filter(
      (item) =>
        item !== "__typename" &&
        item !== idFieldName &&
        item !== props.dataException1 &&
        item !== props.dataException2 &&
        item !== props.dataException3 &&
        item !== props.dataException4 &&
        item !== props.dataException5 &&
        item !== props.dataException6
    );

  return dataQueryError ? (
    <h2>Error...</h2>
  ) : (
    <>
      {/* TABLES */}
      {sections?.length === 0 ? (
        ""
      ) : (
        <div
          className={`relative ${
            columns?.length === 1
              ? "w-[40%]"
              : columns?.length === 2
              ? "w-[55%]"
              : "w-full"
          }   ${currentColor.bg} p-[20px] rounded-[8px] `}
        >
          <div className={`${tableButtons ? "mb-[30px] " : "hidden"}`}>
            {tableButtons?.map((tableButton, index) => {
              return (
                <button
                  key={index}
                  onClick={tableButton.click}
                  type="button"
                  className={`${
                    index === 1
                      ? "mr-0 bg-blueTifany text-white"
                      : `mr-[10px] ${
                          sidenavType === "white"
                            ? "bg-lightestBlack"
                            : "bg-[#0000001A]"
                        }  ${currentColor.text} hover:bg-lighterBlack`
                  }  duration-200 px-[12px] py-[8px] rounded-[6px] text-[15px] leading-[17.9px] tracking-[-0.23px]  font-normal `}
                >
                  <img
                    className="inline-block mr-[5px]"
                    src={tableButton.icon}
                    alt={tableButton.icon}
                    width={22}
                    height={22}
                  />
                  {tableButton.buttonName}
                </button>
              );
            })}
          </div>

          <table
            className={`w-full text-left rtl:text-right overflow-x-auto ${currentColor.bg}}`}
          >
            <thead
              className={`text-[14px] xl:text-[15px] leading-[18px] tracking-[-0.23px]  border-b ${currentColor.tableBorder}`}
            >
              <tr>
                {headings?.map((heading, index) => {
                  return (
                    <th
                      key={index}
                      scope="col"
                      className="px-[6px] xl:px-[13px]  pb-[13px] text-blueTifany font-semibold"
                    >
                      {heading}
                    </th>
                  );
                })}
                {moreBtnExist && (
                  <th className="px-[6px] xl:px-[13px] py-[13px] ">
                    <div className="ml-auto w-[34px] h-[34px] relative">
                      <MoreBtnIcon
                        className={`block px-[3px] py-[3px] cursor-pointer duration-300 rounded-[4px] ${currentColor.moreBtn}  ${currentColor.text} w-[28px] h-[28px] xl:w-[34px] xl:h-[34px]`}
                      />
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {loading &&
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
                  return (
                    <tr key={index}>
                      <td colSpan={10}>
                        <Shimmer otherClasses={"h-[34px] my-2.5"} />
                      </td>
                    </tr>
                  );
                })}
              {!loading &&
                !dataQueryError &&
                sections?.map((section, index) => {
                  return (
                    <tr
                      key={section[idFieldName]}
                      onClick={() =>
                        navigateToGroupProfile(section[idFieldName])
                      }
                      className={`border-b border-grayThird cursor-pointer  duration-150 ${currentColor.tableHover}`}
                    >
                      <td
                        className={`${currentColor.text} px-[6px] xl:px-[13px] py-[13px] font-normal text-[15px] leading-[18px] tracking-[-0.23px]`}
                      >
                        {index + 1}
                      </td>

                      {columns.map((column, index) => {
                        const dataVariables =
                          column === "coursePrice"
                            ? section[column].toLocaleString()
                            : section[column];

                        return (
                          <td
                            key={index}
                            className={`px-[6px] xl:px-[13px] py-[13px] font-normal text-[15px]  leading-[18px] tracking-[-0.23px] ${currentColor.text}`}
                          >
                            <div className="flex flex-col gap-y-2">
                              {index === 2 && pathname === "/students"
                                ? dataVariables.map((item) => {
                                    return (
                                      <div
                                        key={item.groupId}
                                        className="flex items-center"
                                      >
                                        <Link
                                          to={`/groups/${item.groupId}`}
                                          type="button"
                                          className="bg-blueTifany text-white text-[16px] py-[6px] px-[10px] rounded-md mr-[6px] hover:bg-blue duration-300"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                          }}
                                        >
                                          {item.groupName}
                                        </Link>
                                        <span>
                                          {item.colleagueName} (
                                          {item.lessonStartTime})
                                        </span>
                                      </div>
                                    );
                                  })
                                : dataVariables}
                            </div>
                          </td>
                        );
                      })}
                      {moreBtnExist && (
                        <td className="px-[6px] xl:px-[13px] py-[13px] ">
                          <div className="ml-auto w-[34px] h-[34px] relative">
                            <MoreBtnIcon
                              onClick={(e) => {
                                e.stopPropagation();
                                selectedId.current = section[idFieldName];
                                setIsMoreBtnState((prev) =>
                                  prev ? "" : section[idFieldName]
                                );
                              }}
                              className={`block px-[3px] py-[3px] cursor-pointer duration-300 rounded-[4px] ${
                                currentColor.moreBtn
                              } ${currentColor.text} ${
                                isMoreBtnState === section[idFieldName]
                                  ? `${currentColor.moreBtnActive}`
                                  : ""
                              }  w-[28px] h-[28px] xl:w-[34px] xl:h-[34px]`}
                            />

                            {isMoreBtnState === section[idFieldName] && (
                              <MoreModal
                                isMoreModal={isMoreBtnState}
                                moreBtnData={moreBtnData}
                                setIsMoreModal={setIsMoreBtnState}
                              />
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
TablesTemplate.displayName = "TablesTemplate";
export default TablesTemplate;
