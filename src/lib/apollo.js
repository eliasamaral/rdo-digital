import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = import.meta.env.VITE_API_URL;

export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache({addTypename: false}),
  connectToDevTools: process.env.NODE_ENV === "development",
});

