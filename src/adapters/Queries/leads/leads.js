import { gql } from "@apollo/client";

export const GET_LEADS = gql`
  query ($id: ID!) {
    leads(funnelId: $id) {
      leadList {
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
      funnelColumnList {
        funnelColumnId
        funnelColumnName
        funnelColumnColor
        funnelColumnOrder
        funnelId
      }
    }
  }
`;
