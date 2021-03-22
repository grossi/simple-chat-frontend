import * as React from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  messageForm: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  }
}));

interface NewMessageFormProps{
  handleSubmit: (e: any) => void;
  textInput: string;
  setTextInput: (value: string | ((state: any) => any)) => any;
}

function NewMessageForm(props: NewMessageFormProps) {
  const classes = useStyles();

  return (
      <form
        noValidate
        autoComplete="off"
        onSubmit={props.handleSubmit}
        className={classes.messageForm}
      >
        <div>
          <TextField
            label="Text"
            fullWidth
            margin="dense"
            variant="outlined"
            multiline={true}
            rows={5}
            value={props.textInput}
            onKeyPress={(e) => {
              if (!e.shiftKey && e.key === "Enter") {
                props.handleSubmit(e);
              }
            }}
            onChange={(e) => props.setTextInput(e.target.value)}
          />
        </div>
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="secondary"
        >
          Post
        </Button>
      </form>
  );
}

export default NewMessageForm;
