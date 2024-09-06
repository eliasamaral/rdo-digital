import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://manager-api-production.up.railway.app",
  cache: new InMemoryCache({addTypename: false}),
  
});
