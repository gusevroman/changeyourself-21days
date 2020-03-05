import React from "react";
import Router from "./Routes";
import Header from "./header/Header";
import { BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux';

class Main extends React.Component{
  
  render(){      
    return (
        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  login: state.login
});

export default connect(mapStateToProps)(Main);
