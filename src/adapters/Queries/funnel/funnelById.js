import { gql } from "@apollo/client";

export const GET_FUNNEL_BY_ID = gql`
 query ($id:String) {
    funnelById(Id:$id) {
        funnelId
        funnelName
    }
 }
`