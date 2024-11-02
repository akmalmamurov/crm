import { gql } from "@apollo/client";

export const GET_COST_BY_ID = gql`
query ($id:String) {
    costById(Id:$id) {
        costId
        costName
        costType
        costPrice
        costPayedAt
        costCreated
    }
}
`