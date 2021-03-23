import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import LoginForm from "components/LoginForm";
import RegisterForm from "components/RegisterForm";

interface LoginRegisterModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean | ((state: boolean) => boolean)) => void;
}

function LoginRegisterModal(props: LoginRegisterModalProps) {
  const [isRegistering, setIsRegistering] = useState(false);

  const switchView = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      onEnter={() => setIsRegistering(false)}
    >
      <Grid container direction="row" justify="center" alignItems="center">
        {!isRegistering ? (
          <LoginForm switchView={switchView} />
        ) : (
          <RegisterForm switchView={switchView} />
        )}
      </Grid>
    </Dialog>
  );
}

export default LoginRegisterModal;
