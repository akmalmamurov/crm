import { SortableContext, useSortable } from "@dnd-kit/sortable";
import LeadContainer from "./LeadContainer";
import { useMemo, useState } from "react";
import useCurrentColor from "@/hooks/useCurrentColor";

const ColumnContainer = ({ column, filteredLeads }) => {
  const [isModal, setIsModal] = useState("");
  const leadsId = useMemo(
    () => filteredLeads.map((lead) => lead.leadId),
    [filteredLeads]
  );
const currentColor = useCurrentColor();
  const { setNodeRef } = useSortable({
    id: column.funnelColumnId,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <div ref={setNodeRef} className="flex flex-col w-[250px] xl:w-[350px] bg-transparent">
      <h2 className={`px-4 py-6 mb-3 rounded-md ${currentColor.bg} ${currentColor.text} font-medium text-[24px] xl:text-3xl capitalize`}>
        {column.funnelColumnName}
      </h2>

      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden">
        <SortableContext items={leadsId}>
          {filteredLeads?.map((lead) => (
            <LeadContainer
              key={lead.leadId}
              lead={lead}
              isModal={isModal}
              setIsModal={setIsModal}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default ColumnContainer;
