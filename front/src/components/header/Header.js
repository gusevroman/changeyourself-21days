import React from "react";
// import store from '../redux/store';
import { logout } from "../../redux/actions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import LinkButton from "./LinkButton"
import Modal from "../../scenes/Auth/Modal/Modal";

class Header extends React.Component {
  constructor(...args) {
    super(...args);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
    this.props.history.push("/");
  } 

  render() {
    const { isLoggined } = this.props;
    return (
      <header bg="dark" variant="dark">
        <nav className="nav">
        {isLoggined ? 
          <>
            <LinkButton href="/" name="Главная" />
            <LinkButton href="/user/settings" name="Настройки"/>
            {/* <Link to="/" onClick={this.logout} className="link" >Выйти</Link> */}
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

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
