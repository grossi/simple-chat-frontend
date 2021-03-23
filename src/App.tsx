import dotenv from "dotenv";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChatRoom from "pages/ChatRoom";
import ApolloContext from "context/Apollo";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'context/Theme';

dotenv.config();

function App() {
  return (
    <React.StrictMode>
      <ApolloContext>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={ChatRoom} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </ApolloContext>
    </React.StrictMode>
  );
}

export default App;
