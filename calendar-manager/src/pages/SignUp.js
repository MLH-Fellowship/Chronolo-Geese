import React, { useState } from "react";

import * as firebase from "firebase";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useFirestore } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

function SignUp() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");

  const history = useHistory();
  const userCollection = useFirestore().collection("users");
  const dotenv = require("dotenv");
  const env = dotenv.config().parse;
const classes = useStyles();

  if (!firebase.apps.length) {
    firebase.initializeApp(env);
  }

  const useStyles = makeStyles((theme) => ({
    error: {
      position: "absolute",
      top: "77%",
      color: "white",
      backgroundColor: "rgba(250, 122, 112, 0.5)",
      borderRadius: 10,
      maxWidth: "250px",
      textAlign: "center",
    },
  }));

  // sign user up
  let submit = async () => {
    console.log(email, password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => history.push("/home"))
      .catch(function (error) {
        // Handle Errors here.
        setError(error.message);
        // return;
      });
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        await userCollection
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              userCollection.doc(user.uid).set({
                displayName: username,
                availability: [],
                classCodes: [],
                email: user.email,
                isStudent: !checked,
                uid: user.uid,
              });
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      } else {
        // No user is signed in.
        console.log("There is no logged in user");
      }
    });
  };

  return (
    <>
      <Grid item>
        <Typography variant="h4">sign-up</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="username"
          label="username"
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          type="username"
        />
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
      <Grid item xs={12}>
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        Are you a professor?
      </Grid>
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
      <div className={classes.error}>
        <Typography>{error}</Typography>
      </div>
    </>
  );
}

export default SignUp;
