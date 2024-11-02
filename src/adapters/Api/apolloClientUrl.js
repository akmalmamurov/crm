import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const devMode = false;
const api = devMode ? "http://localhost:4000" : "http://api.uz-fox.uz";
const apiApollo = devMode ? "http://localhost:4000/graphql" : "http://api.uz-fox.uz/graphql";
// const apiApolloWs = 'wss://api.izmacrm.uz/graphql'

export {
  api,
  apiApollo,
  //  apiApolloWs
};

const httpLink = createHttpLink({
  uri: apiApollo,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("access_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: token,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
