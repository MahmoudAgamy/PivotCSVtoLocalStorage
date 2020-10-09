import React from "react";
import TopBar from "./Components/TopBar";
import SignInUp from "./Components/SignInUp";
import Invoices from "./Components/Invoices";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        {/* <TopBar /> */}
        <Route path="/" component={TopBar} />
        <Switch>
          <Route exact path="/" component={SignInUp} />
          <Route exact path="/Invoices" component={Invoices} />
          <Route path="*" component={() => "404"} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
