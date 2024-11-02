import { gql } from "@apollo/client";

export const RETURN_STUDENT_PAYMENT = gql`
mutation returnStudentPayment(
    $id: ID!
    $amount: Float!
    $type: String!
    $payedAt: String
) {
    returnStudentCash(input: {
        studentId: $id
        cashAmount: $amount
        paymentType: $type
        payedAt: $payedAt
    })
}
`