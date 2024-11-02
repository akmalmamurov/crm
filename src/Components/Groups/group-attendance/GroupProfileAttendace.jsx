import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_GROUPS_ATTENDANCE_BY_ID } from "@/adapters/Queries/group/groupAttendanceById";
import { useParams } from "react-router-dom";
import { UPDATE_GROUP_ATTENDANCE_STATUS } from "@/adapters/Queries/group/updateGroupAttendanceStatus";
import AttendanceOptions from "./AttendanceOptions";
import CancelLesson from "./CancelLesson";
import { UPDATE_STUDENT_ATTENDANCE_STATUS } from "@/adapters/Queries/group/updateStudentAttendanceStatus";
import { findMonthNameFromIndex } from "@/CustomHooks/findMonthNameFromIndex";
import { useSelector } from "react-redux";

const GroupProfileAttendace = ({ startDate, endDate, month }) => {
  const [showAttendanceOptions, setShowAttendanceOptions] = useState("");
  const [showGroupDateOptions, setShowGroupDateOptions] = useState("");
  const [showCancelLessonModal, setShowCancelLessonModal] = useState(false);
  const { id } = useParams();
  const { sidenavType, theme } = useSelector((state) => state.theme);
  const currentColor = theme[sidenavType];

  const { data: studentAttendanceInfo } = useQuery(
    GET_GROUPS_ATTENDANCE_BY_ID,
    {
      variables: {
        id,
        month,
      },
    }
  );
  console.log(studentAttendanceInfo);
  const [updateGroupAttendanceStatus, { loading: updateGroupLoading }] =
    useMutation(UPDATE_GROUP_ATTENDANCE_STATUS, {
      refetchQueries: [
        {
          query: GET_GROUPS_ATTENDANCE_BY_ID,
          variables: {
            id,
            startDate,
            endDate,
          },
        },
      ],
      // update(cache, { data: { updateGroupAttendanceStatus } }) {
      //   cache.modify({
      //     fields: {
      //       groupAttendenceByIdOrDate(existingData) {
      //         console.log(updateGroupAttendanceStatus);
      //       },
      //     },
      //   });
      // },
    });

  const [updateStudentAttendanceStatus] = useMutation(
    UPDATE_STUDENT_ATTENDANCE_STATUS,
    {
      refetchQueries: [
        {
          query: GET_GROUPS_ATTENDANCE_BY_ID,
          variables: {
            id,
            startDate,
            endDate,
          },
        },
      ],
    }
  );

  const studentAttendanceData =
    studentAttendanceInfo?.groupAttendenceByIdOrDate;

  const handleClick = async (attendId, groupId, attendStatus, studentId) => {
    try {
      await updateStudentAttendanceStatus({
        variables: {
          attendId,
          groupId,
          attendStatus,
          studentId,
        },
      });
      setShowAttendanceOptions("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`w-full py-8 pr-5 ${
        sidenavType === "white"
          ? "bg-white border-lighterWhite"
          : "bg-darkBg border-[#E6E6E6]"
      } border-2 border-solid  rounded-lg overflow-auto relative`}
    >
      <table className="w-full">
        <thead className="text-[15px] leading-[18px] tracking-[-0.23px] font-semibold">
          <tr className="border-r border-b border-formRgba">
            <th className="py-2 px-8 text-blueTifany text-left w-[50px] sticky left-0  z-10">
              №
            </th>
            <th className="sticky left-[80px] z-10 py-2 px-3  text-blueTifany text-left border-r border-formRgba">
              F.I.O
            </th>
            {studentAttendanceData?.groupAttendence?.map(
              (groupAttendence, index) => {
                const date = new Date(parseInt(groupAttendence.attendDay));
                const dateMonth = findMonthNameFromIndex(date.getMonth());
                const attendanceDateAndMonth = `${
                  date.getDate() < 10 ? "0" : ""
                }${date.getDate()} ${dateMonth}`;

                return (
                  <th
                    key={index}
                    className="relative py-2 px-3 text-center text-white font-normal text-[15px] leading-[18.15px] tracking-[-0.23px] select-none"
                  >
                    <div
                      onClick={() =>
                        showGroupDateOptions
                          ? setShowGroupDateOptions("")
                          : setShowGroupDateOptions(groupAttendence.attendId)
                      }
                      className={`relative min-w-[68px] p-1 rounded-md bg-attendance-date cursor-pointer ${
                        showGroupDateOptions === groupAttendence.attendId
                          ? "after:absolute after:left-[50%] after:translate-x-[-50%] after:bottom-[-10px] after:h-[8px] after:w-[18px] after:border-r-[8px] after:border-l-[8px] after:border-b-[8px] after:border-black after:border-r-transparent after:border-l-transparent"
                          : ""
                      }`}
                    >
                      {attendanceDateAndMonth.slice(0, 6)}
                    </div>
                    {/* GROUP DATE EDIT SELECT OPTIONS */}
                    {showGroupDateOptions === groupAttendence.attendId && (
                      <div className="absolute left-[-30px] bg-white bottom-[-42px] z-20 rounded-md w-[160px] h-[42px] shadow-dropLight">
                        <button
                          onClick={() => setShowCancelLessonModal(true)}
                          className="w-full px-[6px] text-black text-[13px] font-medium leading-[17px] tracking-[0.06px] text-left hover:bg-whiteThird"
                        >
                          Darsni bekor qilish
                        </button>
                        <button className="w-full px-[6px] text-black text-[13px] font-medium leading-[17px] tracking-[0.06px] text-left hover:bg-whiteThird">
                          Boshqa kunga ko'chirish
                        </button>
                      </div>
                    )}
                    <CancelLesson
                      showModal={showCancelLessonModal}
                      setShowModal={setShowCancelLessonModal}
                      loading={updateGroupLoading}
                      updateGroupStatus={updateGroupAttendanceStatus}
                      attendId={showGroupDateOptions}
                      setShowGroupDateOptions={setShowGroupDateOptions}
                      groupId={groupAttendence.groupId}
                    />
                  </th>
                );
              }
            )}
          </tr>
        </thead>
        <tbody>
          {studentAttendanceData?.studentsAttendence?.map(
            (studentAttendance, index) => {
              return (
                <tr key={index} className={`border-b  border-formRgba`}>
                  <td
                    className={`mr-[5px] py-[13px] px-3 w-[50px] text-center font-normal text-[15px] leading-[18px] tracking-[-0.23px] sticky left-0  z-10 ${currentColor.text}`}
                  >
                    {index + 1}
                  </td>
                  <td
                    className={` py-[13px] px-[10px] border-r border-formRgba w-[175px] font-normal text-[15px] leading-[17.9px] tracking-[-0.23px] sticky left-[80px] z-10 ${currentColor.text}`}
                  >
                    <span className="whitespace-nowrap">
                      {studentAttendance.studentName}
                    </span>
                  </td>
                  {studentAttendanceData?.groupAttendence?.map(
                    (groupAttendace, index) => {
                      return (
                        <td
                          key={index}
                          className="relative py-[13px] px-[10px] border border-formRgba w-[81px]"
                        >
                          {studentAttendance?.attendence.map(
                            (attendance, attendanceIndex) => {
                              return attendance.attendDay ===
                                groupAttendace.attendDay &&
                                groupAttendace.attendStatus === 1 ? (
                                <div key={attendanceIndex}>
                                  <button
                                    onClick={() =>
                                      showAttendanceOptions
                                        ? setShowAttendanceOptions("")
                                        : setShowAttendanceOptions(
                                            attendance.attendId
                                          )
                                    }
                                    className={`flex justify-center items-center w-[26px] h-[26px] border-[2px] ${
                                      attendance.attendStatus === 1
                                        ? "border-formRgba"
                                        : attendance.attendStatus === 2
                                        ? "border-redPrimary"
                                        : "border-greenPrimary"
                                    } border-solid rounded-[50%] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ${
                                      showAttendanceOptions ===
                                      attendance.attendId
                                        ? "after:absolute after:bottom-[-10px] after:h-[8px] after:w-[18px] after:border-r-[8px] after:border-l-[8px] after:border-b-[8px] after:border-yellowPrimary after:border-r-transparent after:border-l-transparent"
                                        : ""
                                    }`}
                                  >
                                    <span
                                      className={`w-[18px] h-[18px] ${
                                        attendance.attendStatus === 1
                                          ? "bg-formRgba"
                                          : attendance.attendStatus === 2
                                          ? "bg-redPrimary"
                                          : "bg-greenPrimary"
                                      }  rounded-[50%]`}
                                    ></span>
                                  </button>
                                  <AttendanceOptions
                                    showAttendanceOptions={
                                      showAttendanceOptions
                                    }
                                    attendance={attendance}
                                    studentId={studentAttendance.studentId}
                                    handleClick={handleClick}
                                  />
                                </div>
                              ) : (
                                ""
                              );
                            }
                          )}
                        </td>
                      );
                    }
                  )}
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GroupProfileAttendace;
