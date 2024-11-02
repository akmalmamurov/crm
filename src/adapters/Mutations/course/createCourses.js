import { gql } from "@apollo/client";

export const CREATE_COURSES = gql`
  mutation addCourse(
    $courseName: String!
    $coursePrice: Float!
    $courseDuration: Int!
    $courseDurationLesson: Int!
  ) {
    addCourse(
      input: {
        courseName: $courseName
        coursePrice: $coursePrice
        courseDuration: $courseDuration
        courseDurationLesson: $courseDurationLesson
      }
    ) {
      courseId
      courseName
      coursePrice
      courseDuration
      courseDurationLesson
    }
  }
`;
