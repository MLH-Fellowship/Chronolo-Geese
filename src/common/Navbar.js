import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ClickAwayListener,
  MenuItem,
  Grow,
  Paper,
  Popper,
  MenuList,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import { useUser } from "reactfire";
import * as firebase from "firebase";

import useSound from "use-sound";
import honk from "../assets/sfx_goose_honk_b_02.wav";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const [play] = useSound(honk);

  const history = useHistory();
  const user = useUser();

  if (!user) {
    return (
      <AppBar
        style={{ background: "transparent", boxShadow: "none" }}
        position="absolute"
      >
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <img
              onClick={function (event) {
                play();
                history.push("/home");
              }}
              alt="goose"
              src={require("../assets/goose.png")}
              style={{ height: "35px", width: "35px", margin: "auto" }}
            />
          </Typography>
          <Button href={"/about"} color="inherit">
            About
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

  // logs the user out
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => history.push("/home"))
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
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <img
            alt="goose"
            onClick={function (event) {
              play();
              history.push("/home");
            }}
            src={require("../assets/goose.png")}
            style={{ height: "35px", width: "35px", margin: "auto" }}
          />
        </Typography>
        <Button href={"/about"} color="inherit">
          About
        </Button>
        <Button href={"/myclasses/" + user.uid} color="inherit">
          My Classrooms
        </Button>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          color="inherit"
          onClick={handleToggle}
        >
          <AccountCircle />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={() => history.push("/profile/" + user.uid)}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => logout()}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Toolbar>
    </AppBar>
  );
}
