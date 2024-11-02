import { gql } from "@apollo/client";

export const GET_STUDENTS = gql`
  query ($page: Int!, $count: Int!) {
    students(page: $page, count: $count) {
      studentId
      studentName
      studentPhone
      studentStatus
      studentBalance
      colleagueId
      studentBithday
      parentsInfo {
        parentName
        parentPhone
      }
      studentGroup {
        groupId
        groupName
        colleagueName
        lessonStartTime
      }
    }
  }
`;
