import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
  query {
    rooms {
      roomId
      roomName
    }
  }
`;
