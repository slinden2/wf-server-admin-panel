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
  hello: Scalars['String'];
  me?: Maybe<User>;
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
  displayName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<EncodeResult>;
  setUserServers: Scalars['Boolean'];
  setDisplayName: Server;
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

export type EncodeResult = {
  __typename?: 'EncodeResult';
  token: Scalars['String'];
  expires: Scalars['Float'];
  issued: Scalars['Float'];
};

export type SetUserServersInput = {
  userId: Scalars['String'];
  serverIds: Array<Scalars['String']>;
};

export type SetDisplayNameInput = {
  serverId: Scalars['String'];
  name: Scalars['String'];
};

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
    & Pick<User, 'id' | 'discordId' | 'username'>
    & { servers: Array<(
      { __typename?: 'Server' }
      & Pick<Server, 'id' | 'createdDate' | 'updatedDate' | 'name' | 'pid' | 'displayName'>
    )> }
  )> }
);


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