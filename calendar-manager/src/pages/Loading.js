import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Sky from "react-sky";

import i1 from "../assets/clock.png";
import i2 from "../assets/timetable.png";
import i3 from "../assets/goose.png";

export default function Loading() {

    return (
        <div>
            <Sky
                images={{
                    0: i1,
                    1: i2,
                    2: i3,
                }}
                how={30}
                time={40}
                size={"100px"}
                background={"#5e548e"}
            />
            <div>
                <div>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{ marginTop: "15%" }}
                    >
                        <Grid item>
                            <Typography variant="h1" color="white">
                                Loading...
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}
