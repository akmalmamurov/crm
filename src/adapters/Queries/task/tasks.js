import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query {
    tasks {
      taskId
      taskTitle
      taskBody
      taskEndDate
      taskType
      taskFromColleagueName
      taskColleagueName
    }
  }
`;
