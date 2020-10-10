import React from "react";
import {
  useFirestore,
  // AuthCheck,
  useUser,
  useFirestoreDocData,
} from "reactfire";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Navbar from "../common/Navbar";
import Availability from "../profile/Availability";
import "../styles/Profile.css";
import { useHistory } from "react-router-dom";
import { DriveEtaTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  classCodes: {
    color: "#5E548E",
  },
  paperBg: {
    backgroundColor: "#e0b1cb",
    borderRadius: 50,
  },
  cent:{
    textAlign: 'center',
  }
}));

/**
 * @return {ReactElement} Displays profile page
 */
export default function Profile() {
  const history = useHistory();
  const user = useUser();
  // console.log(user);
  //   const [currUser, setCurrUser] = useState(useUser());
  const classes = useStyles();
  const { uid } = useParams();
  const userData = useFirestoreDocData(
    useFirestore().collection("users").doc(uid)
  );

  if (!user) {
    history.push("/login");
  } else {
    return (
      <div className="prof_bg">
        <Navbar />

        <Grid
          container
          spacing={3}
          style={{ margin: "5vh", marginTop: "10vh" }}
        >
          <Grid item xs={12} className={classes.cent}>
            <Typography variant="h5">
              <b>drop your availability below</b>:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paperBg} variant="outlined">
              <Availability uid={uid} />
            </Paper>
          </Grid>
        </Grid>

        {/* <Box container="true" marginTop={10} margin={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">
                <b>NAME</b>: {userData.displayName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <b>EMAIL</b>: {user.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <b>IDENTITY</b>: {userData.isStudent ? "Student" : "Professor"}
              </Typography>
            </Grid> */}

        {/* there is a classes tab. this part could be redundant */}
        {/* <Grid item xs={12}>
              <Typography variant="h6">
                <b>CLASSES</b>:
              </Typography>
            </Grid>
            {userData.classCodes.length > 0 ? (
              userData.classCodes.map((v, index) => {
                return (
                  <Grid item key={index} className={classes.classCodes}>
                    {v.name}
                  </Grid>
                );
              })
            ) : (
              <Grid item className={classes.font}>
                No classes added yet
              </Grid>
            )} */}

        {/* <Grid item xs={12}>
              <Typography variant="h6">
                <b>SELECT AVAILABILITY</b>:
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginLeft: "0px" }}>
              <Paper
              className={classes.paperBg}
              variant="outlined"
              >
                <Availability uid={uid} />
              </Paper>
            </Grid>
          </Grid>
        </Box> */}
      </div>
    );
  }
}
