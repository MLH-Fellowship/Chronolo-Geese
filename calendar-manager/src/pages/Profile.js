import React, {useState, useEffect} from 'react';
// import {
//   useFirestore,
//   AuthCheck,
//   useUser,
//   useFirestoreDocData,
// } from 'reactfire';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import Grid from '@material-ui/core/Grid';

import {makeStyles} from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
// import Card from '@material-ui/core/Card';
// import IconButton from '@material-ui/core/IconButton';
// import ArrowBack from '@material-ui/icons/ArrowBack';
// import CardContent from '@material-ui/core/CardContent';
// import AddFriendButton from '../profile/AddFriendButton';
// import Friend from '../profile/Friend';
// import ListItem from '@material-ui/core/ListItem';
// import List from '@material-ui/core/List';
import {useParams, useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  fonts: {
    fontWeight: 'bold',
  },
  pagination: {
    '& > *': {
      margin: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
    },
  },
  friendContainer: {
    position: 'relative',
  },
  arrowBack: {
    float: 'left',
    marginLeft: '0.4em',
    marginTop: '0.4em',
  },
}));

/**
 * @return {ReactElement} Displays profile page
 */
export default function Profile() {
  const history = useHistory();
//   const user = useUser();
//   const [currUser, setCurrUser] = useState(useUser());
  const classes = useStyles();
  const {uid} = useParams();
//   const userCollection = useFirestore().collection('users');

  /**
   * Get user with entered Id
   * @return {void}
   */
//   function getUser() {
//     if (user) {
//       const docRef = userCollection.doc(uid);
//       docRef.get().then(function(doc) {
//         if (doc.exists) {
//           const newUser = doc.data();
//           newUser.uid = uid;
//           setCurrUser(newUser);
//         }
//       }).catch(function(error) {
//         setCurrUser(null);
//         console.log('Error getting document:', error);
//       });
//     }
//   }
//   useEffect(getUser, [user, uid]);

  return (
    <div>
     hellow
    </div>
  );
}

// /**
//  * @param {object} userCollection Reference to user collection
//  * @param {string} uid User ID of current user
//  * @return {ReactElement} Returns game statistics for user
//  */
// function UserStats({userCollection, uid}) {
//   const classes = useStyles();
//   const userStats = useFirestoreDocData(userCollection.doc(uid)).mafiaStats;
//   return (
//     <Box m={10}>
//       <Typography variant='h4' className={classes.fonts}>
//         Game Statistics
//       </Typography>
//       <br />
//       <Card className={classes.card}>
//         <CardContent>
//           <Typography className={classes.fonts} variant="h5">
//             Mafia (Werewolf)
//           </Typography>
//           <br />
//           <Typography variant="body1">
//             Wins: {userStats.wins}
//           </Typography>
//           <Typography variant="body1">
//             Losses: {userStats.losses}
//           </Typography>
//         </CardContent>
//       </Card>
//       <br /> <hr />
//     </Box>
//   );
// }

