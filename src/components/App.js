import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createBrowserHistory } from "history";
import dotenv from 'dotenv';
import React from 'react';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import Chat from './Chat/Chat';
import Login from './Login/Login';

dotenv.config();

let uri;

if( process.env.REACT_APP_BACKEND_SERVER ) {
  uri = process.env.REACT_APP_BACKEND_SERVER;
} else {
  uri = 'http://localhost:4000/graphql';
}

const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const hist = createBrowserHistory();

function App() {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Router history={hist}>
          <Switch>
            <Route exact path="/" component={Chat} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </ApolloProvider>
    </React.StrictMode>
  );
}

export default App;
