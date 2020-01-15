import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import Cookies from 'js-cookie';

import { typeDefs, resolvers } from './resolvers';

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/graphql'
      : 'https://api.healthfriend.club/graphql',
  credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // 아폴로 클라이언트 에러 핸들링을 top level에서만 할 때는 history.push 이런걸 못쓰겠고, local level에서 하려고 하면 graphQLErrors[0].extensions.code를 받아올 수가 없는 듯.
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path, extensions }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Code: ${
          extensions!.code
        }`,
      ),
    );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  // defaultOptions: {
  //   watchQuery: {
  //     errorPolicy: 'all',
  //   },
  //   query: {
  //     errorPolicy: 'all',
  //   },
  //   mutate: {
  //     errorPolicy: 'all',
  //   },
  // },
  cache,
  link: new ApolloLink((operation, forward) => {
    const token = Cookies.get('access-token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
    return forward(operation);
  }).concat(ApolloLink.from([errorLink, httpLink])),
  typeDefs,
  resolvers,
  connectToDevTools: true,
});

cache.writeData({
  data: {
    isLoggedIn: false,
  },
});

export default client;
