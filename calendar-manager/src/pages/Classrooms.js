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
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  useFirestore,
  useUser,
  useFirestoreDocData as setFirestoreDocData,
} from "reactfire";

import * as firebase from "firebase/app";

import Navbar from "../common/Navbar";
import "../styles/Classrooms.css";
import { useParams, useHistory } from "react-router-dom";

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
  const { uid } = useParams();
  if (!user) {
    history.push("/home");
  }
  const classesCollection = useFirestore().collection("classes");
  const usersCollection = useFirestore().collection("users");

  const classes = setFirestoreDocData(
    usersCollection.doc(user ? user.uid : uid)
  ).classCodes;

  const styles = useStyles();

  const firestore = useFirestore();

  const deleteFromCurrentStudentClassArray = (user, classCode) => {
    firestore
      .collection("users")
      .doc(user)
      .update({
        classCodes: classes.filter((el) => el.code !== classCode),
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteFromArbitraryStudentClassArray = (user, classCode) => {
    const docRef = usersCollection.doc(user);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let classes = doc.data().classCodes;

          // remove from the class array
          for (var j = 0; j < classes.length; j++) {
            firestore
              .collection("users")
              .doc(user)
              .update({
                classCodes: classes.filter((el) => el.code !== classCode),
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  const deleteClass = (i) => {
    // i: classId

    const docRef = classesCollection.doc(i);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let students = doc.data().students;

          // remove from the class array
          for (var j = 0; j < students.length; j++) {
            deleteFromArbitraryStudentClassArray(students[j], i);
          }

          // CASE: prof is the one deleting the class
          if (doc.data().professors[0] === user.uid) {
            firestore
              .collection("classes")
              .doc(i)
              .delete()
              .then(function () {
                console.log("Document successfully deleted!");
              })
              .catch(function (error) {
                console.error("Error removing document: ", error);
              });
          } else {
            // remove the student from the the list of students in classes
            firestore
              .collection("classes")
              .doc(i)
              .update({
                students: students.filter((stu) => stu !== user.uid),
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    // delete it from the class array
    deleteFromCurrentStudentClassArray(user.uid, i);
  };

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
              <Typography
                variant="h4"
                style={{ color: "#E0B1CB", textAlign: "center" }}
              >
                <b>your classrooms:</b>
              </Typography>
              <div className="paper_list">
                <Paper>
                  <List className="ov" component="nav" aria-label="classNames">
                    {classes.map((name, i) => (
                      <ListItem key={name.code}>
                        <ListItem
                          onClick={() =>
                            history.push(`/availability/${name.code}`)
                          }
                          key={name.code + "1"}
                          button
                        >
                          <ListItemText
                            primary={name.name + " / " + name.code}
                          />
                        </ListItem>

                        <IconButton
                          onClick={() => deleteClass(name.code)}
                          edge="end"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </div>
            </Grid>
            <Grid item className="cont">
              <div className="paper_button">
                <img
                  alt="classroom-logo"
                  src={require("../assets/classroom.svg")}
                />
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
