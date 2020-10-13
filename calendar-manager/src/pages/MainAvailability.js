import React, { useState } from "react";
import {
  useFirestore,
  // AuthCheck,
  useUser,
  useFirestoreDocData,
} from "reactfire";
import * as firebase from "firebase/app";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { HeatMapGrid } from "react-grid-heatmap";

import "../styles/MainAvailability.css";
import Navbar from "../common/Navbar";

/**
 * @return {ReactElement}
 */

const useStyles = makeStyles((theme) => ({
  classCodes: {
    color: "#5E548E",
    paperBg: {
      backgroundColor: "#e0b1cb",
      borderRadius: 50,
    },
    cent: {
      textAlign: "center",
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function MainAvailability() {
  const history = useHistory();
  const { classId } = useParams();
  const classes = useStyles();

  const user = useUser();
  const [day, setDay] = useState("Monday");
  const handleDayChange = (e) => {
    //   console.log(e);
    setDay(e.target.value);
  };

  const classData = useFirestoreDocData(
    useFirestore().collection("classes").doc(classId)
  );
  const usersCollection = useFirestore().collection("users");

  const [profesorData, setProfesorData] = useState({name:"", availability:[]})
  const [studentsData, setstudentsData] = useState([]);

  const getUserData = (uid) => {
    const docRef = usersCollection.doc(uid);
    // HELP HERE @SHIYUE
    docRef.get().then((doc) => console.log("user data", doc.data))

    // return {displayName: userData.displayName, availability: [...dateTime]};
  };
  const addProffesorData = (data) => {
    setProfesorData([...profesorData, data])
  }

  React.useEffect(() => {
    console.log("proffessor", classData.professors[0]);

    if(classData.professors){
      
        classData.proffessor.map(proffessor => {
          addProffesorData(getUserData(proffessor));
        });

      
      console.log("user", getUserData(classData.professors[0]))
    }

    /*
    if(classData.students){
      classData.students.map(student => {
        getUserData(student)
      })
    }
    */

  }, [classData]);

  const [teacherSchedule, setTeacherSchedule] = useState([]);

  const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);
  const yLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
      new Array(xLabels.length)
        .fill(0)
        .map(() => Math.floor(Math.random() * 5 + 5))
    );

  const heatmap = (
    <HeatMapGrid
      data={data}
      xLabels={xLabels}
      yLabels={yLabels}
      // Reder cell with tooltip
      cellRender={(x, y, value) => (
        <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
      )}
      xLabelsStyle={(index) => ({
        color: index % 2 ? "transparent" : "#5e548e",
        fontSize: ".65rem",
      })}
      yLabelsStyle={() => ({
        fontSize: ".65rem",
        textTransform: "uppercase",
        color: "#5e548e",
      })}
      cellStyle={(_x, _y, ratio) => ({
        background: `rgb(224, 177, 203, ${ratio})` /*rgb(224, 177, 203);*/,
        fontSize: ".7rem",
        color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
      })}
      cellHeight="1.5rem"
      xLabelsPos="bottom"
      onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
      // yLabelsPos="right"
      // square
    />
  );

  if (!user) {
    history.push("/login");
  } else {
    return (
      <div className="main_availability_bg">
        <Navbar />
        <Container>
          <Grid
            container
            spacing={3}
            style={{ margin: "1vh", marginTop: "10vh" }}
          >
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography variant="h5" className={classes.cent}>
                <b>CLASSROOM: {classId}</b>
              </Typography>
              <Typography variant="h6" className={classes.cent}>
                <b>{classData.title}</b>
              </Typography>
              {/* <FormControl variant="filled" className={classes.formControl}>
                <Select
                  value={day}
                  onChange={handleDayChange}
                  displayEmpty
                  // className={classes.selectEmpty}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"Monday"}>Monday</MenuItem>
                  <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                  <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                  <MenuItem value={"Thursday"}>Thursday</MenuItem>
                  <MenuItem value={"Friday"}>Friday</MenuItem>
                  <MenuItem value={"Saturday"}>Saturday</MenuItem>
                  <MenuItem value={"Sunday"}>Sunday</MenuItem>
                </Select>
              </FormControl> */}
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h3" className={classes.cent}>
                <PersonOutlineIcon
                  aria-label="Teacher Icon"
                  aria-controls="teacher-icon"
                  color="inherit"
                  fontSize="inherit"
                />
              </Typography>
              <Typography variant="h5" className={classes.cent}>
                <b>TEACHER</b>
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Paper className={classes.paperBg} variant="outlined">
                <div
                  style={{
                    width: "100%",
                    padding: "0.5rem 0",
                  }}
                >
                  {heatmap}
                </div>
              </Paper>
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h3" className={classes.cent}>
                <PeopleOutlineIcon
                  aria-label="Teacher Icon"
                  aria-controls="teacher-icon"
                  color="inherit"
                  fontSize="inherit"
                />
              </Typography>
              <Typography variant="h5" className={classes.cent}>
                <b>CLASS</b>
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Paper className={classes.paperBg} variant="outlined">
                <div
                  style={{
                    width: "100%",
                    padding: "0.5rem 0",
                  }}
                >
                  {heatmap}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
