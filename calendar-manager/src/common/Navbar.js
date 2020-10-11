import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useUser } from "reactfire";

export default function Navbar() {
  const history = useHistory();
  const user = useUser();

  
  if (!user) {
    return (<></>)
  }

  return (
    <AppBar
      style={{ background: "transparent", boxShadow: "none" }}
      position="absolute"
    >
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}></Typography>
        <Button href={"/home/" + user.uid} color="inherit">
          Home
        </Button>
        <Button href={"/myclasses/" + user.uid} color="inherit">
          My Classrooms
        </Button>
        <Button href={"/availability/" + user.uid} color="inherit">
          My Availability
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
