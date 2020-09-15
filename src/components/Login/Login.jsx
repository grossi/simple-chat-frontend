import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './LoginStyle.js';
import bcrypt from 'bcryptjs';

const AUTH_USER = gql`
  mutation AUTH_USER($name: String!, $password: String!) {
    authUser(name: $name, password: $password)
  }
`;

const ADD_USER = gql`
  mutation ADD_USER($name: String!, $password: String!, $passwordSalt: String) {
    addUser(name: $name, password: $password, passwordSalt: $passwordSalt) {
      id
    }
  }
`;

const PASSWORD_SALT = gql`
  mutation PASSWORD_SALT($name: String!) {
    passwordSalt(name: $name)
  }
`;

function Login(props) {
  const { classes } = props;
  const [isRegistering, setIsRegistering] = useState(false);
  const [userNameInput, setUserNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState('');
  const [addUser] = useMutation(ADD_USER, { errorPolicy: 'all' });
  const [authUser] = useMutation(AUTH_USER, { errorPolicy: 'all' });
  const [getSalt] = useMutation(PASSWORD_SALT, { errorPolicy: 'all' });

  const switchView = () => {
    setUserNameInput('');
    setPasswordInput('');
    setPasswordConfirmationInput('');
    setIsRegistering(!isRegistering);
  }

  const hashPassword = async password => {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    return { salt, password:hash };
  }

  const login = async event => {
    event.preventDefault();

    const { data: { passwordSalt: salt } } = await getSalt({ variables: { name: userNameInput }});

    const password = await bcrypt.hash(passwordInput, salt);

    const { data: { authUser: token } } = await authUser({ variables: { name: userNameInput, password } });

    localStorage.setItem('token', token);
    window.location.assign('/');
  }

  const register = async event => {
    event.preventDefault();

    if( passwordInput === passwordConfirmationInput ) {
      const { salt, password } = await hashPassword(passwordInput);

      await addUser({ variables: { name: userNameInput, password, passwordSalt: salt } });

      switchView();
    }
  }

  return (
    <div className={classes.backDrop}> 
      <div className={classes.root}>
        { !isRegistering ?
          (<form onSubmit={login}>
            <h2> Login </h2>
            <fieldset className={classes.loginForm}>
              <div className={classes.inputRow}>
                <div className={classes.inputField}>
                  <TextField
                    className={classes.input}
                    label="Username"
                    id="username"
                    type="text"
                    required
                    autoComplete="username"
                    margin="dense"
                    variant="outlined" 
                    value={userNameInput}
                    onChange={e=>setUserNameInput(e.target.value)}
                  />
                </div>
                <div className={classes.inputField}>
                  <TextField
                    className={classes.input}
                    label="Password"
                    id="password"
                    type="password"
                    required
                    autoComplete="password"
                    margin="dense"
                    variant="outlined" 
                    value={passwordInput}
                    onChange={e=>setPasswordInput(e.target.value)}
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
              <Button
                id="start-register-button"
                type="button"
                size="small"
                className={classes.registerButton}
                onClick={switchView}
              >
                Register
              </Button>
            </fieldset>
          </form>) 
          :
          (<form onSubmit={register}>
          <h2> Register </h2>
          <fieldset className={classes.loginForm}>
            <div className={classes.inputRow}>
              <div className={classes.inputField}>
                <TextField
                  className={classes.input}
                  label="Username"
                  id="username"
                  type="text"
                  required
                  autoComplete="username"
                  margin="dense"
                  variant="outlined" 
                  value={userNameInput}
                  onChange={e=>setUserNameInput(e.target.value)}
                />
              </div>
              <div className={classes.inputField}>
                <TextField
                  className={classes.input}
                  label="Password"
                  id="password"
                  type="password"
                  required
                  autoComplete="password"
                  margin="dense"
                  variant="outlined" 
                  value={passwordInput}
                  onChange={e=>setPasswordInput(e.target.value)}
                />
              </div>
              <div className={classes.inputField}>
                <TextField
                  className={classes.input}
                  label="Confirm Password"
                  id="confirmpassword"
                  type="password"
                  required
                  autoComplete="passwordconfirmation"
                  margin="dense"
                  variant="outlined" 
                  value={passwordConfirmationInput}
                  onChange={e=>setPasswordConfirmationInput(e.target.value)}
                />
              </div>
            </div>
            <Button
              id="submit-button"
              type="submit"
              size="large"
              className={classes.submitButton}
            >
              Register
            </Button>
            <Button
              id="start-register-button"
              type="button"
              size="small"
              className={classes.registerButton}
              onClick={switchView}
            >
              Login
            </Button>
          </fieldset>
        </form>)
        }
      </div>
    </div>
  );
}

export default withStyles(styles)(Login);
