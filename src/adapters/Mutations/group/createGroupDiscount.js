import { gql } from "@apollo/client";

export const CREATE_GROUP_DISCOUNTS = gql`
  mutation addGroupDiscount(
    $studentId: String!
    $groupId: String!
    $discountAmount: Float!
    $discountType: Int!
    $discountStartDate: String
    $discountEndDate: String
  ) {
    addGroupDiscount(
      input: {
        studentId: $studentId
        groupId: $groupId
        discountAmount: $discountAmount
        discountType: $discountType
        discountStartDate: $discountStartDate
        discountEndDate: $discountEndDate
      }
    ) {
      studentId
      studentName
      studentPhone
      groupId
      discountAmount
      discountType
    }
  }
`;
