import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import Navbar from "../common/Navbar";
import Sky from "react-sky";

import i1 from "../assets/clock.png";
import i2 from "../assets/timetable.png";
import i3 from "../assets/goose.png";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    height: 350,
    width: 250,
    margin: theme.spacing(2),
    textAlign: "center",
    paddingBottom: 10,
    borderRadius: 50,
  },
}));

const info = [
  "Create an account.",
  "Drop your Availability.",
  "Add Classroom.",
  "Schedule a meeting!",
];
const pics = [
  require("../assets/signup.jpg"),
  require("../assets/availability.jpg"),
  require("../assets/joinclassroom.PNG"),
  require("../assets/heatmap.png"),
];

export default function HowItWorks() {
  const classes = useStyles();
  return (
    <div>
      <Sky
        images={{
          0: i1,
          1: i2,
          2: i3,
        }}
        how={30}
        time={40}
        size={"100px"}
        background={"#5e548e"}
      />
      <Navbar style={{ position: "absolute" }} />
      <div>
        <div>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ marginTop: "15%" }}
          >
            {info.map((val, index) => (
              <Grid item>
                <Paper className={classes.paper} elevation={4}>
                  <img alt={val} src={pics[index]} style={{ width: "100%" }} />
                  <Typography variant="h6" style={{ color: "#5e548e" }}>
                    {val}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}
