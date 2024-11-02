import { gql } from "@apollo/client";

export const UPDATE_COURSE = gql`
mutation updateCourse(
    $id:String!
    $name:String!
    $price:Float!
    $duration:Int!
    $durationLesson:Int!
) {
    updateCourse(input: {
        courseId:$id
        courseName:$name
        coursePrice:$price
        courseDuration:$duration
        courseDurationLesson:$durationLesson
    }){ 
        courseId
        courseName
        coursePrice
        courseDuration
        courseDurationLesson
    }
}
`