import { gql } from "@apollo/client";

export const GET_CALENDAR = gql`
  query ($startDate: String!, $endDate: String!) {
    findCalendar(startDate: $startDate, endDate: $endDate) {
      date
      groups {
        groupName
        employerName
        groupDays
        roomName
        courseName
        startTime
        endTime
        studentCount
      }
    }
  }
`;
