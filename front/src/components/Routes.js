import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";

import Home from '../scenes/home/Home';
import Profile from '../scenes/user/profile/Profile';
import SelectTarget from "../scenes/user/selectTarget/selectTarget";
import TargetList from '../scenes/user/targetList/TargetList';
import MethodInfo from '../scenes/home/Methods/methodInfo/MethodInfo';


function Routes() {

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/user/profile">
        <Profile />
      </Route>
      <Route exact path="/newTarget">
        <SelectTarget />
      </Route>
      <Route path="/target/:id">
        <TargetList />
      </Route>
      <Route path="/method/:id">
        <MethodInfo />
      </Route>
    </Switch>
  )
}

export default connect()(Routes)
