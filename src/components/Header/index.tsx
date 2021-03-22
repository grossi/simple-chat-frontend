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

export default function Header() {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <h1> Simple Chat </h1>
      <UserInfo />
    </header>
  );
}
