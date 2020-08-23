import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";

function App() {
  return (
    <Switch>
      <Route path="/login" component={UnauthenticatedApp} />
      <Route exact path="/home" component={AuthenticatedApp} />
      <Redirect to="/home" />
    </Switch>
  );
}

export default App;
