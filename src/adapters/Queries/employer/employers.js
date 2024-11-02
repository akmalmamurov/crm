import { gql } from "@apollo/client";

export const GET_EMPLOYERS = gql`
  query {
    employers {
      employerId
      employerName
      employerPosition
      employerPhone
      employerBirthday
      employerGender
      employerUseLang
      employerCreatedAt
      employerDeletedAt
      employerBranchId
    }
  }
`;
