import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import UserInfo from "components/UserInfo";

const useStyles = makeStyles((theme) => ({
  header: {
    maginTop: "10px",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    backgroundColor: theme.palette.background.default,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}));

interface HeaderProps { 
  setIsLoginModalOpen: (arg: boolean | ((state: boolean) => boolean)) => void;
}

export default function Header(props: HeaderProps) {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <h1> Simple Chat </h1>
      <UserInfo setIsLoginModalOpen={props.setIsLoginModalOpen} />
    </header>
  );
}
