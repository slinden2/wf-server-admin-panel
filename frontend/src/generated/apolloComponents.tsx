import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getUsers?: Maybe<Array<User>>;
  me?: Maybe<User>;
  getLog?: Maybe<Scalars['String']>;
  getConfig?: Maybe<Scalars['String']>;
  getServers?: Maybe<Array<Server>>;
};


export type QueryGetLogArgs = {
  numOfRows?: Maybe<Scalars['Float']>;
  serverId: Scalars['String'];
};


export type QueryGetConfigArgs = {
  serverId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
  discordId: Scalars['String'];
  username: Scalars['String'];
  role: Scalars['String'];
  servers: Array<Server>;
};


export type Server = {
  __typename?: 'Server';
  id: Scalars['ID'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
  name: Scalars['String'];
  pid: Scalars['Float'];
  displayName?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<EncodeResult>;
  setUserServers: Array<ServerUser>;
  setDisplayName: Server;
  runCommand: Scalars['Boolean'];
  saveConfig: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  code: Scalars['String'];
};


export type MutationSetUserServersArgs = {
  data: SetUserServersInput;
};


export type MutationSetDisplayNameArgs = {
  data: SetDisplayNameInput;
};


export type MutationRunCommandArgs = {
  data: RunCommandInput;
};


export type MutationSaveConfigArgs = {
  newConfig: Scalars['String'];
  serverId: Scalars['String'];
};

export type EncodeResult = {
  __typename?: 'EncodeResult';
  token: Scalars['String'];
  expires: Scalars['Float'];
  issued: Scalars['Float'];
};

export type ServerUser = {
  __typename?: 'ServerUser';
  serverId: Scalars['String'];
  userId: Scalars['String'];
};

export type SetUserServersInput = {
  userId: Scalars['String'];
  serverIds: Array<Scalars['String']>;
};

export type SetDisplayNameInput = {
  serverId: Scalars['String'];
  name: Scalars['String'];
};

export type RunCommandInput = {
  type: Command;
  serverId?: Maybe<Scalars['String']>;
  command?: Maybe<Scalars['String']>;
};

export enum Command {
  Start = 'START',
  Stop = 'STOP',
  Command = 'COMMAND',
  Reboot = 'REBOOT',
  UpdateMods = 'UPDATE_MODS',
  UpdateWfServer = 'UPDATE_WF_SERVER'
}

export type RunCommandMutationVariables = Exact<{
  type: Command;
  serverId?: Maybe<Scalars['String']>;
  command?: Maybe<Scalars['String']>;
}>;


export type RunCommandMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'runCommand'>
);

export type SaveConfigMutationVariables = Exact<{
  serverId: Scalars['String'];
  newConfig: Scalars['String'];
}>;


export type SaveConfigMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'saveConfig'>
);

export type SetDisplayNameMutationVariables = Exact<{
  serverId: Scalars['String'];
  name: Scalars['String'];
}>;


export type SetDisplayNameMutation = (
  { __typename?: 'Mutation' }
  & { setDisplayName: (
    { __typename?: 'Server' }
    & Pick<Server, 'id' | 'createdDate' | 'updatedDate' | 'name' | 'pid' | 'displayName'>
  ) }
);

export type SetUserServersMutationVariables = Exact<{
  userId: Scalars['String'];
  serverIds: Array<Scalars['String']>;
}>;


export type SetUserServersMutation = (
  { __typename?: 'Mutation' }
  & { setUserServers: Array<(
    { __typename?: 'ServerUser' }
    & Pick<ServerUser, 'userId' | 'serverId'>
  )> }
);

export type LoginMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'EncodeResult' }
    & Pick<EncodeResult, 'token' | 'issued' | 'expires'>
  )> }
);

export type GetConfigQueryVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type GetConfigQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getConfig'>
);

export type GetLogQueryVariables = Exact<{
  serverId: Scalars['String'];
  numOfRows?: Maybe<Scalars['Float']>;
}>;


export type GetLogQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getLog'>
);

export type GetServersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServersQuery = (
  { __typename?: 'Query' }
  & { getServers?: Maybe<Array<(
    { __typename?: 'Server' }
    & Pick<Server, 'id' | 'createdDate' | 'updatedDate' | 'name' | 'pid' | 'displayName'>
  )>> }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { getUsers?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'createdDate' | 'updatedDate' | 'discordId' | 'username' | 'role'>
    & { servers: Array<(
      { __typename?: 'Server' }
      & Pick<Server, 'id' | 'createdDate' | 'updatedDate' | 'name' | 'pid' | 'displayName'>
    )> }
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'discordId' | 'username' | 'role'>
    & { servers: Array<(
      { __typename?: 'Server' }
      & Pick<Server, 'id' | 'createdDate' | 'updatedDate' | 'name' | 'pid' | 'displayName'>
    )> }
  )> }
);


export const RunCommandDocument = gql`
    mutation RunCommand($type: Command!, $serverId: String, $command: String) {
  runCommand(data: {serverId: $serverId, type: $type, command: $command})
}
    `;
export type RunCommandMutationFn = ApolloReactCommon.MutationFunction<RunCommandMutation, RunCommandMutationVariables>;

/**
 * __useRunCommandMutation__
 *
 * To run a mutation, you first call `useRunCommandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRunCommandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [runCommandMutation, { data, loading, error }] = useRunCommandMutation({
 *   variables: {
 *      type: // value for 'type'
 *      serverId: // value for 'serverId'
 *      command: // value for 'command'
 *   },
 * });
 */
export function useRunCommandMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RunCommandMutation, RunCommandMutationVariables>) {
        return ApolloReactHooks.useMutation<RunCommandMutation, RunCommandMutationVariables>(RunCommandDocument, baseOptions);
      }
export type RunCommandMutationHookResult = ReturnType<typeof useRunCommandMutation>;
export type RunCommandMutationResult = ApolloReactCommon.MutationResult<RunCommandMutation>;
export type RunCommandMutationOptions = ApolloReactCommon.BaseMutationOptions<RunCommandMutation, RunCommandMutationVariables>;
export const SaveConfigDocument = gql`
    mutation SaveConfig($serverId: String!, $newConfig: String!) {
  saveConfig(serverId: $serverId, newConfig: $newConfig)
}
    `;
export type SaveConfigMutationFn = ApolloReactCommon.MutationFunction<SaveConfigMutation, SaveConfigMutationVariables>;

/**
 * __useSaveConfigMutation__
 *
 * To run a mutation, you first call `useSaveConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveConfigMutation, { data, loading, error }] = useSaveConfigMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *      newConfig: // value for 'newConfig'
 *   },
 * });
 */
export function useSaveConfigMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveConfigMutation, SaveConfigMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveConfigMutation, SaveConfigMutationVariables>(SaveConfigDocument, baseOptions);
      }
export type SaveConfigMutationHookResult = ReturnType<typeof useSaveConfigMutation>;
export type SaveConfigMutationResult = ApolloReactCommon.MutationResult<SaveConfigMutation>;
export type SaveConfigMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveConfigMutation, SaveConfigMutationVariables>;
export const SetDisplayNameDocument = gql`
    mutation SetDisplayName($serverId: String!, $name: String!) {
  setDisplayName(data: {serverId: $serverId, name: $name}) {
    id
    createdDate
    updatedDate
    name
    pid
    displayName
  }
}
    `;
export type SetDisplayNameMutationFn = ApolloReactCommon.MutationFunction<SetDisplayNameMutation, SetDisplayNameMutationVariables>;

/**
 * __useSetDisplayNameMutation__
 *
 * To run a mutation, you first call `useSetDisplayNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDisplayNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDisplayNameMutation, { data, loading, error }] = useSetDisplayNameMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSetDisplayNameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetDisplayNameMutation, SetDisplayNameMutationVariables>) {
        return ApolloReactHooks.useMutation<SetDisplayNameMutation, SetDisplayNameMutationVariables>(SetDisplayNameDocument, baseOptions);
      }
export type SetDisplayNameMutationHookResult = ReturnType<typeof useSetDisplayNameMutation>;
export type SetDisplayNameMutationResult = ApolloReactCommon.MutationResult<SetDisplayNameMutation>;
export type SetDisplayNameMutationOptions = ApolloReactCommon.BaseMutationOptions<SetDisplayNameMutation, SetDisplayNameMutationVariables>;
export const SetUserServersDocument = gql`
    mutation SetUserServers($userId: String!, $serverIds: [String!]!) {
  setUserServers(data: {userId: $userId, serverIds: $serverIds}) {
    userId
    serverId
  }
}
    `;
export type SetUserServersMutationFn = ApolloReactCommon.MutationFunction<SetUserServersMutation, SetUserServersMutationVariables>;

/**
 * __useSetUserServersMutation__
 *
 * To run a mutation, you first call `useSetUserServersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserServersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserServersMutation, { data, loading, error }] = useSetUserServersMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      serverIds: // value for 'serverIds'
 *   },
 * });
 */
export function useSetUserServersMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetUserServersMutation, SetUserServersMutationVariables>) {
        return ApolloReactHooks.useMutation<SetUserServersMutation, SetUserServersMutationVariables>(SetUserServersDocument, baseOptions);
      }
export type SetUserServersMutationHookResult = ReturnType<typeof useSetUserServersMutation>;
export type SetUserServersMutationResult = ApolloReactCommon.MutationResult<SetUserServersMutation>;
export type SetUserServersMutationOptions = ApolloReactCommon.BaseMutationOptions<SetUserServersMutation, SetUserServersMutationVariables>;
export const LoginDocument = gql`
    mutation Login($code: String!) {
  login(code: $code) {
    token
    issued
    expires
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetConfigDocument = gql`
    query GetConfig($serverId: String!) {
  getConfig(serverId: $serverId)
}
    `;

/**
 * __useGetConfigQuery__
 *
 * To run a query within a React component, call `useGetConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConfigQuery({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useGetConfigQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetConfigQuery, GetConfigQueryVariables>) {
        return ApolloReactHooks.useQuery<GetConfigQuery, GetConfigQueryVariables>(GetConfigDocument, baseOptions);
      }
export function useGetConfigLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetConfigQuery, GetConfigQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetConfigQuery, GetConfigQueryVariables>(GetConfigDocument, baseOptions);
        }
export type GetConfigQueryHookResult = ReturnType<typeof useGetConfigQuery>;
export type GetConfigLazyQueryHookResult = ReturnType<typeof useGetConfigLazyQuery>;
export type GetConfigQueryResult = ApolloReactCommon.QueryResult<GetConfigQuery, GetConfigQueryVariables>;
export const GetLogDocument = gql`
    query GetLog($serverId: String!, $numOfRows: Float) {
  getLog(serverId: $serverId, numOfRows: $numOfRows)
}
    `;

/**
 * __useGetLogQuery__
 *
 * To run a query within a React component, call `useGetLogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLogQuery({
 *   variables: {
 *      serverId: // value for 'serverId'
 *      numOfRows: // value for 'numOfRows'
 *   },
 * });
 */
export function useGetLogQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetLogQuery, GetLogQueryVariables>) {
        return ApolloReactHooks.useQuery<GetLogQuery, GetLogQueryVariables>(GetLogDocument, baseOptions);
      }
export function useGetLogLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLogQuery, GetLogQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetLogQuery, GetLogQueryVariables>(GetLogDocument, baseOptions);
        }
export type GetLogQueryHookResult = ReturnType<typeof useGetLogQuery>;
export type GetLogLazyQueryHookResult = ReturnType<typeof useGetLogLazyQuery>;
export type GetLogQueryResult = ApolloReactCommon.QueryResult<GetLogQuery, GetLogQueryVariables>;
export const GetServersDocument = gql`
    query GetServers {
  getServers {
    id
    createdDate
    updatedDate
    name
    pid
    displayName
  }
}
    `;

/**
 * __useGetServersQuery__
 *
 * To run a query within a React component, call `useGetServersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetServersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetServersQuery, GetServersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetServersQuery, GetServersQueryVariables>(GetServersDocument, baseOptions);
      }
export function useGetServersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetServersQuery, GetServersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetServersQuery, GetServersQueryVariables>(GetServersDocument, baseOptions);
        }
export type GetServersQueryHookResult = ReturnType<typeof useGetServersQuery>;
export type GetServersLazyQueryHookResult = ReturnType<typeof useGetServersLazyQuery>;
export type GetServersQueryResult = ApolloReactCommon.QueryResult<GetServersQuery, GetServersQueryVariables>;
export const GetUsersDocument = gql`
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

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
      }
export function useGetUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = ApolloReactCommon.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
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

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;