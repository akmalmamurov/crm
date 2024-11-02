import { gql } from "@apollo/client";

export const UPDATE_COST = gql`
mutation updateCost(
    $id: String!
    $name:String
    $type:String
    $price:Int
    $payedAt:String
    $colleagueId:String
) {
    updateCost(input: {
        costId:$id
        costName:$name
        costType:$type
        costPrice:$price
        costPayedAt:$payedAt
        costColleagueId: $colleagueId
    }) {
        costId
        costName
        costType
        costPrice
        costPayedAt
        costCreated
    }
}
`