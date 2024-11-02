import { gql } from "@apollo/client";

export const FREEZE_STUDENT_GROUP = gql`
mutation freezeStudentGroup(
    $id: ID!
    $groupId:ID!
) {
    freezeStudentGroup( input:{
        studentId: $id
        groupId: $groupId
    })
}
`