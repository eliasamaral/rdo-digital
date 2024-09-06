import { ApolloClient, InMemoryCache } from "@apollo/client";

// const API_URL = import.meta.env.VITE_API_URL;

export const client = new ApolloClient({
  uri: "https://manager-api-production.up.railway.app",
  cache: new InMemoryCache({addTypename: false}),
  connectToDevTools: process.env.NODE_ENV === "development",
});

