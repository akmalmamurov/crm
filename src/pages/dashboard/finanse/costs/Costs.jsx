import { memo, useCallback, useMemo, useState } from "react";
import Filter from "@/assets/icons/filter-2.svg";
import TablesTemplate from "@/Components/TablesTemplate";
import Navbar from "@/layout/Navbar";
import AddingCostsForms from "@/Components/Cost/AddingCostsForms";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COST } from "@/adapters/Queries/cost/cost";
import { converMillisecondsToDateSecond } from "@/CustomHooks/convertMillisecondsToDate";
import UpdateCost from "@/Components/Cost/UpdateCost";
import { DELETE_COST } from "@/adapters/Mutations/cost/deleteCost";
import {
  CalendarBudgeIcon,
  ChevronBottomIcon,
  SearchIcon,
} from "@/assets/icons";
import useCurrentColor from "@/hooks/useCurrentColor";

const Costs = memo(() => {
  const [addingCostsForm, setAddingCostsForm] = useState(false);
  const [updateCostForm, setUpdateCostForm] = useState(false);
  const [costId, setCostId] = useState(null);
  const currentColor = useCurrentColor();
  const heading = useMemo(
    () => ["№", "F.I.O", "Sana", "Kimga to'langan", "Summa", "Turkum"],
    []
  );

  // get costs
  const {
    data: costsData,
    error: costsError,
    loading: costsLoading,
  } = useQuery(GET_COST, {
    variables: {
      startDate: "",
      endDate: "",
    },
  });
  console.log(costsData);
  const costs = costsData?.costs?.Costs?.map((cost) => {
    return {
      costId: cost.costId,
      costName: cost.costName,
      date: converMillisecondsToDateSecond(cost.costPayedAt),
      payed: cost.costName,
      price: cost.costPrice,
      type: cost.costType,
    };
  });
  const handleCloseCostsForm = useCallback(() => {
    setAddingCostsForm(false);
  }, []);

  const handleShowCostsUpdateForm = useCallback((id) => {
    setCostId(id);
    setUpdateCostForm(true);
  }, []);

  const handleCloseCostsUpdateForm = useCallback(() => {
    setUpdateCostForm(false);
  }, []);
  // delete cost
  const [deleteCost, { loading: costDeleteLoading }] = useMutation(
    DELETE_COST,
    {
      update(cache, { data: { deleteCost } }) {
        cache.modify({
          fields: {
            cost(existingCost = []) {
              return existingCost.filter(
                (cost) => cost.costId !== deleteCost.costId
              );
            },
          },
        });
      },
      refetchQueries: [
        {
          query: GET_COST,
          variables: { startDate: "", endDate: "" },
        },
      ],
    }
  );

  window.addEventListener("click", (e) => {
    const el = e.target.getAttribute("data-name");
    if (el === "overlay") {
      setAddingCostsForm(false);
      setUpdateCostForm(false);
    }
  });
  return (
    <>
      <Navbar
        navHeading={"Xarajatlar"}
        buttonContent={"Yangi xarajat"}
        setShowForm={() =>
          addingCostsForm ? setAddingCostsForm(false) : setAddingCostsForm(true)
        }
        searchIcon={true}
        docIcon={true}
      />

      <AddingCostsForms
        addingCostsForm={addingCostsForm}
        closeModal={handleCloseCostsForm}
      />

      <UpdateCost
        addingCostsForm={updateCostForm}
        closeModal={handleCloseCostsUpdateForm}
        costId={costId}
      />

      <div
        className={`w-full ${currentColor.bg} pt-[24px] pl-[10px] pr-[10px] rounded-[8px]`}
      >
        <div className="px-[10px]">
          <h3
            className={`text-[24px] leading-[28px] ${currentColor.text} mb-[14px] `}
          >
            Davr uchun xarajatlar: 0 so'm
          </h3>
          <div className={`flex items-end gap-x-[10px] ${currentColor.text}`}>
            <form className="w-[92%] grid lg:grid-cols-6 md:grid-cols-3 mb-10 sm:grid-cols-2 grid-cols-2 gap-x-[10px] items-center">
              <div>
                <span className="text-[14px] mb-[8px]">Nomi</span>
                <label className="w-full bg-grayThird rounded-[6px] flex items-center pl-[12px] pr-[6px] py-[6px] h-[34px]">
                  <input
                    type="text"
                    className={`bg-transparent w-full border-none outline-none  placeholder:${currentColor.text}`}
                    placeholder="F.I.O"
                  />
                  <span className="w-[24px] h-[24px]">
                    <SearchIcon className="text-white w-full h-full" />
                  </span>
                </label>
              </div>
              <div>
                <span className="text-[14px] mb-[8px]">Summa</span>
                <label className="w-full bg-grayThird rounded-[6px] flex items-center pl-[12px] pr-[6px] py-[6px] h-[34px]">
                  <input
                    type="text"
                    className={`bg-transparent w-full border-none outline-none  placeholder:${currentColor.text}`}
                    placeholder="$000 000 000"
                  />
                  <span className="w-[24px] h-[24px]">
                    <SearchIcon className="text-white w-full h-full" />
                  </span>
                </label>
              </div>
              <div>
                <span className="text-[14px] mb-[8px]">Sanadan boshlab</span>
                <label className="w-full bg-grayThird rounded-[6px] flex items-center pl-[12px] pr-[6px] py-[6px] h-[34px]">
                  <input
                    type="text"
                    className={`bg-transparent w-full border-none outline-none  placeholder:${currentColor.text}`}
                    placeholder="kun-oy-yil"
                  />
                  <span className="w-[24px] h-[24px]">
                    <CalendarBudgeIcon className="text-white w-full h-full" />
                  </span>
                </label>
              </div>
              <div>
                <span className="text-[14px] mb-[8px]">Sanagacha</span>
                <label className="w-full bg-grayThird rounded-[6px] flex items-center pl-[12px] pr-[6px] py-[6px] h-[34px]">
                  <input
                    type="text"
                    className={`bg-transparent w-full border-none outline-none  placeholder:${currentColor.text}`}
                    placeholder="kun-oy-yil"
                  />
                  <span className="w-[24px] h-[24px] ">
                    <CalendarBudgeIcon className="text-white w-full h-full" />
                  </span>
                </label>
              </div>
              <div>
                <span className="text-[14px] mb-[8px]">Turkum</span>
                <label className="w-full bg-grayThird rounded-[6px] flex items-center pl-[12px] pr-[6px] py-[6px] h-[34px]">
                  <input
                    type="text"
                    className={`bg-transparent w-full border-none outline-none  placeholder:${currentColor.text}`}
                    placeholder="kun-oy-yil"
                  />
                  <span className="w-[24px] h-[24px]">
                    <ChevronBottomIcon className="text-white w-full h-full" />
                  </span>
                </label>
              </div>
              <div className="h-full w-full flex items-end">
                <div className="relative w-full">
                  {/* <GroupsFilter showFilter={showFilter} /> */}
                  <button
                    type="button"
                    className="bg-blueTifany px-4  py-[9px] flex items-end rounded-[6px] h-[34px]"
                  >
                    <img
                      src={Filter}
                      alt="filter icon"
                      className="w-[15px] h-[16px]"
                    />

                    <span className="ml-[4px] text-[14px] text-white font-normal text-center leading-[18px] tracking-[-0.23px]">
                      Filter
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <TablesTemplate
          loading={costsLoading}
          error={costsError}
          headings={heading}
          sections={costs}
          deleteItem={deleteCost}
          deleteLoading={costDeleteLoading}
          idFieldName={"costId"}
          moreBtnExist={true}
          setShowUpdateFrom={handleShowCostsUpdateForm}
        />
      </div>
    </>
  );
});

Costs.displayName = "Costs";

export default Costs;
