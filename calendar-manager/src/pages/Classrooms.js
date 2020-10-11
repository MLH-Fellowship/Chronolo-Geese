import React, { useState } from "react";
import Navbar from "../common/Navbar";
import { useParams } from "react-router-dom";

import "../styles/TeacherRoomCode.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import {
  useFirestore,
  useUser,
  useFirestoreDocData as setFirestoreDocData,
} from "reactfire";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    color: "#5e548e",
    background: "#E0B1CB",
    margin: "10px",
  },
});

function Classrooms() {
  const [open, setOpen] = React.useState(false); //open dialog to create a new class
  const [className, setClassName] = React.useState("");
  const [openJoin, setOpenJoin] = React.useState(false); //open dialog to join a class
  const [classId, setClassId] = React.useState("");

  const history = useHistory();
  const user = useUser();
  const { uid } = useParams();

  const classes = setFirestoreDocData(
    useFirestore().collection("users").doc(uid)
  ).classCodes;

  const styles = useStyles();

  const firestore = useFirestore();

  const addClass = () => {
    let id = "";
    firestore
      .collection("classes")
      .add({
        title: className,
        professors: [uid],
        students: [],
      })
      .then((pushed_user) => {
        id = pushed_user.w_.path.segments[1];
        firestore
          .collection("users")
          .doc(uid)
          .update({
            classCodes: classes.concat({ code: id, name: className }),
          });
      });
    setOpen(false);
  };

  const joinClass = () => {
    const joinedClass = setFirestoreDocData(
      firestore.collection("classes").doc("rt3hJWsoBSsq5BDsbmUD")
    );

    console.log(joinedClass);

    // firestore
    //   .collection("classes").doc(classId)
    //   .update({students: joinedClass.students.concat(uid)})

    // firestore
    //   .collection("users")
    //   .doc(uid)
    //   .update({
    //     classCodes: classes.concat({ code: classId, name: joinedClass.title }),
    //   });
  };

  let newDia = (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create a New Class</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Class Name"
          onChange={(e) => setClassName(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => addClass()} color="primary">
          Create Room
        </Button>
      </DialogActions>
    </Dialog>
  );

  let joinDia = (
    <Dialog
      open={openJoin}
      onClose={() => setOpenJoin(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Join a Class</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Class Code"
          onChange={(e) => setClassId(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenJoin(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => joinClass()} color="primary">
          Join Room
        </Button>
      </DialogActions>
    </Dialog>
  );

  if (user) {
    return (
      <>
        <Navbar styles={{ position: "absolute" }} />
        <div className="bg">
          <div>
            <Grid container spacing={5}>
              <Grid item className="cont">
                <div className="paper_list">
                  <Typography variant="h5" style={{ color: "#E0B1CB" }}>
                    <b>CLASSROOMS:</b>
                  </Typography>
                  <Paper>
                    <List
                      className="ov"
                      component="nav"
                      aria-label="classNames"
                    >
                      {classes.map((name) => (
                        <ListItem button>
                          <ListItemText
                            primary={name.name + " / " + name.code}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </div>
              </Grid>
              <Grid item className="cont">
                <div className="paper_button">
                  <img src={require("../assets/classroom.svg")} />
                  <Button
                    variant="contained"
                    disableElevation
                    className={styles.root}
                    onClick={() => setOpen(true)}
                  >
                    <b>NEW</b>
                  </Button>

                  <Button
                    variant="contained"
                    disableElevation
                    className={styles.root}
                    onClick={() => setOpenJoin(true)}
                  >
                    <b>JOIN</b>
                  </Button>
                </div>
              </Grid>
            </Grid>

            {newDia}
            {joinDia}
          </div>
        </div>
      </>
    );
  } else {
    history.push("/home");
  }
}

export default Classrooms;
