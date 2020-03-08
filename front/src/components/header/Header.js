import React, { Component } from "react";
// import store from '../redux/store';
import { logout } from "../../redux/actions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import LinkButton from "./LinkButton"
import Modal from "../../scenes/Auth/Modal/Modal";

class Header extends Component {
  constructor(...args) {
    console.log('<<< Header args', ...args);
    super(...args);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
    this.props.history.push("/");
  }

  render() {
    const { isLoggined } = this.props;
    console.log(`const { isLoggined } in Header ${this.props.isLoggined}`);

    return (
      <header style={{ position: "relative" }} bg="dark" variant="dark">
        <nav className="nav">
          {isLoggined ?
            <div className="logout">
              <LinkButton href="/" name="Главная" />
              <LinkButton href="/user/profile" name={`Профиль ${this.props.isLoggined}`} />
              <Link to="/" onClick={this.logout} className="link" >Выйти</Link>
            </div>
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

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
