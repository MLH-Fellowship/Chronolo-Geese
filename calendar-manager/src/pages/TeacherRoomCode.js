import React from "react";
import Navbar from "../common/Navbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import "../styles/TeacherRoomCode.css";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

function TeacherRoomCode() {
  const classes = ["MATB24", "CSCC01", "CSCB36", "CSCA08", "MGTA01","MATB24", "CSCC01", "CSCB36", "CSCA08", "MGTA01","MATB24", "CSCC01", "CSCB36", "CSCA08", "MGTA01"];

  const useStyles = makeStyles({
    root: {
      color: "#5e548e",
      background: "#E0B1CB",
    },
  });

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
