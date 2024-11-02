import { gql } from "@apollo/client";

export const CREATE_FUNNEL_COLUMN = gql`
mutation addFunnelColumn($id:ID!, $name:String!, $color:String!) {
    addFunnelColumn (input: {
      funnelId: $id
      funnelColumnName:$name
      funnelColumnColor:$color
    }) {
      funnelId
      funnelColumnId
      funnelColumnName
      funnelColumnColor
    }
}
`;
