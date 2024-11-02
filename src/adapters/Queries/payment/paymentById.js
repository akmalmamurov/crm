import { gql } from "@apollo/client";

export const GET_PAYMENT_BY_ID = gql`
query ($id:ID!) {
    paymentById (Id: $id) {
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