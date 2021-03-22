import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";

let uri;

if (process.env.REACT_APP_BACKEND_SERVER) {
  uri = process.env.REACT_APP_BACKEND_SERVER;
} else {
  uri = "http://localhost:4000/graphql";
}

const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function ApolloContext(props: any) {
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}

export default ApolloContext;
