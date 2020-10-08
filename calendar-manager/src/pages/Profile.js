import React, {useState, useEffect} from 'react';
import {
  useFirestore,
  AuthCheck,
  useUser,
  useFirestoreDocData,
} from 'reactfire';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {useParams, useHistory} from 'react-router-dom';
import Navbar from '../common/Navbar';

const useStyles = makeStyles((theme) => ({
  email: {
    color: 'purple',
  },
  classCodes: {

  }
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
  // const classCollection = useFirestore().collection('classes');
  const userData = useFirestoreDocData(useFirestore().collection('users').doc(uid));
  // console.log(userData);

  return (
    <div>
      <Navbar />
      <Box
        container='true'
        m={10}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.email}>
                email: {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
                Classes:
            </Typography>
          </Grid>
          {userData.classCodes.length > 0 ?
          userData.classCodes.map((v, index) => {
              return (
                <Grid item
                  key={index}
                  className={classes.classCodes}
                >
                    {v.name}
                </Grid>
              );
            }) : <Grid item>No classes added yet</Grid>
          }
        </Grid>
      </Box>
    </div>
  );
}

