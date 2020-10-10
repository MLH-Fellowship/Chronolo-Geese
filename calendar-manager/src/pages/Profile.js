import React, { useState, useEffect } from "react";
import {
  useFirestore,
  AuthCheck,
  useUser,
  useFirestoreDocData,
} from "reactfire";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
import Navbar from "../common/Navbar";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: '#E0B1CB',
    height: "100vh",
  },
  email: {
<<<<<<< HEAD
    color: '#5E548E',
    font: "Nunito",
=======
    color: "purple",
>>>>>>> main
  },
  classCodes: {},
}));

/**
 * @return {ReactElement} Displays profile page
 */
export default function Profile() {
  const history = useHistory();
  const user = useUser();
  //   const [currUser, setCurrUser] = useState(useUser());
  const classes = useStyles();
  const { uid } = useParams();
  // const classCollection = useFirestore().collection('classes');
  const userData = useFirestoreDocData(
    useFirestore().collection("users").doc(uid)
  );
  // console.log(userData);

  return (
    <div className={classes.body}>
      <Navbar />
      <Box container="true" m={10}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.email}>
<<<<<<< HEAD
                Name: {userData.displayName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.email}>
                Email: {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.email}>
                Identity: {userData.isStudent ? "Student" : "Professor"}
=======
              email: {user.email}
>>>>>>> main
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Classes:</Typography>
          </Grid>
          {userData.classCodes.length > 0 ? (
            userData.classCodes.map((v, index) => {
              return (
<<<<<<< HEAD
                <Grid item
                  key={index}
                  className={classes.classCodes}
                >
                    {v}
=======
                <Grid item key={index} className={classes.classCodes}>
                  {v.name}
>>>>>>> main
                </Grid>
              );
            })
          ) : (
            <Grid item>No classes added yet</Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
}
