import React, { useState, useEffect } from "react";
import ScheduleSelector from "react-schedule-selector";
import {
  useFirestore,
  //   AuthCheck,
  //   useUser,
  useFirestoreDocData,
} from "reactfire";
import * as firebase from "firebase/app";
// import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import { makeStyles } from "@material-ui/core/styles";
// import { useParams, useHistory } from "react-router-dom";
// import Navbar from "../common/Navbar";

// const useStyles = makeStyles((theme) => ({
//   body: {
//     backgroundColor: '#E0B1CB',
//     height: "100vh",
//   },
//   email: {
//     color: '#5E548E',
//     font: "Nunito",
//   },
//   classCodes: {},
// }));

/**
 * @return {ReactElement} Displays profile page
 */
export default function Availability({ uid }) {
  const usersCollection = useFirestore().collection("users");
  const userData = useFirestoreDocData(usersCollection.doc(uid));
  const [schedule, setSchedule] = useState([]);
  const [initialize, setInitialize] = useState(false);

  const loadAvailability = () => {
    const currDate = new Date();
    let dateTime = [];
    for (let i = 0; i < userData.availability.length; i++) {
      const newDate = userData.availability[i].toDate();
      if (newDate >= currDate) {
        dateTime.push(newDate);
      }
    }
    setSchedule(dateTime);
    setInitialize(true);
    return dateTime;
  };

  const handleChange = (newSchedule) => {
    let firebase_schedule = [];
    setSchedule(newSchedule);
    for (let i = 0; i < newSchedule.length; i++) {
      firebase_schedule.push(
        firebase.firestore.Timestamp.fromDate(newSchedule[i])
      );
    }
    usersCollection.doc(uid).update({ availability: firebase_schedule });
  };

  return (
    <div style={{ marginRight: "5vw", marginBottom: "5vh" }}>
      <ScheduleSelector
        selection={
          schedule.length === 0 && !initialize ? loadAvailability() : schedule
        }
        numDays={7}
        minTime={8}
        maxTime={22}
        hourlyChunks={2}
        timeFormat="h:mm A"
        dateFormat="ddd, MMM. DD"
        unselectedColor="#fff7ff"
        hoveredColor="#9F86C0"
        selectedColor="#5E548E"
        onChange={handleChange}
      />
    </div>
  );
}
