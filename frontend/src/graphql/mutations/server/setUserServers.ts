import { gql } from "@apollo/client";

export const setUserServersMutation = gql`
  mutation SetUserServers($userId: String!, $serverIds: [String!]!) {
    setUserServers(data: { userId: $userId, serverIds: $serverIds })
`;
