import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  username: {
    marginRight: theme.spacing(3),
    fontWeight: 700,
    alignSelf: "center"
  },
  userRow: {
    display: "flex",
  },
}));

const MY_USER = gql`
  query MY_USER {
    myUser {
      id
      name
    }
  }
`;

function UserHeader(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const { data: myUserData } = useQuery(MY_USER);

  const logout = () => {
    localStorage.clear();
    history.go(0);
  };

  return (
    <>
      {myUserData ? (
        <div className={classes.userRow}>
          <div className={classes.username}>{myUserData.myUser.name}</div>
          <Button
            size="medium"
            type="button"
            color="secondary"
            variant="outlined"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Button
          size="medium"
          type="button"
          color="secondary"
          variant="contained"
          onClick={() => window.location.assign("/login")}
        >
          Login
        </Button>
      )}
    </>
  );
}

export default UserHeader;
