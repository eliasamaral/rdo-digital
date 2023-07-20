import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://maneger-api-production.up.railway.app/",
  cache: new InMemoryCache(),
});
