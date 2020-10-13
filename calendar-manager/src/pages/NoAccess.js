import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Navbar from "../common/Navbar";
import "../styles/Home.css";
import "../styles/Profile.css";

/**
 * @return {ReactElement} Displays NoAccess page
 */
export default function NoAccess() {

  return (
    <div className="bg">
          <Navbar />
          <Box container="true" marginTop={10} margin={5}>
            <Grid item xs={12}>
              <Typography variant="h4" style={{ textAlign: "center", color: "white" }}>
                <b>You do not have access to this page</b>
              </Typography>
          </Grid>
        </Box>
      </div>
  );
}