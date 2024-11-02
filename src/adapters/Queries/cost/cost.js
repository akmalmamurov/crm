import { gql } from "@apollo/client";

export const GET_COST = gql`
 query ($startDate:String $endDate:String){
    costs (startDate:$startDate endDate:$endDate) {
        Costs{
            costId
            costName
            costType
            costPrice
            costPayedAt
            costCreated
          }
          Sum
    }
 }
`