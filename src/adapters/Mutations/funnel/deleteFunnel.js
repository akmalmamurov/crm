import { gql } from "@apollo/client";

export const DELETE_FUNNEL = gql`
mutation deleteFunnel($id:String){
    deleteFunnel(Id:$id) {
        funnelId
        funnelName
    }
}
`