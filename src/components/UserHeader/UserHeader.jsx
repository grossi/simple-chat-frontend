import React from 'react';
import { gql, useQuery  } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './UserHeaderStyle.js';

const MY_USER = gql`
  query MY_USER {
    myUser {
      id
      name
    }
  }
`;

function UserHeader(props) {
  const { classes } = props;
  const history = useHistory();
  const { data: myUserData } = useQuery(MY_USER);

  const logout = () => {
    localStorage.clear();
    history.go(0);
  };

  return (
    <>
      {myUserData ? 
        (<div className={classes.userRow}>
          <div className={classes.username}> 
            {myUserData.myUser.name}
          </div>
          <Button
            size="medium"
            type="button"
            className={classes.loginButton}
            onClick={logout}
          > Logout </Button>
        </div>)
        :
        (<Button
          size="medium"
          type="button"
          className={classes.loginButton}
          onClick={() => window.location.assign('/login')}
        > Login </Button>)
      }
    </>
  );
}

export default withStyles(styles)(UserHeader);
