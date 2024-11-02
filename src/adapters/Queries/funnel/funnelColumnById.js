import { gql } from "@apollo/client";

export const GET_FUNNEL_COLUMN_BY_ID =gql`
query($id:String!) {
    funnelColumnById(funnelColumnId:$id){
       funnelColumnId
       funnelColumnName
       funnelColumnColor
       funnelColumnOrder
       funnelId
    }
}
`