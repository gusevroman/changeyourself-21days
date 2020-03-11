import React from "react";
import Router from "./Routes";
import Header from "./header/Header";
import { BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux';
import './styles/color.css';

class Main extends React.Component {
  
  render() {
    const {color} = this.props
    const style = "styleColor" + color;
    return (
        <BrowserRouter>
        <div className={style}>
        <div className="modalBg"></div>
          <Header />
          <div className="container">
            <Router />
          </div>
        </div>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  login: state.login,
  color: state.color
});

export default connect(mapStateToProps)(Main);
