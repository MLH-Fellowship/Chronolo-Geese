import React, {Suspense} from "react";
// import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import {FirebaseAppProvider} from 'reactfire';
import TeacherRoomCode from "./pages/TeacherRoomCode"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyAE6rcfe2QjFdVwwVtQN6dvEITo4mFgVPg",
  authDomain: "chronolo-geese.firebaseapp.com",
  databaseURL: "https://chronolo-geese.firebaseio.com",
  projectId: "chronolo-geese",
  storageBucket: "chronolo-geese.appspot.com",
  messagingSenderId: "538915612147",
  appId: "1:538915612147:web:2264447c48c615794f5e86",
  measurementId: "G-0F8Q557ERB"
};

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={<p>loading...</p>}>
        <Router>
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route exact path="/profile/:uid">
              <Profile />
            </Route>
            <Route exact path="/classes/:uid">
              <TeacherRoomCode />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </FirebaseAppProvider>
  );
}

export default App;
