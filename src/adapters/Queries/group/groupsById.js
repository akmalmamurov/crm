import { gql } from "@apollo/client";

export const GET_GROUPS_BY_ID = gql`
  query ($Id: String) {
    groupByIdOrDate(Id: $Id) {
      groupId
      groupName
      courseId
      courseName
      employerName
      roomId
      roomName
      startDate
      endDate
      startTime
      endTime
      groupDays
      students {
        studentId
        studentStatus
        studentName
        studentBalance
        studentAddDate
      }
    }
  }
`;
