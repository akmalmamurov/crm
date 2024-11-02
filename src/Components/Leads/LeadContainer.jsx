import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import MoreModal from "../MoreModal";
import { moreBtnDataConfig } from "@/constants/moreModalData";
import ConfirmModal from "../modal/ConfirmModal";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_LEAD } from "@/adapters/Mutations/leads/deleteLead";
import { GET_LEADS } from "@/adapters/Queries/leads/leads";
import { useParams } from "react-router-dom";
import useCurrentColor from "@/hooks/useCurrentColor";
import { MoreBtnIcon } from "@/assets/icons";

const LeadContainer = ({ lead, isModal, setIsModal }) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const leadMoreBtnData = moreBtnDataConfig.lead(setIsDeleteModal);
  const { id } = useParams();
  const currentColor = useCurrentColor();
  const [deleteLead, { loading: deleteLoading }] = useMutation(DELETE_LEAD, {
    refetchQueries: [
      {
        query: GET_LEADS,
        variables: {
          id,
        },
      },
    ],
  });

  useEffect(() => {
    if (isDeleteModal) {
      setIsModal("");
    }

    // eslint-disable-next-line
  }, [isDeleteModal]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: lead.leadId,
    data: {
      type: "Lead",
      lead,
    },
    disabled: isModal,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`bg-lighterWhite w-[350px] h-[92px] min-h-[92px] border border-white rounded-md shadow-drop`}
      />
    );
  }

  // Delete lead function
  const handleDeleteLead = async () => {
    try {
      await deleteLead({
        variables: {
          leadId: lead.leadId,
        },
      });
      setIsDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={`relative ${currentColor.bg} rounded-md px-3 py-2 w-[250px] xl:w-[350px] min-h-[92px]`}
      >
        <div className="flex justify-between mb-2">
          <span className={`${currentColor.text} capitalize text-base font-normal`}>
            {lead.leadName}
          </span>

          <span
            onClick={() => setIsModal((prev) => (prev ? "" : lead.leadId))}
            className={`${
              isModal === lead.leadId ? `${currentColor.moreBtnActive} rounded-sm` : ""
            }  px-[3px]  cursor-pointer active:bg-grayFour active:rounded-[2px] duration-200 `}
          >
            <MoreBtnIcon className={`${currentColor.text} xl:w-[28px] xl:h-[28px] w-[16px] h-[16px]`} />
          </span>
        </div>
        {isModal === lead.leadId && (
          <MoreModal
            moreBtnData={leadMoreBtnData}
            setIsMoreModal={setIsModal}
            isMoreModal={isModal}
          />
        )}
        <p className={`font-semibold text-sm xl:text-base leading-4 tracking-[-0.08px] mb-2 ${currentColor.text}`}>
          {lead.courseName}
        </p>
        <div className="flex justify-between">
          <span className="text-blueTifany text-xs xl:text-base">{lead.leadPhone}</span>
          {/* <span>{item.time}</span> */}
        </div>
      </div>

      <ConfirmModal
        title={"Rostan ham o'chirmoqchimisiz ?"}
        subtitle={
          "This action cannot be undone. This will permanently delete your account and remove your data from our servers"
        }
        deleteModal
        isOpen={isDeleteModal}
        handleCancel={() => setIsDeleteModal(false)}
        handleClick={handleDeleteLead}
        loading={deleteLoading}
      />
    </>
  );
};

export default LeadContainer;
