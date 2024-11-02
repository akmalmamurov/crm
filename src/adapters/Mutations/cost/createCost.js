import { gql } from "@apollo/client";

export const CREATE_COST = gql`
 mutation addCost(
    $name:String!
    $type: String!
    $price:Int!
    $colleagueId:String!
    $payedAt:String!
 ) {
    addCost(input: {
      costName:$name
      costType:$type
      costPrice:$price
      costColleagueId:$colleagueId
      costPayedAt:$payedAt
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