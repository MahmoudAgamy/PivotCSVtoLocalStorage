import React from "react";
import ButtonAppBar from "./Components/ButtonAppBar";
import SignInSignUp from "./Components/SignInSignUp";
import Invoices from "./Components/Invoices";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: "#dbdbdb", height: "100vh" }}>
        <Route path="/" component={ButtonAppBar} />
        <Switch>
          <Route exact path="/" component={SignInSignUp} />
          <Route exact path="/Invoices" component={Invoices} />
          <Route path="*" component={() => "404"} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
