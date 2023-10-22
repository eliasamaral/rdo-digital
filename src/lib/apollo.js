import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://maneger-api-develop.up.railway.app",
  cache: new InMemoryCache({addTypename: false}),
  
});
