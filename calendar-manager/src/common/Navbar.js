import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import * as firebase from "firebase";
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Link as LinkTo } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useUser } from "reactfire";

export default function Navbar() {
  const history = useHistory();
  const user = useUser();

  return (
    <AppBar style={{ background: 'transparent', boxShadow: 'none'}} position="absolute">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
        </Typography>
        <Button href="/home" color="inherit">
          Home
        </Button>
        <Button href={"/classes/" + user.uid} color="inherit">
          Classrooms
        </Button>
        <Button href="/avalibility" color="inherit">
          Avalibility
        </Button>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          color="inherit"
          onClick={() => history.push("/profile/" + user.uid)}
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
