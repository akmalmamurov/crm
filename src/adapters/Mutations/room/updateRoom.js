import { gql } from "@apollo/client";

export const UPDATE_ROOM = gql`
 mutation updateRoom($id:String!, $name:String!){
    updateRoom(input: {
        roomId: $id
        roomName: $name
    }) {
        roomId
        roomName
    }
 }
`