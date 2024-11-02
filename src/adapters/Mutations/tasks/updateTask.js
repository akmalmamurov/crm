import { gql } from "@apollo/client";

export const UPDATE_TASK = gql`
 mutation updateTask(
    $id:String
    $title:String
    $body:String
    $startDate:String
    $endDate:String
    $type:Int
    $fromColleagueId:String
 ) {
    updateTask (input: {
        taskId:$id
        taskTitle:$title
        taskBody:$body
        taskStartDate:$startDate
        taskEndDate:$endDate
        taskType:$type
        taskFromColleagueId:$fromColleagueId
    }) {
        taskId
        taskTitle
        taskBody
        taskStartDate
        taskEndDate
        taskType
        taskFromColleagueId
    }
 }
`