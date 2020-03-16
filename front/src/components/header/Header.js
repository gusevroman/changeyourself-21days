import React, { Component } from "react";
// import store from '../redux/store';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import LinkButton from "./LinkButton"
import Modal from "../../scenes/Auth/Modal/Modal";

class Header extends Component {
  constructor(...args) {
    console.log('<<< Header args', ...args);
    super(...args);
  }
 
  render() {
    const { isLoggined, color } = this.props;
    const img = `/img/logo${color}.png`
    return (
      <header>
        <div className="container">
        <nav className="nav">
        <img src={img} className="logo"/>
          <div className="nav__section">
            <LinkButton href="/" name="Главная" />
            <LinkButton href="/methods" name="Все методики" />
          </div>
        {isLoggined ? 
          <>
            <div className="nav__section">
              <LinkButton href="/newMethod" name="Добавить методику"/>
              <LinkButton href="/user" name="Мои цели"/>
              <LinkButton href="/user/profile" name={`Профиль`}/>
            </div>
          </>
         : 
          <Modal />
        }
        </nav>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  color: state.color,
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
