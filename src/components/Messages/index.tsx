import * as React from "react";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  messageText: {
    textAlign: "left",
    fontSize: "medium",
    marginLeft: theme.spacing(2),
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
  },
  messageTitle: {
    display: "flex",
    alignItems: "flex-end",
  },
  creatorName: {
    textAlign: "left",
    fontSize: "large",
    fontWeight: "bold",
  },
  timeStamp: {
    margin: "2px 4px",
    fontSize: "10px",
  },
  messageBlock: {
    width: "100%",
  },
  messageForm: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  }
}));

interface MessagesProps {
  messages: any;
}

function Messages(props: MessagesProps) {
  const classes = useStyles();

  const formatDate = (date: number) => {
    const jsDate = new Date(Number(date));
    const newDate = DateTime.fromISO(jsDate.toISOString());
    return newDate.toLocaleString(DateTime.DATETIME_SHORT);
  };

  return (
    <>
      {props.messages.map((message: any, i: number) => (
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
  );
}

export default Messages;
