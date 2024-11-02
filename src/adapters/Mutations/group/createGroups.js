import { gql } from "@apollo/client";

export const CREATE_GROUPS = gql`
  mutation addGroup(
    $groupName: String!
    $courseId: ID!
    $employerId: ID!
    $roomId: ID!
    $startTime: String!
    $endTime: String!
    $startDate: String!
    $endDate: String!
    $lessonCount: Int!
    $groupDays: [Int]
  ) {
    addGroup(
      input: {
        groupName: $groupName
        courseId: $courseId
        employerId: $employerId
        roomId: $roomId
        startTime: $startTime
        endTime: $endTime
        startDate: $startDate
        endDate: $endDate
        lessonCount: $lessonCount
        groupDays: $groupDays
      }
    ) {
      groupId
      groupName
      courseId
      employerId
      startTime
      endTime
      startDate
      endDate
      roomId
    }
  }
`;
