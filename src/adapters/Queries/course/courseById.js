import { gql } from "@apollo/client";

export const GET_COURSE_BY_ID = gql`
query($id:String!){
    coursById(Id:$id){
        courseId
        courseName
        coursePrice
        courseDuration
        courseDurationLesson
    }
}
`