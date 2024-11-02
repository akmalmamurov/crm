import { gql } from "@apollo/client";

export const GET_GROUPS = gql`
  query ($page: Int!, $count: Int!, $isArchive: Boolean!) {
    groups(page: $page, count: $count, isArchive: $isArchive) {
      groupId
      groupName
      employerName
      groupDays
      startDate
      endDate
      startTime
      endTime
      roomName
      studentCount
    }
  }
`;
