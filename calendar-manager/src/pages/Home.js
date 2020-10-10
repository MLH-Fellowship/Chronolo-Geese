import React, { useState, useEffect } from "react";
import Sky from "react-sky";
// import {
//   useUser,
// } from 'reactfire';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// import {useParams, useHistory} from 'react-router-dom';
import Navbar from "../common/Navbar";
import "../styles/Home.css";

import i1 from "../assets/clock.png";
import i2 from "../assets/timetable.png";
import i3 from "../assets/goose.png";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "purple",
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
      <Sky
        images={{
          0: i1,
          1: i2,
          2: i3,
        }}
        how={50}
        time={10}
        size={"100px"}
        background={"#5e548e"}
      />

      <Navbar styles={{ position: "absolute" }} />
      <div className="back">
        <div>
          <Grid container spacing={5}>
            <Grid item className="cont">
              <div className="left">
                <Typography variant="h3" style={{ color: "#E0B1CB" }}>
                  <b>CHRONOLO-GEESE</b>
                </Typography>
                <Typography variant="h5" style={{ color: "#E0B1CB" }}>
                  <b>GIT ORGANIZED.</b>
                </Typography>
                <Typography variant="h5" style={{ color: "#E0B1CB" }}>
                  <b>GIT ON TIME.</b>
                </Typography>
              </div>
            </Grid>
            <Grid item className="cont">
              <Paper className="right">
                  {/* maybe make login-sign in a single component and have it here... check if user is logged-in then 
                  choose to give an option to login/signin...
                  if not logged in, refer to figma form */}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
