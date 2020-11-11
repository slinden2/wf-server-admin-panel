import { gql } from "@apollo/client";

export const setDisplayNameMutation = gql`
  mutation SetDisplayName($serverId: String!, $name: String!) {
    setDisplayName(data: { serverId: $serverId, name: $name }) {
      id
      createdDate
      updatedDate
      name
      pid
      displayName
    }
`;
