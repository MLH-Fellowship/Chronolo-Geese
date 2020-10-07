import React, { useState } from "react";
import * as firebase from 'firebase';

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

function SignUp() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firebaseConfig = {
    apiKey: "AIzaSyAE6rcfe2QjFdVwwVtQN6dvEITo4mFgVPg",
    authDomain: "chronolo-geese.firebaseapp.com",
    databaseURL: "https://chronolo-geese.firebaseio.com",
    projectId: "chronolo-geese",
    storageBucket: "chronolo-geese.appspot.com",
    messagingSenderId: "538915612147",
    appId: "1:538915612147:web:2264447c48c615794f5e86",
    measurementId: "G-0F8Q557ERB"
  };

  //TODO get .env working
  const dotenv = require('dotenv');
  const env = dotenv.config().parse;

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  let submit = () => {
    console.log(email, password);
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => setError("you have successfully signed up"))
      .catch(function (error) {
        // Handle Errors here.
        setError(error.message);
        // ...
      });
  };

  return (
    <div>
      <Grid
        container
        fullWidth
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ paddingTop: "15%" }}
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h4">Sign Up</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="email"
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="password"
              label="password"
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              type="password"
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              id="password"
              label="password"
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              type="password"
            />
          </Grid> */}
          <Grid item>
            <Button
              onClick={() => submit()}
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </Grid>

          {/* <LinkTo to="/signin"> */}
          <Link component="button" variant="body2">
            Log In Instead
          </Link>
          {/* </LinkTo> */}
        </Grid>
        <Typography variant="h6">{error}</Typography>
      </Grid>
    </div>
  );
}

export default SignUp;
