import { gql } from "@apollo/client";

export const GET_GROUP_DISCOUNTS = gql`
  query ($id: String!) {
    groupDiscounts(groupId: $id) {
      studentId
      studentName
      studentPhone
      #   groupId
      discountAmount
      #   discountType
      #   discountStartDate
      #   discountEndDate
    }
  }
`;
