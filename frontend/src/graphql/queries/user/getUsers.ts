import { gql } from "@apollo/client";

export const getUsersQuery = gql`
  query GetUsers {
    getUsers {
      id
      createdDate
      updatedDate
      discordId
      username
      role
      servers {
        id
        createdDate
        updatedDate
        name
        pid
        displayName
      }
    }
  }
`;
