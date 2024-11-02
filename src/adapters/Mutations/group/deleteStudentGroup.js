import { gql } from "@apollo/client";

export const DELETE_STUDENT_GROUP = gql`
 mutation ($id:ID!, $groupId:ID!) {
    deleteStudentGroup (input:{
        studentId:$id
        groupId:$groupId
    })
 }
`