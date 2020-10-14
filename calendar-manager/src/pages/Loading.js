import React from "react";
import { Grid, Typography } from "@material-ui/core";


export default function Loading() {
    return (
        <div className="bg" >
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ marginTop: "8%" }}
                >
                    <img src={require("../assets/goose.png")} style={{ marginRight: 30 }} />
                    <Typography variant="h1" style={{ color: "#E0B1CB" }}>
                        LOADING...
                    </Typography>
                    <img src={require("../assets/clock.png")} style={{ marginRight: 30 }} />
                </Grid>
            </div>
        </div>
    );
}
