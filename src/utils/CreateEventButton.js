import React, { useState } from "react";
import { useFirestoreDocData } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ApiCalendar from "react-google-calendar-api";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginRight: theme.spacing(2),
    width: 200,
  },
}));

/**
 * @return {ReactElement} Add meeting event button
 */
export default function CreateEventButton({
  classId,
  classesCollection,
  studentEmail,
}) {
  const classes = useStyles();
  const moment = require("moment-timezone");
  const timeZone = moment.tz.guess();
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(new Date().setMinutes(new Date().getMinutes() + 30)));
  const [description, setDescription] = useState("");
  const classData = useFirestoreDocData(classesCollection.doc(classId));

  const handleClickOpen = async () => {
    setOpen(true);
    setSummary(classData.title + " meeting");
  };

  const handleClose = () => {
    setOpen(false);
    setSummary(classData.title + " meeting");
    setStartTime(new Date());
    setEndTime(new Date(new Date().setMinutes(new Date().getMinutes() + 30)));
  };

  const handleSave = () => {
    setOpen(false);
    if (ApiCalendar.sign === false) {
      ApiCalendar.handleAuthClick();
    }
    let eventEndTime = endTime;
    if (startTime > endTime) {
      setEndTime(startTime);
      eventEndTime = startTime;
    }
    const event = {
      summary: summary,
      description: description,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: timeZone,
      },
      end: {
        dateTime: eventEndTime.toISOString(),
        timeZone: timeZone,
      },
      attendees: studentEmail,
    };
    ApiCalendar.createEvent(event)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {});
    setSummary(classData.title + " meeting");
    setStartTime(new Date());
    setEndTime(new Date(new Date().setMinutes(new Date().getMinutes() + 30)));
    setDescription("");
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Meeting
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Event Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            fullWidth
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label="Start Time"
              value={startTime}
              onChange={setStartTime}
              className={classes.textField}
              showTodayButton
              disablePast
            />
            <DateTimePicker
              label="End Time"
              value={endTime}
              onChange={setEndTime}
              className={classes.textField}
              showTodayButton
              disablePast
            />
          </MuiPickersUtilsProvider>
          <TextField
            margin="dense"
            label="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
