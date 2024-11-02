import { gql } from "@apollo/client";

export const TRANSFER_STUDENT = gql`
 mutation transferStudent(
  $studentId:ID!
  $groupId:ID!
  $toGroupId: ID!
  $addedDate:String!
) {
  changeStudentGroup(input: {
    studentId:$studentId
    fromGroupId:$groupId
    toGroupId:$toGroupId
    addedDate:$addedDate
  })
}
`;
