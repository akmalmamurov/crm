import { gql } from "@apollo/client";

export const DELETE_COST = gql`
mutation deleteCost($id:String) {
    deleteCost(Id:$id) {
      costId
      costName
      costType
      costPrice
      costPayedAt
      costCreated
    }
}
`