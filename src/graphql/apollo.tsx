import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

// import { typeDefs, defaults, resolvers } from './clientState';

const link = createHttpLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/graphql'
      : 'https://api.healthfriend.club/graphql',
  credentials: 'include',
});

// const errorLink = onError(({ graphQLErrors }) => {
//   if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
// });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, link]),
  // link,
  // 여기에 typeDefs, defaults, resolvers 입력
});

export default client;
