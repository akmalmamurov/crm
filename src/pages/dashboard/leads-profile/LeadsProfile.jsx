import { useEffect, useMemo, useState } from "react";
import Navbar from "../../../layout/Navbar";
import AddingLeadsForm from "../../../Components/Leads/AddingLeadsForm";

import EditingOffcanvas from "../../../Components/Leads/EditingOffcanvas";

import { useMutation, useQuery } from "@apollo/client";
import { GET_LEADS } from "../../../adapters/Queries/leads/leads";
import { useParams } from "react-router-dom";
import { UPDATE_LEAD_COLUMN } from "../../../adapters/Mutations/leads/updateLeadColumn";
import { GET_FUNNEL_BY_ID } from "@/adapters/Queries/funnel/funnelById";
import DragToScroll from "@/Components/Leads/DragToScroll";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import ColumnContainer from "@/Components/Leads/ColumnContainer";
import { createPortal } from "react-dom";
import LeadContainer from "@/Components/Leads/LeadContainer";
import { SortableContext } from "@dnd-kit/sortable";

const LeadsProfile = () => {
  const [addingLeadsForm, setAddingLeadsForm] = useState(false);
  const [firstColumnId, setFirstColumnId] = useState("");
  const [activeLead, setActiveLead] = useState(null);
  const [isDraggingItem, setIsDraggingItem] = useState(false);

  const { id } = useParams();

  const { data: funnelData } = useQuery(GET_FUNNEL_BY_ID, {
    variables: {
      id,
    },
  });

  const { data: leadData } = useQuery(GET_LEADS, {
    variables: {
      id,
    },
  });

  const [updateLeadColumn] = useMutation(UPDATE_LEAD_COLUMN, {
    refetchQueries: [
      {
        query: GET_LEADS,
        variables: {
          id,
        },
      },
    ],
  });

  const columnIds = useMemo(
    () =>
      leadData?.leads?.funnelColumnList?.map((col) => col.funnelColumnId) || [],
    [leadData?.leads?.funnelColumnList]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  useEffect(() => {
    const funnelColumnId = leadData?.leads?.funnelColumnList?.find(
      (column) => column.funnelColumnOrder === 1
    );
    setFirstColumnId(funnelColumnId?.funnelColumnId);
  }, [leadData?.leads?.funnelColumnList]);

  window.addEventListener("click", (e) => {
    const el = e.target.getAttribute("data-name");
    if (el === "overlay") {
      setAddingLeadsForm(false);
    }
  });

  // ON DRAG START
  const handleDragStart = (e) => {
    setIsDraggingItem(true);
    if (e.active.data.current?.type === "Lead") {
      setActiveLead(e.active.data.current.lead);
      return;
    }
  };

  // ON DRAG END
  const handleDragEnd = () => {
    setIsDraggingItem(false);
  };

  const handleDragOver = async (e) => {
    setIsDraggingItem(true);

    const { active, over } = e;
    if (!over) return;
    const activeLeadId = active.id;
    const overLeadId = over.id;

    if (activeLeadId === overLeadId) return;

    const isActiveLead = active.data.current?.type === "Lead";
    const isOverLead = over.data.current?.type === "Lead";

    if (!isActiveLead) return;

    if (isActiveLead && isOverLead) {
      const overLead = leadData?.leads?.leadList?.find(
        (item) => item.leadId === overLeadId
      );
      const overIndex = leadData?.leads?.leadList
        ?.filter((lead) => lead.columnId === overLead.columnId)
        .findIndex((lead) => lead.leadId === overLeadId);

      try {
        await updateLeadColumn({
          variables: {
            leadId: activeLeadId,
            columnId: overLead.columnId,
            orderNumber: overIndex + 1,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveLead && isOverAColumn) {
      try {
        await updateLeadColumn({
          variables: {
            leadId: activeLeadId,
            columnId: overLeadId,
            orderNumber: 1,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Navbar
        navHeading={funnelData?.funnelById?.funnelName}
        buttonContent={"Leads qo'shish"}
        setShowForm={() => setAddingLeadsForm(true)}
        searchIcon={true}
      />

      {/* ADDING LEAD FORM OFFCANVAS */}
      <AddingLeadsForm
        funnelId={id}
        addingLeadsForm={addingLeadsForm}
        setAddingLeadsForm={setAddingLeadsForm}
        firstColumnId={firstColumnId}
      />

      <section className="">
        {/* LEAD EDITING OFFCANVAS */}
        <EditingOffcanvas />

        <DragToScroll isDraggingItem={isDraggingItem}>
          <div className="flex w-full overflow-x-auto overflow-y-hidden min-h-screen">
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
            >
              <div className="flex gap-4">
                <SortableContext items={columnIds}>
                  {leadData?.leads?.funnelColumnList?.map((column) => {
                    const filteredLeads = leadData?.leads?.leadList?.filter(
                      (lead) => lead.columnId === column.funnelColumnId
                    );

                    return (
                      <ColumnContainer
                        key={column.funnelColumnId}
                        column={column}
                        filteredLeads={filteredLeads}
                      />
                    );
                  })}
                </SortableContext>
              </div>
              {createPortal(
                <DragOverlay>
                  {activeLead && <LeadContainer lead={activeLead} />}
                </DragOverlay>,
                document.body
              )}
            </DndContext>
          </div>
        </DragToScroll>
      </section>
    </>
  );
};

export default LeadsProfile;
