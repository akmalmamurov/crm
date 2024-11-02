import { gql } from "@apollo/client";

export const UPDATE_GROUP = gql`
mutation (
    $id: ID!
    $name: String
    $courseId: ID
    $employerId: ID
    $roomId: ID
    $startDate: String
    $endDate: String
    $startTime: String
    $endTime: String
    $lessonCount: Int
    $groupDays: [Int]
) {
    updateGroup (input: {
        groupId: $id
        groupName: $name
        courseId: $courseId
        employerId: $employerId
        roomId: $roomId
        startDate: $startDate
        endDate: $endDate
        startTime: $startTime
        endTime: $endTime
        lessonCount: $lessonCount
        groupDays: $groupDays
    }) {
        groupId
        groupName
        courseId
        courseName
        employerId
        employerName
        roomId
        roomName
        startDate
        endDate
        startTime
        endTime
        studentCount
        groupDays
    }
}
`