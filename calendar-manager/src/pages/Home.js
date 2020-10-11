import React from "react";
import Sky from "react-sky";
import { useUser } from "reactfire";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../common/Navbar";
import { useParams } from "react-router-dom";
import "../styles/Home.css";

import Login from "./Login";

import i1 from "../assets/clock.png";
import i2 from "../assets/timetable.png";
import i3 from "../assets/goose.png";

const useStyles = makeStyles((theme) => ({
  font: {
    color: "#5E548E",
  },
}));

/**
 * @return {ReactElement} Displays profile page
 */
export default function Home() {
  //   const history = useHistory();
  const user = useUser();
  //   const [currUser, setCurrUser] = useState(useUser());
  const classes = useStyles();
  const { uid } = useParams();
  //   const userCollection = useFirestore().collection('users');

  let menu = <div></div>;
  if (!user) {
    menu = <Login />;
  }
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

      {user ? <Navbar styles={{ position: "absolute" }} /> : <></>}
      <div className="back">
        <div>
          <Grid container spacing={10}>
            <Grid item>
              <div className="left">
                <Typography variant="h3" style={{ color: "#E0B1CB" }}>
                  <b>CHRONOLO-GEESE</b>
                </Typography>
                <Typography variant="h5" style={{ color: "#E0B1CB" }}>
                  <b>GIT ORGANIZED.</b>
                </Typography>
                <Typography variant="h5" style={{ color: "#E0B1CB" }}>
                  <b>GIT ON TIME.</b>
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <Paper>{menu}</Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
