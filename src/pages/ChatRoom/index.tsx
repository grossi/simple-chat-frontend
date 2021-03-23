import * as React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Header from "components/Header";
import Messages from "components/Messages";
import NewMessageForm from "components/NewMessageForm";
import LoginRegisterModal from "templates/LoginRegisterModal";
import styles from "./styles";

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

interface ChatRoomProps extends WithStyles<typeof styles> {}

function ChatRoom(props: ChatRoomProps) {
  const { classes } = props;
  const [textInput, setTextInput] = React.useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView();
  };

  React.useEffect(() => {
    scrollToBottom();
  });

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

  const handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    addMessage({ variables: { text: textInput } });
    setTextInput("");
  };

  if (error) {
    console.log("[GET_MESSAGES] ERROR: ", error);
    return null;
  }

  if (loading) return null;

  return (
    <React.Fragment>
      <LoginRegisterModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
      <div className={classes.backDrop}>
        <div className={classes.root}>
          <Header setIsLoginModalOpen={setIsLoginModalOpen}/>
          <div className={classes.messagesBlock}>
            <Messages messages={messagesData.messages} />
            <div ref={messagesEndRef} />
          </div>
          <NewMessageForm
            handleSubmit={handleSubmit}
            textInput={textInput}
            setTextInput={setTextInput}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default withStyles(styles)(ChatRoom);
