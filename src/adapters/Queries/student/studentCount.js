import { gql } from "@apollo/client";

export const GET_STUDENTS_COUNT = gql`
  query {
    studentCount
  }
`;
