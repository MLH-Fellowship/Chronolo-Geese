import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { useUser } from "reactfire";
import { useParams, useHistory } from "react-router-dom";

import Navbar from "../common/Navbar";
import Availability from "../profile/Availability";
import "../styles/Profile.css";

const useStyles = makeStyles((theme) => ({
  classCodes: {
    color: "#5E548E",
  },
  paperBg: {
    backgroundColor: "#e0b1cb",
    borderRadius: 50,
  },
  cent: {
    textAlign: "center",
  },
}));

export default function UserAvailability() {
  const history = useHistory();
  const user = useUser();
  const classes = useStyles();
  const { uid } = useParams();

  if (!user) {
    history.push("/home");
  } else {
    return (
      <div className="prof_bg">
        <Navbar />
        <Grid
          container
          spacing={3}
          style={{ margin: "5vh", marginTop: "10vh" }}
        >
          <Grid item xs={12} className={classes.cent}>
            <Typography variant="h5">
              <b>DROP YOUR AVAILABILITIY BELOW</b>:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paperBg} variant="outlined">
              <Availability uid={uid} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
