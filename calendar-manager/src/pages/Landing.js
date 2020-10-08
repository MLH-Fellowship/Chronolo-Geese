import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import * as firebase from "firebase";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Link as LinkTo } from "react-router-dom";
import {useHistory} from 'react-router-dom';


function Landing() {

    const history = useHistory();

    function homePage() {
        history.push('/');
      }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        CHRONOLO-GEESE
          </Typography>
                    <Button href="/" color="inherit">Home</Button>
                    <Button href="/classrooms" color="inherit">Classrooms</Button>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        color="inherit"
                        onClick={() => history.push('/profile/12345')}
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>

        </div>
    );
}
export default Landing;
