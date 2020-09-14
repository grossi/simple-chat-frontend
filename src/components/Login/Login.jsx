import React from 'react';
import { gql } from '@apollo/client';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './LoginStyle.js';

const AUTH_USER = gql`
  mutation AUTH_USER($name: String!, $password: String!) {
    authUser(name: $name, password: $password)
  }
`;

const PASSWORD_SALT = gql`
  query PASSWORD_SALT($name: String!) {
    passwordSalt(name: $name)
  }
`;

function Login(props) {
  const { classes } = props;

  const login = event => {
    event.preventDefault();
  }

  return (
    <div className={classes.backDrop}> 
      <div className={classes.root}>
        <form onSubmit={login}>
          <h2> Login </h2>
          <fieldset className={classes.loginForm}>
            <div className={classes.inputRow}>
              <div className={classes.inputField}>
                <TextField
                  className={classes.input}
                  label="Name"
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  margin="dense"
                  variant="outlined" 
                />
              </div>
              <div className={classes.inputField}>
                <TextField
                  className={classes.input}
                  label="Password"
                  id="password"
                  type="text"
                  required
                  autoComplete="password"
                  margin="dense"
                  variant="outlined" 
                />
              </div>
            </div>
            <Button
              id="submit-button"
              type="submit"
              size="large"
              className={classes.submitButton}
            >
              Login
            </Button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default withStyles(styles)(Login);
