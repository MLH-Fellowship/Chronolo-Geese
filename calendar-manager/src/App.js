import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
