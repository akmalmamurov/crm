import { gql } from "@apollo/client";

export const STUDENT_PAYMENTS = gql`
  query ($id: ID!, $type: Int!, $startDate: String, $endDate: String) {
    studentPayments(
      studentId: $id
      type: $type
      startDate: $startDate
      endDate: $endDate
    ) {
      studentCash {
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
      PaymentHistory {
        paymentHistoryId
        paymentHistoryDebit
        paymentHistoryCredit
        paymentHistoryType
        paymentHistoryColleagueName
        paymentHistoryPayed
        paymentHistoryCreated
      }
    }
  }
`;
