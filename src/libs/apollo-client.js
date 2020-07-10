import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import ls from 'local-storage';

const httplink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_GRAPHQL_URL,
});
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
  link: setAuthorizationLink.concat(httplink),
  cache,
});

export default client;
