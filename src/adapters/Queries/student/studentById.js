import { gql } from "@apollo/client";

export const GET_STUDENT_BY_ID = gql`
  query ($Id: String) {
    studentById(Id: $Id) {
        studentName
        studentPhone
        studentGender
        studentBithday
        parentsInfo{
          parentName
          parentPhone
        }
        studentGroup{
          groupId
          groupName
          colleagueName
          lessonStartTime
        }
    }
  }
`