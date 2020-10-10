import React from "react";
import Navbar from "../common/Navbar";

import "../styles/TeacherRoomCode.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { useFirestore, AuthCheck, useFirestoreDocData } from "reactfire";

function TeacherRoomCode() {

    // get class codes of user "EdHT5oAKR3OvvDaSVoceUwavyv82"
  const classes = useFirestoreDocData(
    useFirestore().collection("users").doc("EdHT5oAKR3OvvDaSVoceUwavyv82")
  ).classCodes;

  const useStyles = makeStyles({
    root: {
      color: "#5e548e",
      background: "#E0B1CB",
    },
  });

  const addClass = () =>{
    // useFirestore()
  }

  return (
    <div className="bg">
      {/* <Navbar /> */}
      <div>
        <Grid container spacing={5}>
          <Grid item className="cont">
            <div className="paper_list">
              <Typography variant="h5" style={{ color: "#E0B1CB" }}>
                <b>CLASSROOMS:</b>
              </Typography>
              <Paper>
                <List className="ov" component="nav" aria-label="classNames">
                  {console.log(classes)}
                  {classes.map((name) => (
                    <ListItem button>
                      <ListItemText primary={name} />
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
                className={useStyles().root}
                onClick={() => addClass()}
              >
                <b>NEW</b>
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default TeacherRoomCode;
