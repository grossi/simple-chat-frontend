import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import LoginForm from "components/LoginForm";
import RegisterForm from "components/RegisterForm";


function LoginRegisterForm(props: any) {
  const { classes } = props;
  const [isRegistering, setIsRegistering] = useState(false);

  const switchView = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className={classes.backDrop}>
      <div className={classes.root}>
        {!isRegistering ? (
          <LoginForm switchView={switchView} />
        ) : (
          <RegisterForm switchView={switchView} />
        )}
      </div>
    </div>
  );
}

export default withStyles(styles)(LoginRegisterForm);
