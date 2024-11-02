import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query {
    courses {
      courseId
      courseName
      coursePrice
      courseDuration
      courseDurationLesson
    }
  }
`;
