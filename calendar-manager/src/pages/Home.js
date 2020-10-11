import React from "react";
import Sky from "react-sky";

import { useHistory } from "react-router-dom";

import * as firebase from "firebase";
import { useUser } from "reactfire";

import Login from "./Login";
import SignUp from "./SignUp";
import Navbar from "../common/Navbar";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import "../styles/Home.css";
import Link from "@material-ui/core/Link";

import i1 from "../assets/clock.png";
import i2 from "../assets/timetable.png";
import i3 from "../assets/goose.png";

const useStyles = makeStyles((theme) => ({
  font: {
    color: "#E0B1CB",
  },
  button: {
    color: "#5e548e",
    background: "#E0B1CB",
    top: "50%",
  },
}));

/**
 * @return {ReactElement} Displays profile page
 */
export default function Home() {
  const [link, setLink] = React.useState("Sign Up Instead");
  const [login, setLogin] = React.useState(true);
  const user = useUser();
  const classes = useStyles();
  const history = useHistory();

  // used to switch between login and signup components
  let menu = <div></div>;

  // to switch between login and signup components
  if (!user) {
    if (login) menu = <Login />;
    else menu = <SignUp />;
  }

  // logs the user out
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => history.push("/login"))
      .catch(function (error) {
        console.log(error);
      });
  };

  // allows the user to toggle between signup and login
  const toggle = () => {
    if (login) {
      setLink("Log In Instead");
      setLogin(false);
    } else {
      setLink("Sign Up Instead");
      setLogin(true);
    }
  };

  // CASE: user not logged in
  let notUser = (
    <Paper>
      <Box marginLeft={5} marginRight={5}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
          fullWidth
        >
          {menu}
          <Grid item xs={12}>
            <Link onClick={toggle} component="button" variant="body2">
              {link}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );

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

      <div className="back">
        <Navbar />
        <div>
          <Grid container spacing={10}>
            <Grid item>
              <div className="left">
                <Typography variant="h3" className={classes.font}>
                  <b>CHRONOLO-GEESE</b>
                </Typography>
                <Typography variant="h5" className={classes.font}>
                  <b>GIT ORGANIZED.</b>
                </Typography>
                <Typography variant="h5" className={classes.font}>
                  <b>GIT ON TIME.</b>
                </Typography>
              </div>
            </Grid>
            <Grid item>
              {!user ? (notUser) : (
                // logout button
                <Button
                  onClick={() => logout()}
                  variant="contained"
                  disableElevation
                  className={classes.button}
                >
                  <b>Log-out</b>
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
