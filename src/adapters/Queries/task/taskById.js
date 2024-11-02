import { gql } from "@apollo/client";

export const GET_TASK_BY_ID = gql`
 query ($id: String!) {
   taskById(Id: $id) {
    taskId
    taskTitle
    taskBody
    taskStartDate
    taskEndDate
    taskType
    taskFromColleagueId
    taskColleagueId
    taskColleagueName
   }
 }
`