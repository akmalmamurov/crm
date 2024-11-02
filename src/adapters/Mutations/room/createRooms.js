import { gql } from "@apollo/client";

export const CREATE_ROOMS = gql`
  mutation addRoom($roomName: String!) {
    addRoom(input: { roomName: $roomName }) {
      roomId
      roomName
    }
  }
`;
