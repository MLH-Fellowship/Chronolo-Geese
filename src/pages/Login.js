import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import * as firebase from "firebase";
import { useHistory } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const dotenv = require("dotenv");
  const env = dotenv.config().parse;

  if (!firebase.apps.length) {
    firebase.initializeApp(env);
  }

  const useStyles = makeStyles((theme) => ({
    error: {
      position: "absolute",
      top: "70%",
      color: "white",
      backgroundColor: "rgba(250, 122, 112, 0.5)",
      borderRadius: 10,
      maxWidth: "250px",
      textAlign: "center",
    },
  }));

  const classes = useStyles();

  // logs user in and redirects them to /myclasses
  let submit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => history.push("/myclasses/" + res.user.uid))
      .catch(function (error) {
        setError(error.message);
      });
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5">log-in</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="email"
          label="email"
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          type="email"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="password"
          label="password"
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          type="password"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => submit()}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </Grid>
      <div className={classes.error}>
        <Typography>{error}</Typography>
      </div>
    </>
  );
}

export default Login;
