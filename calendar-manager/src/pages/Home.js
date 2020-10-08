import React, {useState, useEffect} from 'react';
// import {
//   useUser,
// } from 'reactfire';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
// import {useParams, useHistory} from 'react-router-dom';
import Navbar from '../common/Navbar';

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'purple',
  },
}));

/**
 * @return {ReactElement} Displays profile page
 */
export default function Home() {
//   const history = useHistory();
//   const user = useUser();
//   const [currUser, setCurrUser] = useState(useUser());
  const classes = useStyles();
//   const {uid} = useParams();
//   const userCollection = useFirestore().collection('users');

  return (
    <div>
        <Navbar />
        <Typography variant="h3" className={classes.title}>
            Welcome to Chronolo-Geese
        </Typography>
    </div>
  );
}

