import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
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

const hist = createBrowserHistory();

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

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
