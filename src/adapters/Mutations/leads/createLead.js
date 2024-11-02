import { gql } from "@apollo/client";

export const CREATE_LEAD = gql`
  mutation addLead(
    $leadName: String!
    $leadPhone: String!
    $columnId: ID!
    $courseId: ID!
  ) {
    addLead(
      input: {
        leadName: $leadName
        leadPhone: $leadPhone
        columnId: $columnId
        courseId: $courseId
      }
    ) {
      leadId
      leadName
      leadPhone
      leadStatus
      columnId
      courseId
      courseName
      colleagueId
      colleagueName
    }
  }
`;
