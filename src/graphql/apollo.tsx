import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import Cookies from 'js-cookie';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { typeDefs, resolvers } from './resolvers';

const uploadLink = createUploadLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/graphql'
      : 'https://api.healthfriend.club/graphql',
  headers: {
    'keep-alive': 'true',
    //   Authorization: `Bearer ${Cookies.get('access-token')}`,
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path, extensions }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Code: ${
          extensions!.code
        }`,
      ),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError.message}`);
  }
});

const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'ws://localhost:4000/graphql'
      : 'wss://api.healthfriend.club/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${Cookies.get('access-token')}`,
    },
  },
});

const wsHttplink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  // httpLink,
);

const link = ApolloLink.from([errorLink, wsHttplink, uploadLink]);

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('access-token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'none',
    },
    query: {
      errorPolicy: 'none',
    },
    mutate: {
      errorPolicy: 'none',
    },
  },
  cache,
  link: authLink.concat(link),
  typeDefs,
  // defaults,
  resolvers,
  connectToDevTools: true,
});

cache.writeData({
  data: {
    isLoggedIn: false,
    chatFriend: {
      __typename: 'ChatFriend',
      id: '',
      nickname: '',
    },
  },
});

export default client;
