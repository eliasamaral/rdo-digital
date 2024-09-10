import { ApolloClient, InMemoryCache } from '@apollo/client'
export const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache({ addTypename: false }),
  connectToDevTools: process.env.NODE_ENV === 'development',
})
