import { gql } from "@apollo/client";

export const CREATE_FUNNEL = gql`
mutation addFunnel($name:String!) {
    addFunnel(input:{
        funnelName: $name
    }) {
        funnelId
        funnelName
    }
}
`