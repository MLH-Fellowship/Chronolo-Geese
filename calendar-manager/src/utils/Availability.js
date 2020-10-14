import React, { useState } from "react";
import ScheduleSelector from "react-schedule-selector";

import { useFirestore, useFirestoreDocData } from "reactfire";

import * as firebase from "firebase/app";

/**
 * @return {ReactElement} Displays profile page
 */
export default function Availability({ uid }) {
  const usersCollection = useFirestore().collection("users");
  const userData = useFirestoreDocData(usersCollection.doc(uid));
  const [schedule, setSchedule] = useState([]);
  const [initialize, setInitialize] = useState(false);

  const loadAvailability = () => {
    let dateTime = [];
    for (let i = 0; i < userData.availability.length; i++) {
      dateTime.push(userData.availability[i].toDate());
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
        maxTime={24}
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
