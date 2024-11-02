import { gql } from "@apollo/client";

export const UPDATE_FUNNEL = gql`
mutation updateFunnel(
    $id:ID!
    $name:String!
) {
    updateFunnel(input: {
        funnelId:$id
        funnelName:$name
    }) {
        funnelId
        funnelName
    }
}
`