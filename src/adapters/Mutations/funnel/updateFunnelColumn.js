import { gql } from "@apollo/client";

export const UPDATE_FUNNEL_COLUMN = gql`
mutation updateFunnelColumn(
    $columnId:String!
    $name:String!
    $order:Int!
    $color:String!
    $id:ID!
) {
    updateFunnelColumn(
        input: {
         funnelColumnId:$columnId
         funnelColumnName:$name
         funnelColumnOrder:$order
         funnelColumnColor:$color
         funnelId: $id
        }
    ) {
       funnelColumnId
       funnelColumnName
       funnelColumnOrder
       funnelColumnColor
       funnelId
    }
}
`