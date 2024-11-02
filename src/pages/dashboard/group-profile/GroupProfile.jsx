import { useEffect, useState, useMemo, useCallback } from "react";
import Navbar from "@/layout/Navbar";
import ProfileCard from "@/Components/ProfileCard";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_GROUPS_BY_ID } from "@/adapters/Queries/group/groupsById";
import ProfileIcon from "@/assets/icons/group-profile-icon.svg";
import { convertMillisecondsToDate } from "@/CustomHooks/convertMillisecondsToDate";
import GroupProfileAttendace from "@/Components/Groups/group-attendance/GroupProfileAttendace";
import ChevronButton from "@/Components/ChevronButton";
import { findMonthNameFromIndex } from "@/CustomHooks/findMonthNameFromIndex";
import StudentStatus from "@/Components/students/StudentStatus";
import GroupStudents from "@/Components/Groups/group-students/GroupStudents";
import GroupDiscounts from "@/Components/Groups/group-discounts/GroupDiscounts";
import { DELETE_STUDENT_GROUP } from "@/adapters/Mutations/group/deleteStudentGroup";
import { FREEZE_STUDENT_GROUP } from "@/adapters/Mutations/group/freezeStudentGroup";
import { CREATE_STUDENT_PAYMENT } from "@/adapters/Mutations/studentPayments/createStudentPayments";
import { useSelector } from "react-redux";
import { useTranslation } from "@/hooks";

const GroupProfile = () => {
  const t = useTranslation();
  const [activeButton, setActiveButton] = useState(t.groupStudents);
  const [month, setMonth] = useState(null);
  const [groupStartDate, setGroupStartDate] = useState(null);
  const [groupEndDate, setGroupEndDate] = useState(null);
  const [studentCashData, setStudentCashData] = useState({});
  const [studentCheck, setStudentCheck] = useState(false);
  const { id } = useParams();

  // get single group data
  const {
    loading: groupDataByIdLoading,
    error: groupDataByIdError,
    data: groupDataById,
  } = useQuery(GET_GROUPS_BY_ID, {
    variables: { Id: id },
  });

  // create payment
  const [
    createPayment,
    { data, loading: paymentLoading, error: paymentError },
  ] = useMutation(CREATE_STUDENT_PAYMENT);

  useEffect(() => {
    if (data?.addStudentCash) {
      setStudentCashData(data?.addStudentCash);
      setStudentCheck(true);
    }
  }, [data?.addStudentCash]);
  const { sidenavType, theme } = useSelector((state) => state.theme);
  const currentColor = theme[sidenavType];

  // delete student group
  const [removeStudent, { loading: removeStudentLoading }] = useMutation(
    DELETE_STUDENT_GROUP,
    {
      refetchQueries: [
        {
          query: GET_GROUPS_BY_ID,
          variables: { Id: id },
        },
      ],
    }
  );

  // freeze student group
  const [freezeStudentGroup, { loading: freezeLoading }] =
    useMutation(FREEZE_STUDENT_GROUP);

  const groupDataByIdObject = groupDataById?.groupByIdOrDate;

  const startDate = useMemo(
    () => new Date(parseInt(groupDataByIdObject?.startDate)),
    [groupDataByIdObject]
  );
  const endDate = useMemo(
    () => new Date(parseInt(groupDataByIdObject?.endDate)),
    [groupDataByIdObject]
  );

  useEffect(() => {
    if (groupDataByIdObject?.startDate) {
      const fullYear = startDate.getFullYear();
      const month = startDate.getMonth();
      const initialEndDate = new Date(fullYear, month + 1, 0);
      setMonth(startDate);
      setGroupStartDate(startDate);
      setGroupEndDate(initialEndDate);
    }
  }, [groupDataByIdObject, startDate]);

  const handleRightClick = useCallback(() => {
    setMonth((prevStartDate) => {
      const nextStartDate = new Date(prevStartDate);
      nextStartDate.setMonth(prevStartDate.getMonth() + 1);
      nextStartDate.setDate(1);
      return nextStartDate;
    });
    setGroupStartDate((prevStartDate) => {
      const nextStartDate = new Date(prevStartDate);
      nextStartDate.setMonth(prevStartDate.getMonth() + 1);
      nextStartDate.setDate(1);
      return nextStartDate;
    });
    setGroupEndDate((prevEndDate) => {
      const nextEndDate = new Date(prevEndDate);
      nextEndDate.setMonth(prevEndDate.getMonth() + 1);
      return nextEndDate;
    });
  }, []);

  const handleLeftClick = useCallback(() => {
    setMonth((prevStartDate) => {
      const nextStartDate = new Date(prevStartDate);
      nextStartDate.setMonth(prevStartDate.getMonth() - 1);
      nextStartDate.setDate(1);
      return nextStartDate;
    });
    setGroupStartDate((prevStartDate) => {
      const nextStartDate = new Date(prevStartDate);
      nextStartDate.setMonth(prevStartDate.getMonth() - 1);
      nextStartDate.setDate(1);
      return nextStartDate;
    });
    setGroupEndDate((prevEndDate) => {
      const nextEndDate = new Date(prevEndDate);
      nextEndDate.setMonth(prevEndDate.getMonth() - 1);
      return nextEndDate;
    });
  }, []);

  const changeGroupDataById = useMemo(() => {
    return {
      ...groupDataByIdObject,
      startDate: convertMillisecondsToDate(groupDataByIdObject?.startDate),
      endDate: convertMillisecondsToDate(groupDataByIdObject?.endDate),
      startAndEndTime: `${groupDataByIdObject?.startTime}-${groupDataByIdObject?.endTime}`,
    };
  }, [groupDataByIdObject]);

  const changeStudentStatus = useMemo(
    () =>
      groupDataByIdObject?.students?.map((student) => ({
        ...student,
        studentStatus: <StudentStatus status={student.studentStatus} />,
      })),
    [groupDataByIdObject]
  );

  const groupProfileCardListInfo = [t.hour, t.classStartDate, t.classEndDate];

  const necessaryGroupProfileCardInfo = useMemo(
    () => ["startAndEndTime", "startDate", "endDate"],
    []
  );

  const groupProfileButtons = [
    t.groupStudents,
    t.attendance,
    t.discounts,
    t.history,
  ];

  return (
    <>
      <Navbar navHeading={t.groupProfile} />

      <section className="group-profile-body">
        <div className="grid grid-cols-3 gap-[13px] xl:gap-[30px]">
          <ProfileCard
            loading={groupDataByIdLoading}
            error={groupDataByIdError}
            imageSource={ProfileIcon}
            imageAlt={"Group profile task icon"}
            informationAbout={t.groupInformation}
            cardTitle={groupDataByIdObject?.groupName}
            cardSubtitle={groupDataByIdObject?.roomName}
            cardListInfoTitle={groupProfileCardListInfo}
            neccessaryProfileCardInfo={necessaryGroupProfileCardInfo}
            profileInfo={changeGroupDataById}
          />
          <div className="flex flex-col flex-grow col-span-2">
            <div className="flex justify-between items-center mb-[20px]">
              <div className="flex gap-[10px]">
                {groupProfileButtons.map((groupProfileButton, index) => {
                  return (
                    <button
                      onClick={() => setActiveButton(groupProfileButton)}
                      key={index}
                      type="button"
                      className={`${
                        activeButton === groupProfileButton
                          ? "bg-blueTifany text-white"
                          : `${
                              sidenavType === "white"
                                ? "bg-lightestBlack"
                                : "bg-darkBg "
                            }  ${
                              currentColor.text
                            } hover:bg-lighterBlack duration-200`
                      } px-[12px] py-[8px] rounded-[6px] cursor-pointer text-[15px] leading-[17.9px] tracking-[-0.23px]  font-normal `}
                    >
                      {groupProfileButton}
                    </button>
                  );
                })}
              </div>
              {activeButton === t.attendance && (
                <div className="flex gap-x-3">
                  <div className="flex flex-col items-center">
                    <span>
                      {findMonthNameFromIndex(
                        groupStartDate.getMonth() - 1
                      ).slice(0, 3)}
                    </span>
                    <ChevronButton
                      disabled={
                        groupStartDate?.getMonth() === startDate?.getMonth()
                      }
                      handleClick={handleLeftClick}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span>
                      {findMonthNameFromIndex(
                        groupStartDate.getMonth() + 1
                      ).slice(0, 3)}
                    </span>
                    <ChevronButton
                      imgClassname={"rotate-180"}
                      disabled={
                        groupStartDate?.getMonth() === endDate?.getMonth()
                      }
                      handleClick={handleRightClick}
                    />
                  </div>
                </div>
              )}
            </div>

            {activeButton === t.groupStudents && (
              <GroupStudents
                changeStudentStatus={changeStudentStatus}
                removeStudent={removeStudent}
                removeStudentLoading={removeStudentLoading}
                freezeStudent={freezeStudentGroup}
                freezeLoading={freezeLoading}
                loading={groupDataByIdLoading}
                error={groupDataByIdError}
                startDate={groupStartDate}
                endDate={groupEndDate}
                id={id}
                createPayment={createPayment}
                paymentError={paymentError}
                paymentLoading={paymentLoading}
                cashData={studentCashData}
                closeCheck={() => setStudentCheck(false)}
                check={studentCheck}
              />
            )}

            {activeButton === t.attendance && (
              <GroupProfileAttendace
                month={month}
                startDate={groupStartDate}
                endDate={groupEndDate}
              />
            )}

            {activeButton === t.discounts && <GroupDiscounts id={id} />}
          </div>
        </div>
      </section>
    </>
  );
};

export default GroupProfile;
