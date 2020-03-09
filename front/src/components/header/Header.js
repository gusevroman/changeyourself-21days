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
    const { isLoggined } = this.props;
    console.log(`const { isLoggined } in Header ${this.props.isLoggined}`);

    return (
      <header>
        <nav className="nav">
        {isLoggined ? 
          <>
            <LinkButton href="/" name="Главная" />
            <div className="nav__personal">
            <LinkButton href="/user" name="Мои цели"/>
            <LinkButton href="/user/profile" name={`Профиль ${this.props.isLoggined}`}/>
            </div>
          </>
         : 
          <>
            <LinkButton href="/" name="Главная" />
            <Modal />
          </>
        }
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
