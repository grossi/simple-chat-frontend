import { createStyles, Theme } from "@material-ui/core/styles";

export default (theme: Theme) =>
  createStyles({
    backDrop: {
      backgroundColor: theme.palette.primary.light,
    },
    root: {
      textAlign: "center",
      backgroundColor: theme.palette.background.paper,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      marginLeft: "20vw",
      marginRight: "20vw",
      color: theme.palette.text.primary,
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    header: {
      maginTop: theme.spacing(3),
      alignItems: "center",
      justifyContent: "center",
    },
  });
