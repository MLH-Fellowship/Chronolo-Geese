import React, {useState, useEffect} from 'react';
import {
  useFirestore,
  AuthCheck,
  useUser,
  useFirestoreDocData,
} from 'reactfire';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useParams, useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  email: {
    color: 'purple',
  },
}));

/**
 * @return {ReactElement} Displays profile page
 */
export default function Profile() {
  const history = useHistory();
  const user = useUser();
//   const [currUser, setCurrUser] = useState(useUser());
  const classes = useStyles();
  const {uid} = useParams();
//   const userCollection = useFirestore().collection('users');

  return (
    <div>
        <Typography variant="h6" className={classes.email}>
            {user.email}
        </Typography>
    </div>
  );
}

