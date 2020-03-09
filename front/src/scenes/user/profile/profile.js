import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { logout } from "../../../redux/actions";

import { showProfile } from '../../../redux/actions';


class Profile extends Component {
  constructor(){
    super()
    this.logout = this.logout.bind(this);
  }
  
  state = {
    name: '',
    avatar: "https://www.windstream.com/getmedia/b2e4e38a-7cb6-4ca9-9544-54dfeaca6304/icon_user-circle.png?width=1920&height=1280&ext=.png",
    email: '',
    tel: '',
    instagram: '',
    about: '',
  }

  logout() {
    this.props.logout();
    this.props.history.push("/");
  } 

  componentDidMount() {
    this.getProfile()
  }

  componentWillUnmount() {

  }

  updateProfile() {

  }

  async getProfile() {
    const profile = await (await fetch(`http://localhost:5000/user/profile/${this.props.isLoggined}`, { method: "POST" })).json();
    this.props.showProfile(profile)
    this.setState(profile)
  }

  renderProfile() {
    const { name, avatar, about, email, tel, instagram, targets } = this.state;
    return (
      <div className="settings">
        <div>
          Имя: <span className="profile">{name}</span>
          <span className="user-logo"><img src={avatar} alt="avatar" /></span>
        </div>
        <div>
          Обо мне: <span className="profile">{about}</span>
        </div>
        <div>
          Мои контакты:
          <span className="profile">{email}</span><br />
          <span className="profile">{tel}</span><br />
          <span className="profile">{instagram}</span><br />
        </div>
      </div>)
  }


  render() {
    return (
      <>
        {this.renderProfile()}
        <Link to="/" onClick={this.logout} className="link" >Выйти</Link>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  showProfile: (profile) => dispatch(showProfile(profile)),
  logout: () => dispatch(logout()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
