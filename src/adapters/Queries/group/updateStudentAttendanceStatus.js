import { gql } from "@apollo/client";

export const UPDATE_STUDENT_ATTENDANCE_STATUS = gql`
  mutation updateStudentAttendanceStatus(
    $attendId: ID!
    $groupId: ID!
    $attendStatus: Int!
    $studentId: ID!
  ) {
    updateStudentAttendanceStatus(
      input: {
        attendId: $attendId
        groupId: $groupId
        attendStatus: $attendStatus
        studentId: $studentId
      }
    )
  }
`;
