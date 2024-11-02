import { gql } from "@apollo/client";

export const UPDATE_LEAD_COLUMN = gql`
  mutation updateLeadColumn(
    $leadId: String!
    $columnId: ID!
    $orderNumber: Int
  ) {
    updateLeadColumn(
      input: { leadId: $leadId, columnId: $columnId, orderNumber: $orderNumber }
    ) {
      leadId
      leadName
      leadPhone
      leadStatus
      leadOrder
      columnId
      courseId
      courseName
      colleagueId
    }
  }
`;
