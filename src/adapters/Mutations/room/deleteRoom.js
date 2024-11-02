import { gql } from "@apollo/client";

export const DELETE_ROOM = gql`
mutation deleteRoom($id:String!) {
    deleteRoom(roomId:$id) {
        roomId
        roomName
    }
}
`