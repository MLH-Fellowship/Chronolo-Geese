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
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router-dom";
import Navbar from "../common/Navbar";
import Availability from "../profile/Availability";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: '#E0B1CB',
    height: "100%",
  },
  font: {
    color: '#5E548E',
    font: "Nunito",
  },
  classCodes: {
    color: '#5E548E',
  },
}));

/**
 * @return {ReactElement} Displays profile page
 */
export default function Profile() {
  // const history = useHistory();
  const user = useUser();
  //   const [currUser, setCurrUser] = useState(useUser());
  const classes = useStyles();
  const { uid } = useParams();
  const userData = useFirestoreDocData(
    useFirestore().collection("users").doc(uid)
  );

  return (
    <div className={classes.body}>
      <Navbar styles={{ position: "absolute" }} />
      <Box container="true" m={10} mb={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.font}>
                <b>NAME</b>: {userData.displayName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.font}>
                <b>EMAIL</b>: {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.font}>
                <b>IDENTITY</b>: {userData.isStudent ? "Student" : "Professor"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.font}>
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
            <Grid item>No classes added yet</Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.font}>
              <b>SELECT AVAILABILITY</b>:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Availability uid={uid} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
