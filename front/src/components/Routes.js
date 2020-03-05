import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../scenes/Auth/Modal/Form/Login';
import Registration from '../scenes/Auth/Registration';
import Home from '../scenes/home/Home';
import { connect } from "react-redux";


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
    </Switch> 
  )
}

export default connect()(Routes)
