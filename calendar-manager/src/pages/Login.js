import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { Link as LinkTo } from "react-router-dom";
import * as firebase from "firebase";
import { useHistory } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  //TODO .env
  const firebaseConfig = {
    apiKey: "AIzaSyAE6rcfe2QjFdVwwVtQN6dvEITo4mFgVPg",
    authDomain: "chronolo-geese.firebaseapp.com",
    databaseURL: "https://chronolo-geese.firebaseio.com",
    projectId: "chronolo-geese",
    storageBucket: "chronolo-geese.appspot.com",
    messagingSenderId: "538915612147",
    appId: "1:538915612147:web:2264447c48c615794f5e86",
    measurementId: "G-0F8Q557ERB",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  //we can prolly combine the login/signup form tog.... reduce code.
  // TODO
  let submit = () => {
    // console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => history.push("/myclasses/" + res.user.uid))
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(error.message);
        // ...
      });
  };

  return (
    <Box marginLeft={5} marginRight={5}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
        fullWidth
      >
        <Grid item xs={12}>
          <Typography variant="h4">log-in</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            label="email"
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            type="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            label="password"
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            type="password"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => submit()}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <LinkTo to="/signup">
            <Link component="button" variant="body2">
              Sign Up Instead
            </Link>
          </LinkTo>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">{error}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
