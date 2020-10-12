import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton, ClickAwayListener, MenuItem, Grow, Paper, Popper, MenuList
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { useUser } from "reactfire";
import * as firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function Navbar() {
  const classes = useStyles();
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
    if (event.key === 'Tab') {
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
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          color="inherit"
          onClick={handleToggle}
        >
          <AccountCircle />
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={() => history.push("/profile/" + user.uid)}>Profile</MenuItem>
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
