import { gql } from "@apollo/client";

export const DELETE_STUDENT = gql`
  mutation deleteStudent($id: String) {
    deleteStudent(studentId: $id) {
      studentId
      studentName
    }
  }
`;
