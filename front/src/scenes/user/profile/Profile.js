import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { logout } from "../../../redux/actions";

import { showProfile } from "../../../redux/actions";

class Profile extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }

  state = {
    name: "",
    avatar:
      "https://www.windstream.com/getmedia/b2e4e38a-7cb6-4ca9-9544-54dfeaca6304/icon_user-circle.png?width=1920&height=1280&ext=.png",
    email: "",
    tel: "",
    instagram: "",
    about: ""
  };

  logout() {
    this.props.logout();
    this.props.history.push("/");
  }

  componentDidMount() {
    this.getProfile();
  }

  componentWillUnmount() {}

  changeAvatar(event) {
    event.preventDefault();
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

  saveProfile(event) {
    event.preventDefault();
    const { name, about, email, tel, instagram } = event.target;
    this.sendProfile(
      name.value,
      about.value,
      email.value,
      tel.value,
      instagram.value
    );
  }

  async sendProfile(name, about, email, tel, instagram) {
    const login = this.props.isLoggined;
    const send = await (
      await fetch(`http://localhost:5000/user/profile/edit/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ login, name, about, email, tel, instagram })
      })
    ).json();
  }

  inputHandler(event) {
    const { value, name } = event.target;
    console.log("inputHandler", event.target.value, event.target.name);
    this.setState({ [name]: value });
  }

  renderProfile() {
    const { name, avatar, about, email, tel, instagram } = this.state;
    const isLoggined = this.props.isLoggined;
    return (
      <div className="profile">
        <form
          method="POST"
          action="/user/profile/edit"
          onSubmit={this.saveProfile.bind(this)}
        >
        <div className="profile__main">
          <div>
            <span className="user-logo">
              <img src={avatar} alt="avatar" />
            </span>
          </div>
          <div>
            <h1 title="rvgusev">{isLoggined}</h1>
          </div>
        </div>

          <div className="">
            <h3 className="profile__input">
              <span>Имя</span>
              <input
                className="search__input"
                name="name"
                id="name"
                type="text"
                value={name}
                onChange={this.inputHandler}
              />
            </h3>

            <h3 className="profile__input">
              <span>Email</span>
              <input
                className="search__input"
                name="email"
                id="email"
                type="text"
                value={email}
                onChange={this.inputHandler}
              />
            </h3>

            <h3 className="profile__input">
              <span>Обо мне</span>
              <input
                className="search__input"
                name="about"
                id="about"
                type="text"
                value={about}
                onChange={this.inputHandler}
              />
            </h3>

            <h3 className="profile__input">
              <span>Телефон</span>
              <input
                className="search__input"
                name="tel"
                id="tel"
                type="text"
                value={tel}
                onChange={this.inputHandler}
              />
            </h3>

            <h3 className="profile__input">
              <span>Инстаграм</span>
              <input
                className="search__input"
                name="instagram"
                id="instagram"
                type="text"
                value={instagram}
                onChange={this.inputHandler}
              />
            </h3>
          </div>

          <div className="row">
            <button className="edit" type="submit">Сохранить изменения</button>
            <button className="edit" type="submit">Удалить аккаунт</button>
            <Link to="/" onClick={this.logout} className="link">
              Выйти
            </Link>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return <>{this.renderProfile()}</>;
  }
}

const mapStateToProps = state => ({
  isLoggined: state.isLoggined,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  showProfile: profile => dispatch(showProfile(profile)),
  logout: () => dispatch(logout())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
