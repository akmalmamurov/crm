import { gql } from "@apollo/client";

export const RETURN_GROUP_DISCOUNT = gql`
mutation returnGroupDiscount(
    $id: String!
    $groupId: String!
) {
    removeGroupDiscount(input: {
        studentId: $id
        groupId: $groupId
    }) {
        studentId
        studentName
        studentPhone
        groupId
        discountAmount
        discountType
        discountStartDate
        discountEndDate
    }
}
`