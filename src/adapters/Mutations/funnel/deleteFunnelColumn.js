import { gql } from "@apollo/client";

export const DELETE_FUNNEL_COLUMN = gql`
mutation deleteFunnelColumn ($id:String!) {
    deleteFunnelColumn(Id:$id) {
        funnelColumnId
        funnelColumnName
        funnelColumnColor
        funnelColumnOrder
        funnelId
    }
}
`