import { gql } from "@apollo/client";

export const UPDATE_GROUP_ATTENDANCE_STATUS = gql`
  mutation updateGroupAttendanceStatus(
    $attendId: ID!
    $groupId: ID!
    $attendStatus: Int!
  ) {
    updateGroupAttendanceStatus(
      input: {
        attendId: $attendId
        groupId: $groupId
        attendStatus: $attendStatus
      }
    )
  }
`;
