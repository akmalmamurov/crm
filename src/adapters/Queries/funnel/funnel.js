import { gql } from "@apollo/client";

export const GET_FUNNEL = gql`
query {
    funnels{
        funnelId
        funnelName
    }
}
`