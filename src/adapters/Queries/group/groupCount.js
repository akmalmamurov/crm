import { gql } from "@apollo/client";

export const GET_GROUPS_COUNT = gql`
  query ($isArchive: Boolean!) {
    groupCount(isArchive: $isArchive)
  }
`;
