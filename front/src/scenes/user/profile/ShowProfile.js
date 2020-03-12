import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { logout, changeColor } from "../../../redux/actions";
import { showProfile } from "../../../redux/actions";

class ShowProfile extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  state = {
    name: "",
    email: "",
    tel: "",
    instagram: "",
    about: "",
    profileImg: false,
    deleteAccount: false,
    close: true
  };

  logout() {
    this.props.logout();
    this.props.history.push("/");
  }

  componentDidMount() {
    this.getProfile();
  }

  async getProfile() {
    const profile = await (
      await fetch(
        `http://localhost:5000/user/profile/${this.props.isLoggined}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          }
        }
      )
    ).json();
    this.props.showProfile(profile);
    this.setState(profile);
  }

  renderProfile() {
    const { name, profileImg, about, email, tel, instagram } = this.state;
    let profileImgAvatar;
    if (profileImg) {
      profileImgAvatar = `http://localhost:5000/${profileImg}`;
    } else {
      profileImgAvatar =
        "https://www.windstream.com/getmedia/b2e4e38a-7cb6-4ca9-9544-54dfeaca6304/icon_user-circle.png?width=1920&height=1280&ext=.png";
    }
    return (
      <div className="profile">
        <form class="">
          <div>
            <label>
              <input
                type="radio"
                name="stars"
                value="Dark"
                onChange={e => {
                  this.props.changeColor(e.target.value);
                }}
              />
              <span class="">Темная</span>
            </label>
            <label>
              <input
                type="radio"
                name="stars"
                value="Light"
                onChange={e => {
                  this.props.changeColor(e.target.value);
                }}
              />
              <span class="">Светлая</span>
            </label>
          </div>
        </form>
        <div className="profile__content">
          <div className="profile__main">
            <div className="user-logo">
              <img src={profileImgAvatar} alt={name} />
            </div>
          </div>

          <h3 className="profile__show">
            <span className="profile__title">Имя</span>
            <span>{name}</span>
          </h3>

          <h3 className="profile__show">
            <span className="profile__title">Email</span>
            <span>{email}</span>
          </h3>

          <h3 className="profile__show">
            <span className="profile__title">Обо мне</span>
            <span>{about}</span>
          </h3>

          <h3 className="profile__show">
            <span className="profile__title">Телефон</span>
            <span>{tel}</span>
          </h3>

          <h3 className="profile__show">
            <span className="profile__title">Инстаграм</span>
            <span>{instagram}</span>
          </h3>

          <div className="row">
            <Link to="/user/profile/edit" className="edit">
              Изменить данные
            </Link>
            <Link to="/" onClick={this.logout} className="link">
              Выйти
            </Link>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return <>{this.renderProfile()}</>;
  }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  userId: state.userId,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  showProfile: profile => dispatch(showProfile(profile)),
  logout: () => dispatch(logout()),
  changeColor: color => dispatch(changeColor(color))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShowProfile)
);
