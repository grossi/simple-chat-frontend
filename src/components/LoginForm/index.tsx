import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { TextField, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import bcrypt from "bcryptjs";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const AUTH_USER = gql`
  mutation AUTH_USER($name: String!, $password: String!) {
    authUser(name: $name, password: $password)
  }
`;

const PASSWORD_SALT = gql`
  mutation PASSWORD_SALT($name: String!) {
    passwordSalt(name: $name)
  }
`;

interface LoginProps {
  switchView: () => void;
}

function LoginForm(props: LoginProps) {
  const classes = useStyles();
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [authUser] = useMutation(AUTH_USER, { errorPolicy: "all" });
  const [getSalt] = useMutation(PASSWORD_SALT, { errorPolicy: "all" });

  const login = async (event: any) => {
    event.preventDefault();
    setErrorMessage("");

    const getSaltResponse = await getSalt({
      variables: { name: userNameInput },
    });

    if (getSaltResponse.errors) {
      setErrorMessage(getSaltResponse.errors[0].message);
      return false;
    }

    const salt = getSaltResponse.data.passwordSalt;

    const password = await bcrypt.hash(passwordInput, salt);

    const authUserResponse = await authUser({
      variables: { name: userNameInput, password },
    });

    if (authUserResponse.errors) {
      setErrorMessage(authUserResponse.errors[0].message);
      return false;
    }

    const token = authUserResponse.data.authUser;

    localStorage.setItem("token", token);
    window.location.assign("/");
  };

  return (
    <form onSubmit={login}>
      <h2> Login </h2>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <fieldset>
        <div>
          <div>
            <TextField
              label="Username"
              id="username"
              type="text"
              required
              autoComplete="username"
              margin="dense"
              variant="outlined"
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Password"
              id="password"
              type="password"
              required
              autoComplete="password"
              margin="dense"
              variant="outlined"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>
        </div>
        <Button
          className={classes.button}
          id="submit-button"
          variant="outlined"
          color="secondary"
          type="submit"
        >
          Login
        </Button>
        <Button
          className={classes.button}
          id="start-register-button"
          variant="outlined"
          color="secondary"
          onClick={props.switchView}
        >
          Register
        </Button>
      </fieldset>
    </form>
  );
}

export default LoginForm;
