import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory, useParams } from "react-router-dom";

import { useFirestore, useUser, useFirestoreDocData } from "reactfire";

import Navbar from "../common/Navbar";
import Availability from "../profile/Availability";
import "../styles/Profile.css";

const useStyles = makeStyles((theme) => ({
  classCodes: {
    color: "#5E548E",
  },
}));

/**
 * @return {ReactElement} Displays profile page
 */
export default function Profile() {
  const history = useHistory();
  const user = useUser();
  const classes = useStyles();
  const { uid } = useParams();
  const userData = useFirestoreDocData(
    useFirestore().collection("users").doc(user.uid)
  );

  if (!user) {
    history.push("/login");
    return null;
  } else {
    return (
      <div className="prof_bg">
        <Navbar />
        <Box container="true" marginTop={10} margin={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">
                <b>NAME</b>: {userData.displayName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <b>EMAIL</b>: {user.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <b>IDENTITY</b>: {userData.isStudent ? "Student" : "Professor"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <b>CLASSES</b>:
              </Typography>
            </Grid>
            {userData.classCodes.length > 0 ? (
              userData.classCodes.map((v, index) => {
                return (
                  <Grid item key={index} className={classes.classCodes}>
                    {v.name}
                  </Grid>
                );
              })
            ) : (
              <Grid item className={classes.font}>
                No classes added yet
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography variant="h5" style={{ textAlign: "center" }}>
                <b>drop your availability below</b>:
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginLeft: "0px" }}>
              <Availability uid={user.uid} />
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

