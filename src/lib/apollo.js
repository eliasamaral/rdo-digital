import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = import.meta.env.VITE_API_URL;

export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === "development",
});
