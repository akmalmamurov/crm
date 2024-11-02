import { gql } from "@apollo/client";

export const GET_GROUPS_ATTENDANCE_BY_ID = gql`
  query ($id: String!, $month:String!) {
    groupAttendenceByIdOrDate(
      Id: $id
      month:$month
    ) {
      groupAttendence {
        attendId
        attendDay
        attendStatus
        groupId
      }
      studentsAttendence {
        studentId
        studentName
        attendence {
          attendId
          attendDay
          attendStatus
          groupId
        }
      }
    }
  }
`;
