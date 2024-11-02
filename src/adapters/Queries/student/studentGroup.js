import { gql } from "@apollo/client";

export const STUDENT_GROUP = gql`
  query ($id: String) {
    studentGroups(studentId: $id) {
      groupName
      employerName
      groupDays
      roomName
    }
  }
`;
