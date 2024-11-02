import { gql } from "@apollo/client";

export const UPDATE_STUDENT = gql`
mutation updateStudent(
    $id:String
    $name:String
    $phone:String
    $bithday:String
    $gender:Int
    $parentsInfo:[ParentInput]
) {
    updateStudent(input: {
        studentId:$id
        studentName:$name
        studentPhone:$phone
        studentBithday:$bithday
        studentGender:$gender
        parentsInfo:$parentsInfo
    }) {
        studentId
        studentName
        studentPhone
        studentBithday
        studentGender
        parentsInfo{
            parentName
            parentPhone
        }
    }
}
`