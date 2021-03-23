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

interface UserInfoProps { 
  setIsLoginModalOpen: (arg: boolean | ((state: boolean) => boolean)) => void;
}

function UserInfo(props: UserInfoProps) {
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
          onClick={() => props.setIsLoginModalOpen(state => !state)}
        >
          Login
        </Button>
      )}
    </>
  );
}

export default UserInfo;
