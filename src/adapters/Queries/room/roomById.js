import { gql } from "@apollo/client";

export const GET_ROOM_BY_ID = gql`
query($id:String!){
    roomById(Id: $id) {
        roomId
        roomName
    }
}
`