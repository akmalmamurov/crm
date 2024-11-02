import { gql } from "@apollo/client";

export const DELETE_GROUP = gql`
  mutation deleteGroup($id: String) {
    deleteGroup(Id: $id) {
      groupId
      groupName
    }
  }
`;
