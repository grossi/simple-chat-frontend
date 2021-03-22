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

const ADD_USER = gql`
  mutation ADD_USER($name: String!, $password: String!, $passwordSalt: String) {
    addUser(name: $name, password: $password, passwordSalt: $passwordSalt) {
      id
    }
  }
`;

interface RegisterFormProps {
  switchView: () => void;
}

function RegisterForm(props: RegisterFormProps) {
  const classes = useStyles();
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState(
    ""
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [addUser] = useMutation(ADD_USER, { errorPolicy: "all" });

  const hashPassword = async (password: string) => {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    return { salt, password: hash };
  };

  const register = async (event: any) => {
    event.preventDefault();
    setErrorMessage("");

    if (passwordInput === passwordConfirmationInput) {
      const { salt, password } = await hashPassword(passwordInput);

      const addUserResponse = await addUser({
        variables: { name: userNameInput, password, passwordSalt: salt },
      });

      if (addUserResponse.errors) {
        setErrorMessage(addUserResponse.errors[0].message);
        return false;
      }

      props.switchView();
    } else {
      setErrorMessage("Passwords don't match");
      return false;
    }
  };

  return (
    <form onSubmit={register}>
      <h2> Register </h2>
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
          <div>
            <TextField
              label="Confirm Password"
              id="confirmpassword"
              type="password"
              required
              autoComplete="passwordconfirmation"
              margin="dense"
              variant="outlined"
              value={passwordConfirmationInput}
              onChange={(e) => setPasswordConfirmationInput(e.target.value)}
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
          Register
        </Button>
        <Button
          className={classes.button}
          id="start-login-button"
          variant="outlined"
          color="secondary"
          onClick={props.switchView}
        >
          Login
        </Button>
      </fieldset>
    </form>
  );
}

export default RegisterForm;
