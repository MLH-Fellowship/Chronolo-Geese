import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton, Menu, MenuItem
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useUser } from "reactfire";
import * as firebase from "firebase";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();
  const user = useUser();

  if (!user) {
    return <></>;
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

  return (
    <AppBar
      style={{ background: "transparent", boxShadow: "none" }}
      position="absolute"
    >
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}></Typography>
        <Button href={"/myclasses/" + user.uid} color="inherit">
          My Classrooms
        </Button>
        <IconButton
          aria-label="account of current user"
          aria-controls="simple-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem onClick={() => history.push("/profile/" + user.uid)}>Profile</MenuItem>
          <MenuItem onClick={() => logout()}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
