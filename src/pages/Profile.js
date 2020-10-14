import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { useHistory, useParams } from "react-router-dom";

import { useFirestore, useUser, useFirestoreDocData } from "reactfire";

import Navbar from "../common/Navbar";
import Availability from "../utils/Availability";
import "../styles/Profile.css";

/**
 * @return {ReactElement} Displays profile page
 */
export default function Profile() {
  const history = useHistory();
  const user = useUser();
  const { uid } = useParams();

  if (!user) {
    history.push("/home");
  }

  const userData = useFirestoreDocData(
    useFirestore()
      .collection("users")
      .doc(user ? user.uid : uid)
  );

  return (
    <div className="prof_bg">
      <Navbar />
      <Box container="true" marginTop={10} margin={5}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h1" style={{ textAlign: "center" }}>
              {userData.displayName}
            </Typography>
            <Typography variant="h4" style={{ textAlign: "center" }}>
              {user.email}
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <img alt="classroom-logo" src={require("../assets/clock.png")} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4" style={{ textAlign: "center" }}>
              <b>availability</b>:
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ marginLeft: "0px" }}>
            <Availability uid={user.uid} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
