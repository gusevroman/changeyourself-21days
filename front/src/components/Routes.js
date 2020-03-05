import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../scenes/Auth/Modal/Form/Login';
import Registration from '../scenes/Auth/Modal/Form/Registration';
import Home from '../scenes/home/Home';
import { connect } from "react-redux";
import HomeAuth from '../scenes/user/HomeAuth';
import Settings from '../scenes/user/profile/settings';


function Routes (props) {
  
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/registration">
        <Registration />
      </Route>
      <Route exact path="/user/settings">
        <Settings />
      </Route>
      <Route exact path="/user">
        <HomeAuth />
      </Route>
    </Switch> 
  )
}

export default connect()(Routes)
