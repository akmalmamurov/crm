import { gql } from "@apollo/client";

export const UPDATE_STUDENT_ADDED_DATE = gql`
  mutation updateStudentAddedGroupDate(
    $studentId: ID!
    $groupId: ID!
    $addedDate: String!
  ) {
    updateStudentAddedGroupDate(
      input: { studentId: $studentId, groupId: $groupId, addedDate: $addedDate }
    )
  }
`;
