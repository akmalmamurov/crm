import { gql } from "@apollo/client";

export const GET_FUNNEL_COLUMNS = gql`
query ($id:ID!) {
  funnelColumns(funnelId: $id) {
    funnelColumnId
    funnelColumnName
    funnelColumnColor
    funnelId
    funnelColumnOrder
  }
} 
`