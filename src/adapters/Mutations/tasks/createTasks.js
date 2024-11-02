import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation addTask(
    $taskTitle: String!
    $taskBody: String!
    $taskEndDate: String
    $taskType: Int
    $taskToColleagueId: String!
  ) {
    addTask(
      input: {
        taskTitle: $taskTitle
        taskBody: $taskBody
        taskEndDate: $taskEndDate
        taskType: $taskType
        taskToColleagueId: $taskToColleagueId
      }
    ) {
      taskId
      taskTitle
      taskBody
      taskEndDate
      taskType
      taskColleagueId
    }
  }
`;
