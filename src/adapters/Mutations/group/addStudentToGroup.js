import { gql } from "@apollo/client";

export const ADD_STUDENT_GROUP = gql`
  mutation addStudentGroup(
    $studentId: ID!
    $groupId: ID!
    $addedDate: String!
  ) {
    addStudentGroup(
      input: { 
        studentId: $studentId,
        groupId: $groupId, 
        addedDate: $addedDate 
      }
    )
  }
`;
