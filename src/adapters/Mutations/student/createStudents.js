import { gql } from "@apollo/client";

export const CREATE_STUDENTS = gql`
  mutation addStudent(
    $name: String!
    $phone: String!
    $gender: Int
    $birthday: String
    $groupId: String
    $date: String
    $status: Int
    $parent: [ParentInput]
  ) {
    addStudent(
      input: {
        studentName: $name
        studentPhone: $phone
        studentStatus: $status
        studentBithday: $birthday
        studentGender: $gender
        groupId: $groupId
        addedDate: $date
        parentsInfo: $parent
      }
    ) {
      studentId
      studentName
      studentPhone
      studentStatus
      studentStatus
      studentBalance
      colleagueId
      studentBithday
      studentGender
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
