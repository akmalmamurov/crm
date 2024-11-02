import { gql } from "@apollo/client";

export const CREATE_STUDENT_PAYMENT = gql`
mutation addStudentCash(
    $id:ID!
    $amount: Float!
    $type: String!
    $payedAt:String
) {
    addStudentCash(input:{
        studentId:$id
        cashAmount:$amount
        paymentType:$type
        payedAt:$payedAt
    }) {
        studentCashId
        studentId
        studentName
        employerName
        checkNumber
        cashAmount
        paymentType
        payedAt
        createdAt
    }
}
`