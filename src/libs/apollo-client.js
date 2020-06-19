import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import ls from 'local-storage';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_GRAPHQL_URL,
});

const webSocketLink = new WebSocketLink({
  uri: process.env.REACT_APP_APOLLO_WEBSOCKET_URL,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
        && definition.operation === 'subscription'
    );
  },
  webSocketLink,
  httpLink,
);

const setAuthorizationLink = setContext((_, { headers }) => {
  const token = ls.get('token');
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: setAuthorizationLink.concat(link),
  cache,
});

export default client;
