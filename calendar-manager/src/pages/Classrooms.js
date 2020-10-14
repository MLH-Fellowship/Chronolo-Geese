import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import {
  useFirestore,
  useUser,
  useFirestoreDocData as setFirestoreDocData,
} from "reactfire";

import * as firebase from "firebase/app";

import Navbar from "../common/Navbar";
import "../styles/Classrooms.css";
import { useHistory } from "react-router-dom";

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
  const [classId, setClassId] = React.useState("temp");

  const history = useHistory();
  const user = useUser();
  // const { uid } = useParams();

  const classesCollection = useFirestore().collection("classes");
  const usersCollection = useFirestore().collection("users");
  const classes = setFirestoreDocData(usersCollection.doc(user.uid)).classCodes;

  const styles = useStyles();

  const firestore = useFirestore();

  if (!user) {
    history.push("/home");
  }

  const addClass = () => {
    let id = "";
    firestore
      .collection("classes")
      .add({
        title: className,
        professors: [user.uid],
        students: [user.uid],
      })
      .then((pushed_user) => {
        id = pushed_user.w_.path.segments[1];
        usersCollection.doc(user.uid).update({
          classCodes: classes.concat({ code: id, name: className }),
        });
      });
    setOpen(false);
  };

  const joinClass = () => {
    const docRef = classesCollection.doc(classId);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          // console.log(doc.data());
          docRef.update({
            students: firebase.firestore.FieldValue.arrayUnion(user.uid),
          });
          usersCollection.doc(user.uid).update({
            classCodes: firebase.firestore.FieldValue.arrayUnion({
              code: classId,
              name: doc.data().title,
            }),
          });
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    setOpenJoin(false);
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
                  <List className="ov" component="nav" aria-label="classNames">
                    {classes.map((name) => (
                      <ListItem button>
                        <ListItemText primary={name.name + " / " + name.code} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </div>
            </Grid>
            <Grid item className="cont">
              <div className="paper_button">
                <img alt="classroom-logo" src={require("../assets/classroom.svg")} />
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
}

export default Classrooms;
