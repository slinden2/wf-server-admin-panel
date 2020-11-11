import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "/graphql", // Server URL (must be absolute)
  credentials: "include", // Additional fetch() options like `credentials` or `headers`
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
