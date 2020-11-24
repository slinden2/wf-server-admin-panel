import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  console.log("graphQLErrors", graphQLErrors);
  console.log("networkError", networkError);

  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // Remove expired or invalid tokens from localStorage
      if (err.extensions?.code === "UNAUTHENTICATED") {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      }
    }
  }
});

// JWT token expires in a short time. After the expiration, it can be
// renewed withing grace period if there is user activity.
// If the token is renewed in the backend, the response will include
// a header called x-renewed-jwt-token, which must be saved in
// localStorage in substitution of the previous token.
const renewLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;

    if (headers) {
      const renewedToken = headers.get("x-renewed-jwt-token");
      if (renewedToken) {
        localStorage.setItem("token", renewedToken);
      }
    }

    return response;
  });
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      "X-JWT-Token": token ? token : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: "/graphql", // Server URL (must be absolute)
});

const client = new ApolloClient({
  link: ApolloLink.from([onErrorLink, renewLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
