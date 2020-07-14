import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BetList from "./components/BetList";
import SList from "./components/SList";
import NewBet from "./forms/NewBet";
import WinnersList from "./components/WinnersList";
import LoginPage from "./pages/LoginPage";

import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";

function App() {
  return (
    <Switch>
      <PublicRoute path="/" component={LoginPage} exact />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/sList" component={SList} />
      <PrivateRoute path="/betList" component={BetList} />
      <PrivateRoute path="/addBet" component={NewBet} />
      <PrivateRoute path="/winnersList" component={WinnersList} />
    </Switch>
  );
}

export default App;
