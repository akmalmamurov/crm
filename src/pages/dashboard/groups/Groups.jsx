import { useRef, useState } from "react";
import Navbar from "@/layout/Navbar";
import TablesTemplate from "@/Components/TablesTemplate";
import TablesPagination from "@/Components/TablesPagination";
import AddingGroupForms from "@/Components/Groups/AddingGroupForms";
import GroupsFilter from "@/Components/Groups/GroupsFilter";
import { useMutation, useQuery } from "@apollo/client";
import { GET_GROUPS } from "@/adapters/Queries/group/groups";
import { GET_GROUPS_COUNT } from "@/adapters/Queries/group/groupCount";
import { DELETE_GROUP } from "@/adapters/Mutations/group/deleteGroup";
import { convertMillisecondsToDate } from "@/CustomHooks/convertMillisecondsToDate";
import { checkingDaysEvenOrOdd } from "@/CustomHooks/checkingDaysEvenOrOdd";
import { moreBtnDataConfig } from "@/constants/moreModalData";
import ConfirmModal from "@/Components/modal/ConfirmModal";
import UpdateGroupForms from "@/Components/Groups/UpdateGroupForms";
import useCurrentColor from "@/hooks/useCurrentColor";
import { useTranslation } from "@/hooks";

const Groups = () => {
  const [activeButton, setActiveButton] = useState("activeButton");
  const [showGroupsForm, setShowGroupsForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [groupPage, setGroupPage] = useState(1);
  const [groupCount, setGroupCount] = useState(10);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const selectedGroupId = useRef(null);
  const currentColor = useCurrentColor();
  const t = useTranslation();
  const {
    loading: groupLoading,
    error: groupQueryError,
    data: groupData,
  } = useQuery(GET_GROUPS, {
    variables: {
      page: groupPage,
      count: groupCount,
      isArchive: activeButton === "archiveButton",
    },
  });

  const { data: groupCountData } = useQuery(GET_GROUPS_COUNT, {
    variables: {
      isArchive: activeButton === "archiveButton",
    },
  });

  const [deleteGroup, { loading: deleteGroupLoading }] = useMutation(
    DELETE_GROUP,
    {
      update(cache, { data: { deleteGroup } }) {
        cache.modify({
          fields: {
            groups(existingGroups = []) {
              return existingGroups.filter(
                (group) => group.groupId !== deleteGroup.groupId
              );
            },
          },
        });
      },
    }
  );

  const groupMoreBtnData = moreBtnDataConfig.base(t, setIsDeleteModal);

  const groupTableTitles = [
    "ID",
    t.groupName,
    t.teacher,
    t.days,
    t.classDates,
    t.rooms,
    t.numberStudents,
  ];
  window.addEventListener("click", (e) => {
    const el = e.target.getAttribute("data-name");
    if (el === "overlay") {
      setShowGroupsForm(false);
    }
  });

  const changeGroupData = groupData?.groups?.map((group) => {
    const startDayMonthYear = convertMillisecondsToDate(group["startDate"]);
    const endDayMonthYear = convertMillisecondsToDate(group["endDate"]);

    const startAndEnd = startDayMonthYear + "-" + endDayMonthYear;

    return {
      groupName: group.groupName,
      employerName: group.employerName,
      groupDays: checkingDaysEvenOrOdd(group.groupDays),
      startDateAndEndDate: startAndEnd,
      ...Object.fromEntries(
        Object.entries(group).filter(
          ([key]) => !["groupDays", "startDate", "endDate"].includes(key)
        )
      ),
    };
  });

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup({
        variables: {
          id: selectedGroupId.current,
        },
      });
      setIsDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar
        navHeading={t.groups}
        buttonContent={t.addGroup}
        setShowForm={() => setShowGroupsForm(true)}
        searchIcon={true}
        docIcon={true}
      />

      {/* ADDING GROUP FORM */}
      <AddingGroupForms
        showGroupsForm={showGroupsForm}
        setShowGroupsForm={setShowGroupsForm}
        groupPage={groupPage}
        groupCount={groupCount}
      />
      <UpdateGroupForms />
      <section>
        <div className="flex justify-between mb-[26px]">
          <div className="flex gap-2.5">
            {["activeButton", "archiveButton"].map((button) => {
              return (
                <button
                  key={button}
                  type="button"
                  onClick={() => setActiveButton(button)}
                  className={`${
                    activeButton === button
                      ? "bg-blueTifany text-white "
                      : `${currentColor.bg} ${currentColor.text}`
                  } px-2 py-2.5 min-w-[147px] text-[15px] font-normal text-center leading-[18px] tracking-[-0.23px uppercase rounded-md duration-300`}
                >
                  {button === "activeButton" ? t.activeGroups : t.archiveGroups}
                </button>
              );
            })}
          </div>
          <div className="filter-btn relative">
            {/* GROUP FILTER */}
            <GroupsFilter showFilter={showFilter} />

            <button
              type="button"
              className="flex items-center bg-white px-[8px] py-[10px] w-[75px] rounded-[6px]"
              onClick={() => setShowFilter(!showFilter)}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25 5.61C6.57 8.59 10 13 10 13v5c0 1.1.9 2 2 2s2-.9 2-2v-5s3.43-4.41 5.75-7.39c.51-.66.04-1.61-.8-1.61H5.04c-.83 0-1.3.95-.79 1.61Z"
                  fill="#000"
                />
              </svg>
              <span className="ml-[4px] text-[15px] text-black font-normal text-center leading-[18px] tracking-[-0.23px]">
                Filt
              </span>
            </button>
          </div>
        </div>

        <TablesTemplate
          headings={groupTableTitles}
          loading={groupLoading}
          sections={changeGroupData}
          dataQueryError={groupQueryError}
          selectedId={selectedGroupId}
          idFieldName={"groupId"}
          dataException1={"startTime"}
          dataException2={"endTime"}
          moreBtnData={groupMoreBtnData}
          moreBtnExist
        />
        <TablesPagination
          totalCount={groupCountData?.groupCount}
          page={groupPage}
          setPage={setGroupPage}
          count={groupCount}
          setCount={setGroupCount}
        />
      </section>

      <ConfirmModal
        title={"Rostan ham o'chirmoqchimisiz ?"}
        subtitle={
          "This action cannot be undone. This will permanently delete your account and remove your data from our servers"
        }
        deleteModal
        isOpen={isDeleteModal}
        handleCancel={() => setIsDeleteModal(false)}
        handleClick={handleDeleteGroup}
        loading={deleteGroupLoading}
      />
    </>
  );
};

export default Groups;
