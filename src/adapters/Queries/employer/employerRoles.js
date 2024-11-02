import { gql } from "@apollo/client";


export const GET_EMPLOYERS_ROLES = gql`
query {
  employerRoles
}
`
export const GET_EMPLOYER_PERMISSION = gql`
query ($role:String) {
    employerPermissions(employerRole:$role)
}
`