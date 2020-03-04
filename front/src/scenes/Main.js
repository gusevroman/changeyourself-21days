import React from "react";
import Router from "../components/router/Routes";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux';

class Main extends React.Component{

  // handleFormSubmit = () => {
  //   const { isLoggined } = this.props;
    
  //   localStorage.setItem('isLoggined', isLoggined);
  //   // localStorage.setItem('user', rememberMe ? user : '');
  // };
  
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
