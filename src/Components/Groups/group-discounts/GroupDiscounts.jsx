import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_GROUP_DISCOUNTS } from "../../../adapters/Queries/group/groupDiscount";
import TablesTemplate from "../../TablesTemplate";
import AddGroupDiscounts from "./AddGroupDiscounts";
import DeleteModal from "@/Components/DeleteModal";
import RemoveModal from "@/Components/RemoveModal";
import { RETURN_GROUP_DISCOUNT } from "@/adapters/Mutations/group/returnGroupDiscount";

const GroupDiscounts = ({ id }) => {
  const [showGroupDiscount, setShowGroupDiscount] = useState(false);
  const [returnModal, setReturnModal] = useState(false)
  const [studentId, setStudentId] = useState("");
  const {
    data: groupDiscountsData,
    loading: groupDiscountsLoading,
    error: groupDiscountsError,
  } = useQuery(GET_GROUP_DISCOUNTS, {
    variables: {
      id,
    },
  });

  const [returnDiscount, {loading:discountLoading, error:discountError}] = useMutation(RETURN_GROUP_DISCOUNT, {
    refetchQueries: [
      {
        query:GET_GROUP_DISCOUNTS,
        variables: {id}
      }
    ]
  })

  const moreBtnData = [
    {
      text: "Chegirma berish",
      click: (item) => {
        setShowGroupDiscount(true);
        setStudentId(item);
      },
    },
    {
      text: "Chegirmani olib tashlash",
      click: (item) => {
        setReturnModal(true)
        setStudentId(item);
      },
    },
  ];

  const groupDiscountHeadings = ["№", "F.I.O", "Telefon raqam", "Chegirma"];

  window.addEventListener("click", (e) => {
    const el = e.target.getAttribute("data-name");
    if (el === "overlay") {
      setShowGroupDiscount(false);
    }
  });

  return (
    <>
      <TablesTemplate
        loading={groupDiscountsLoading}
        error={groupDiscountsError}
        headings={groupDiscountHeadings}
        sections={groupDiscountsData?.groupDiscounts}
        idFieldName={"studentId"}
        moreBtnExist={true}
        moreBtnData={moreBtnData}
      />
      <RemoveModal
        returnModal={returnModal}
        setReturnModal={setReturnModal}
        returnItem={returnDiscount}
        returnLoading={discountLoading}
        itemId={studentId}
        groupId={id}
        text={"chegirmani olib tashlash istaysizmi"}
        closeMoreModal={() => setStudentId("")}
      />
      <AddGroupDiscounts
        showGroupDiscount={showGroupDiscount}
        studentId={studentId}
        setShowGroupDiscount={setShowGroupDiscount}
      />
    </>
  );
};

export default GroupDiscounts;
