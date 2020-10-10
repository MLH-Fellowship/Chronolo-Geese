import React, {useState, useEffect} from 'react';
// import {
//   useUser,
// } from 'reactfire';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';
// import {useParams, useHistory} from 'react-router-dom';
import Navbar from '../common/Navbar';
import '../styles/Home.css'

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'purple',
  },
}));


/**
 * @return {ReactElement} Displays profile page
 */
export default function Home() {
//   const history = useHistory();
//   const user = useUser();
//   const [currUser, setCurrUser] = useState(useUser());
  const classes = useStyles();
//   const {uid} = useParams();
//   const userCollection = useFirestore().collection('users');

  return (
    <>
      <Navbar styles={{position:'absolute'}}/>
      <div className="bg">
        <div>
          <Grid container spacing={5}>
            <Grid item className="cont">
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
            <Grid item className="cont">
              <div className="paper_button">
                <img src={require("../assets/classroom.svg")} />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

