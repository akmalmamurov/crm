import { gql } from "@apollo/client";

export const DELETE_COURSE = gql`
mutation deleteCourse($id:String!){
    deleteCourse(courseId:$id) {
        courseId
        courseName
        coursePrice
        courseDuration
        courseDurationLesson
    }
}
`