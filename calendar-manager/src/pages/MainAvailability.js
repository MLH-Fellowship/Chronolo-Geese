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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { HeatMapGrid } from "react-grid-heatmap";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import "../styles/MainAvailability.css";
import Navbar from "../common/Navbar";

/**
 * @return {ReactElement}
 */
dayjs.extend(isBetween);
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
  const classData = useFirestoreDocData(
    useFirestore().collection("classes").doc(classId)
  );
  const usersCollection = useFirestore().collection("users");

  const [professorsData, setProfessorsData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);

  React.useEffect(() => {
    // SHIYUE:
    // From my understanding you are ttrying to get the "name" and
    // "availability" of evey user in professors field. So I think
    // this is how I would do it. I'm a little confused because I
    // don't know when you load the student data.
    let professors = [],
      students = [];

    if (classData.professors) {
      classData.professors.map((uid, index) => {
        const docRef = usersCollection.doc(uid);
        docRef
          .get()
          .then(function (doc) {
            if (doc.exists) {
              professors.push({
                name: doc.data().displayName,
                availability: doc.data().availability,
              });
            }
            setProfessorsData([...professors]);
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      });
    }

    if (classData.students) {
      classData.students.map((uid) => {
        const docRef = usersCollection.doc(uid);
        docRef
          .get()
          .then(function (doc) {
            if (doc.exists) {
              students.push({
                name: doc.data().displayName,
                availability: doc.data().availability,
              });
              setStudentsData([...students]);
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      });
    }
  }, [classId]);

  // const [teacherSchedule, setTeacherSchedule] = useState([]);
  // make array of intervals once the page loads. Size: 28x7 (28 chunks of time from 8am to 9:30pm x 7 days)
  const [weekIntervals, setWeekIntervals] = useState([]);
  React.useEffect(() => {
    let today = dayjs();
    const intervals = [];
    for (let day = 0; day < 8; day++) {
      const dayChunks = [];
      for (let chunk = 0; chunk < 33; chunk++) {
        dayChunks.push(
          dayjs()
            .startOf("day")
            .add(day, "day")
            .add(8, "hour")
            .add(chunk * 0.5 * 60, "minute")
        );
      }
      intervals.push(dayChunks);
    }
    setWeekIntervals([...intervals]);
  }, []);

  // TODO: make labels dynamic (right now time's not show correctly)
  const xLabels = new Array(33).fill(0).map((_, i) => `${Math.floor(i/2) + 8} : 00`);
  const yLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // TODO: Find better way to not have professorsHeatmapDataMock AND professorsHeatmapData state.
  //    I think it can be done in an unique variable
  let professorsHeatmapDataMock = new Array(yLabels.length)
    .fill(0)
    .map(() => new Array(xLabels.length).fill(0));
  let studentsHeatmapDataMock = new Array(yLabels.length)
    .fill(0)
    .map(() => new Array(xLabels.length).fill(0));
  const [professorsHeatmapData, setProfessorsHeatmapData] = useState(
    professorsHeatmapDataMock
  );
  const [studentsHeatmapData, setStudentsHeatmapData] = useState(
    studentsHeatmapDataMock
  );

  // Effect matches the time interval of availability from students and professor
  // Proccess: professor/student -> availability -> isBetween any of the intervals of weekIntervals

  // TODO: Improve algorithm (it's not fancy at all :p)
  React.useEffect(() => {
    if (
      professorsData.length > 0 &&
      studentsData.length > 0 &&
      weekIntervals.length > 0
    ) {
      professorsData.map((professor) => {
        // console.log(dayjs(professor.availability[0].toDate()));
        professor.availability.map((time) => {
          for (let day = 0; day < 8; day++) {
            for (let chunk = 0; chunk < 33; chunk++) {
              if (
                dayjs(time.toDate()).isBetween(
                  weekIntervals[day][chunk],
                  weekIntervals[day][chunk + 1],
                  "minute",
                  "[)"
                )
              ) {
                console.log(
                  `${time.toDate()} is between ${weekIntervals[day][chunk]}`
                );
                professorsHeatmapDataMock[day][chunk]++;
                return;
              }
            }
          }
        });
      });
      setProfessorsHeatmapData(professorsHeatmapDataMock);
      studentsData.map((student) => {
        student.availability.map((time) => {
          for (let day = 0; day < 8; day++) {
            for (let chunk = 0; chunk < 33; chunk++) {
              if (
                dayjs(time.toDate()).isBetween(
                  weekIntervals[day][chunk],
                  weekIntervals[day][chunk + 1],
                  "minute",
                  "[)"
                )
              ) {
                console.log(
                  student.name,
                  `${time.toDate()} is between ${weekIntervals[day][chunk]}`
                );
                studentsHeatmapDataMock[day][chunk]++;
                return;
              }
            }
          }
        });
      });
      setStudentsHeatmapData(studentsHeatmapDataMock);
    }
  }, [studentsData, professorsData]);

  const professorsHeatmap = (
    <HeatMapGrid
      data={professorsHeatmapData}
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
      xLabelsPos="top"
      // onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
      // yLabelsPos="right"
      // square
    />
  );
  const studentsHeatmap = (
    <HeatMapGrid
      data={studentsHeatmapData}
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
      xLabelsPos="top"
      // onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
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
                  {professorsHeatmap}
                </div>
              </Paper>
              <Paper style={{ margin: "1rem 0" }}>
                <List>
                  {professorsData.map((professor, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={professor.name} />
                    </ListItem>
                  ))}
                </List>
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
                  {studentsHeatmap}
                </div>
              </Paper>
              <Paper style={{ margin: "1rem 0" }}>
                <List>
                  {studentsData.map((student, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={student.name} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}