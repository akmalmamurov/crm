import { useState } from "react";
import Navbar from "@/layout/Navbar";
import { GET_FUNNEL } from "@/adapters/Queries/funnel/funnel";
import { useQuery, useApolloClient, useMutation } from "@apollo/client";
import TablesTemplate from "@/Components/TablesTemplate";
import AddingFunnel from "@/Components/funnel/AddingFunnel";
import { GET_FUNNEL_COLUMNS } from "@/adapters/Queries/funnel/funnelColumn";
import AddingFunnelColumn from "@/Components/funnel/AddingFunnelColumn";
import { DELETE_FUNNEL } from "@/adapters/Mutations/funnel/deleteFunnel";
import { DELETE_FUNNEL_COLUMN } from "@/adapters/Mutations/funnel/deleteFunnelColumn";
import UpdateFunnel from "@/Components/funnel/UpdateFunnel";
import UpdateFunnelColumn from "@/Components/funnel/UpdateFunnelColumn";
import useCurrentColor from "@/hooks/useCurrentColor";
import { ChevronBottomIcon } from "@/assets/icons";

const LeadSetting = () => {
  const [changeTable, setChangeTable] = useState("Voronka");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFunnleUpdateForm, setShowFunnelUpdateForm] = useState(false);
  const [showFunnelList, setShowFunnelList] = useState(false);
  const [funnelId, setFunnelId] = useState("");
  const [funnelColumnId, setFunnelColumnId] = useState("");
  const [funnelColumns, setFunnelColumns] = useState([]);
  const typesButton = ["Voronka", "Ustunlar"];
  const heading = ["ID", "Varonka Nomi"];
  const heading2 = ["ID", "Ustunlar Nomi"];
  const client = useApolloClient();
  const currentColor = useCurrentColor();
  let funnelColumnsLoading;
  let funnelColumnsError;

  // get funnel Columns
  const fetchFunnelColumns = async (funnelId) => {
    try {
      const { data, loading, error } = await client.query({
        query: GET_FUNNEL_COLUMNS,
        variables: { id: funnelId },
      });
      setFunnelColumns(data?.funnelColumns);
      funnelColumnsError = error;
      funnelColumnsLoading = loading;
    } catch (error) {
      console.log(error);
    }
  };
  // get funnels
  const {
    data: funnelData,
    error: funnelError,
    loading: funnelLoading,
  } = useQuery(GET_FUNNEL);

  // delete funnel
  const [deleteFunnel, { loading: deleteFunnelLoading }] = useMutation(
    DELETE_FUNNEL,
    {
      update(cache, { data: { deleteFunnel } }) {
        cache.modify({
          fields: {
            funnel(existingFunnel = []) {
              return existingFunnel.filter((funnel) => {
                return funnel.funnelId !== deleteFunnel.funnelId;
              });
            },
          },
        });
      },
      refetchQueries: [
        {
          query: GET_FUNNEL,
        },
      ],
    }
  );

  // delete funnel column
  const [deleteFunnelColumn, { loading: deleteFunnelColumnLoading }] =
    useMutation(DELETE_FUNNEL_COLUMN, {
      update(cache, { data: { deleteFunnelColumn } }) {
        cache.modify({
          fields: {
            funnelColumn(existingFunnelColumn = []) {
              return existingFunnelColumn.filter((funnelColumn) => {
                return (
                  funnelColumn.funnelColumnId !==
                  deleteFunnelColumn.funnelColumnId
                );
              });
            },
          },
        });
      },
      refetchQueries: [
        {
          query: GET_FUNNEL_COLUMNS,
          variables: { id: funnelColumnId },
        },
      ],
    });
  // remove form modal
  window.addEventListener("click", (e) => {
    const el = e.target.getAttribute("data-name");
    if (el === "overlay") {
      setShowAddForm(false);
      setShowFunnelUpdateForm(false);
    }
  });
  return (
    <div className="relative">
      <Navbar
        navHeading={"Lidlar"}
        buttonContent={`${changeTable} qo'shish`}
        setShowForm={() => {
          showAddForm ? setShowAddForm(false) : setShowAddForm(true);
        }}
      />
      <section>
        <div className="flex items-center mb-[20px]">
          {typesButton.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setChangeTable(item);
              }}
              className={`${
                changeTable === item
                  ? "bg-blueTifany text-white "
                  : `${currentColor.text} ${currentColor.bg}`
              } mr-[10px] px-[12px] py-[8px] text-[15px] font-normal text-center leading-[18px] tracking-[-0.23px] uppercase rounded-[6px] duration-300`}
            >
              {item}
            </button>
          ))}
          <div
            className={`${
              changeTable === "Ustunlar" ? "visible" : "invisible"
            } relative ml-[13%] ${
              currentColor.bg
            } ${currentColor.text} px-[12px] py-[8px]  rounded-[6px]`}
          >
            <button
              className="flex items-center text-[15px] font-normal text-center leading-[18px] tracking-[-0.23px] uppercase"
              onClick={() =>
                showFunnelList
                  ? setShowFunnelList(false)
                  : setShowFunnelList(true)
              }
            >
              <span className="mr-[10px]">Varonka</span>
              <span className="w-[24px] h-[24px]">
                <ChevronBottomIcon className={`${currentColor.text} w-full h-full`}/>
              </span>
            </button>

            <ul
              className={`${
                showFunnelList
                  ? "visible top-[110%]"
                  : "invisible top-[-10%] opacity-0"
              } absolute z-10  duration-150 left-0 w-full drop-shadow-xl  ${
                currentColor.bg
              } ${currentColor.text} px-[8px] py-[8px] text-[12px] font-normal text-left leading-[18px] tracking-[-0.23px] uppercase rounded-[6px]`}
            >
              {funnelData?.funnels.map((funnel, id) => (
                <li
                  key={id}
                  onClick={() => {
                    fetchFunnelColumns(funnel.funnelId);
                    setFunnelColumnId(funnel.funnelId);
                    setShowFunnelList(false);
                  }}
                  className="border-b border-b-grayLight cursor-pointer last:border-0"
                >
                  {funnel.funnelName}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {changeTable === "Voronka" ? (
          <TablesTemplate
            loading={funnelLoading}
            error={funnelError}
            headings={heading}
            deleteItem={deleteFunnel}
            deleteLoading={deleteFunnelLoading}
            sections={funnelData?.funnels}
            idFieldName={"funnelId"}
            moreBtnExist={true}
            setShowUpdateFrom={(e) => {
              setFunnelId(e);
              setShowFunnelUpdateForm(true);
            }}
          />
        ) : (
          <div>
            {funnelColumns?.length !== 0 ? (
              <TablesTemplate
                loading={funnelColumnsLoading}
                error={funnelColumnsError}
                headings={heading2}
                deleteItem={deleteFunnelColumn}
                deleteLoading={deleteFunnelColumnLoading}
                sections={funnelColumns}
                idFieldName={"funnelColumnId"}
                dataException1={"funnelColumnColor"}
                dataException2={"funnelColumnOrder"}
                dataException3={"funnelId"}
                moreBtnExist={true}
                setShowUpdateFrom={(e) => {
                  setFunnelId(e);
                  setShowFunnelUpdateForm(true);
                }}
              />
            ) : (
              ""
            )}
          </div>
        )}
      </section>

      {changeTable === "Voronka" ? (
        <>
          <AddingFunnel
            addShowForm={showAddForm}
            closeModal={() => setShowAddForm(false)}
          />
          <UpdateFunnel
            showAddForm={showFunnleUpdateForm}
            closeModal={() => setShowFunnelUpdateForm(false)}
            funnelId={funnelId}
          />
        </>
      ) : (
        <>
          <AddingFunnelColumn
            showAddForm={showAddForm}
            funnelId={funnelColumnId}
            closeModal={() => setShowAddForm(false)}
          />
          <UpdateFunnelColumn
            showAddForm={showFunnleUpdateForm}
            closeModal={() => setShowFunnelUpdateForm(false)}
            funnelId={funnelId}
            funnelColumnId={funnelColumnId}
          />
        </>
      )}
    </div>
  );
};

export default LeadSetting;
