import { gql } from "@apollo/client";

export const DELETE_LEAD = gql`
  mutation ($leadId: String!) {
    dateteLead(leadId: $leadId) {
      leadId
    }
  }
`;
