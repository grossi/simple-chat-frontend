import React, { useState, useEffect, useRef } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { DateTime } from "luxon";
import UserHeader from "../UserHeader/UserHeader";
import styles from "./ChatStyle.js";

const GET_MESSAGES = gql`
  query GET_MESSAGES($limit: Int) {
    messages(limit: $limit) {
      id
      text
      timeStamp
      creator {
        name
      }
    }
  }
`;

const ADD_MESSAGE = gql`
  mutation ADD_MESSAGE($text: String!) {
    addMessage(text: $text) {
      id
      text
      creator {
        name
      }
    }
  }
`;

function Chat(props) {
  const { classes } = props;
  const [textInput, setTextInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  });

  const formatDate = (date) => {
    const jsDate = new Date(Number(date));
    const newDate = DateTime.fromISO(jsDate.toISOString());
    return newDate.toLocaleString(DateTime.DATETIME_SHORT);
  };

  const [addMessage] = useMutation(ADD_MESSAGE, {
    refetchQueries: [{ query: GET_MESSAGES }],
    awaitRefetchQueries: true,
    onCompleted: scrollToBottom,
  });

  const { loading, error, data: messagesData } = useQuery(GET_MESSAGES, {
    variables: { limit: 50 },
    onCompleted: scrollToBottom,
    pollInterval: 1000,
  });

  const handleSubmit = e => {
    e.preventDefault();
    addMessage({ variables: { text: textInput } });
    setTextInput("");
  }

  if (error) {
    console.log("[GET_MESSAGES] ERROR: ", error);
    return null;
  }

  if (loading) return null;

  return (
    <div className={classes.backDrop}>
      <div className={classes.root}>
        <header className={classes.header}>
          <h1> Simple Chat </h1>
          <UserHeader />
        </header>
        <div className={classes.messagesBlock} id={"messagesBlock"}>
          <>
            {messagesData.messages.map((message, i) => (
              <div className={classes.messageBlock} key={i}>
                <div className={classes.messageTitle}>
                  <div className={classes.creatorName}>
                    {message.creator ? message.creator.name : "Anonymous"}
                  </div>
                  <div className={classes.timeStamp}>
                    {message.timeStamp ? formatDate(message.timeStamp) : ""}
                  </div>
                </div>
                <p className={classes.messageText}>{message.text}</p>
              </div>
            ))}
          </>
          <div ref={messagesEndRef} />
        </div>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <TextField
              label="Text"
              fullWidth
              margin="dense"
              variant="outlined"
              multiline={true}
              rows={5}
              value={textInput}
              onKeyPress={(e) => {
                if (!e.shiftKey && e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </div>
          <Button
            fullWidth
            size="large"
            type="submit"
            className={classes.submitButton}
          >
            {" "}
            Post{" "}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default withStyles(styles)(Chat);
