import { gql } from "@apollo/client";

export const CREATE_EMPLOYERS = gql`
  mutation addEmployer(
    $employerName: String!
    $employerPhone: String!
    $employerPosition: String!
    $employerPassword: String!
  ) {
    addEmployer(
      input: {
        employerName: $employerName
        employerPhone: $employerPhone
        employerPosition: $employerPosition
        employerPassword: $employerPassword
      }
    ) {
      employerId
      employerName
      employerPhone
      employerPosition
      employerBirthday
      employerGender
      employerUseLang
      employerDeletedAt
      employerBranchId
    }
  }
`;
